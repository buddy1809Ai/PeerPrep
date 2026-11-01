const express = require('express');
const { getFullProblem, PROBLEMS, generateProblemDetails } = require('./problemUtils');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// In-Memory Room State Storage
const rooms = new Map();
const evaluations = [];

function getInitialRoom(roomId, problemId = 'bitwise-xor-of-all-pairings') {
  const defaultProblem = getFullProblem(problemId, FULL_PROBLEMS) || PROBLEMS[0];
  const defaultLanguage = 'javascript';
  return {
    roomId,
    language: defaultLanguage,
    problemId: defaultProblem.id,
    code: (defaultProblem.starterCode && defaultProblem.starterCode[defaultLanguage]) || '',
    users: new Map(), // socketId -> { username, role }
    messages: [],
    timerSeconds: 45 * 60,
    timerRunning: false,
    timerLastUpdate: Date.now()
  };
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PeerPrep Real-Time Engine',
    activeRooms: rooms.size,
    totalProblems: PROBLEMS.length,
    totalEvaluations: evaluations.length
  });
});

app.get('/api/problems', (req, res) => {
  res.json(PROBLEMS);
});

// Full 470-Company & 3,392 LeetCode Question Directory Endpoint
const localDataPath = path.join(__dirname, 'data');
const fullDatasetPath = fs.existsSync(localDataPath)
  ? localDataPath
  : path.join(__dirname, '../../CompanyWise_Leetcode_Questions/src/data');

let FULL_PROBLEMS = [];
let FULL_COMPANIES = [];
let FULL_TOPICS = [];
let FULL_STATS = {};
try {
  FULL_PROBLEMS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'problems.json'), 'utf8'));
  FULL_COMPANIES = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'companies.json'), 'utf8'));
  FULL_TOPICS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'topics.json'), 'utf8'));
  FULL_STATS = JSON.parse(fs.readFileSync(path.join(fullDatasetPath, 'stats.json'), 'utf8'));
  console.log(`Loaded ${FULL_PROBLEMS.length} problems across ${FULL_COMPANIES.length} companies from ${fullDatasetPath}`);
} catch (e) {
  console.error('Failed to load full dataset:', e.message);
}

app.get('/api/problem/:id', (req, res) => {
  const prob = getFullProblem(req.params.id, FULL_PROBLEMS);
  if (!prob) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  res.json(prob);
});

app.get('/api/company-directory', (req, res) => {
  const { company, topic, search, difficulty, limit = 200 } = req.query;
  let results = FULL_PROBLEMS;

  // 1. Company Filter (handles Trilogy, Trilogy Innovations, Google, Amazon, etc.)
  if (company && company !== 'All' && company !== 'All Companies') {
    const targetComp = company.toLowerCase().trim();
    results = results.filter(p => p.companies && p.companies.some(c => {
      const cLow = c.toLowerCase().trim();
      if (cLow === targetComp) return true;
      if (targetComp.includes('trilogy') && cLow.includes('trilogy')) return true;
      if (targetComp.includes('google') && cLow.includes('google')) return true;
      if (targetComp.includes('amazon') && cLow.includes('amazon')) return true;
      if (targetComp.includes('meta') && (cLow.includes('meta') || cLow.includes('facebook'))) return true;
      if (targetComp.includes('microsoft') && cLow.includes('microsoft')) return true;
      return targetComp.includes(cLow) || cLow.includes(targetComp);
    }));
  }

  // 2. Topic Filter
  if (topic && topic !== 'All' && topic !== 'All Topics') {
    const targetTopic = topic.toLowerCase().trim();
    results = results.filter(p => p.topics && p.topics.some(t => {
      const tLow = t.toLowerCase().trim();
      return tLow === targetTopic || targetTopic.includes(tLow) || tLow.includes(targetTopic);
    }));
  }

  // 3. Search Filter
  if (search) {
    const s = search.toLowerCase().trim();
    results = results.filter(p => 
      (p.title && p.title.toLowerCase().includes(s)) ||
      (p.slug && p.slug.toLowerCase().includes(s)) ||
      (p.topics && p.topics.some(t => t.toLowerCase().includes(s))) ||
      (p.companies && p.companies.some(c => c.toLowerCase().includes(s)))
    );
  }

  // 4. Difficulty Filter
  if (difficulty && difficulty !== 'All') {
    const diffTarget = difficulty.toLowerCase().trim();
    results = results.filter(p => p.difficulty && p.difficulty.toLowerCase() === diffTarget);
  }

  res.json({
    totalMatching: results.length,
    problems: results.slice(0, parseInt(limit)),
    topCompanies: FULL_COMPANIES,
    topTopics: FULL_TOPICS,
    stats: FULL_STATS
  });
});

// Structured Interviewer Evaluation Rubrics API
app.post('/api/evaluations', (req, res) => {
  const {
    roomId,
    candidateName,
    interviewerName,
    problemTitle,
    scores,
    recommendation,
    notes,
    durationSeconds
  } = req.body;

  const evaluation = {
    id: 'eval_' + crypto.randomBytes(4).toString('hex'),
    roomId: roomId || 'general',
    candidateName: candidateName || 'Candidate',
    interviewerName: interviewerName || 'Lead Evaluator',
    problemTitle: problemTitle || 'Coding Assessment',
    scores: scores || { approach: 4, complexity: 4, codeQuality: 4, communication: 4 },
    recommendation: recommendation || 'Hire',
    notes: notes || '',
    durationSeconds: durationSeconds || 0,
    timestamp: new Date().toISOString()
  };

  evaluations.push(evaluation);
  res.json({ success: true, evaluation });
});

app.get('/api/evaluations', (req, res) => {
  res.json(evaluations);
});

// Local Isolated Code Execution Engine
const EXEC_TIMEOUT = 7000; // 7 seconds timeout

function runLocalCode(language, code) {
  return new Promise((resolve) => {
    const runId = 'run_' + crypto.randomBytes(4).toString('hex');
    const tempDir = path.join(os.tmpdir(), 'peerprep_runs', runId);
    
    try {
      fs.mkdirSync(tempDir, { recursive: true });
    } catch (e) {
      return resolve({
        output: 'Failed to create execution sandbox: ' + e.message,
        isError: true,
        executionTimeMs: 0
      });
    }

    const startTime = Date.now();
    let runCommand = '';
    let filePath = '';

    if (language === 'javascript') {
      filePath = path.join(tempDir, 'solution.js');
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = 'node solution.js';
    } else if (language === 'python') {
      filePath = path.join(tempDir, 'solution.py');
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = process.platform === 'win32' ? 'python solution.py' : 'python3 solution.py';
    } else if (language === 'java') {
      const match = code.match(/public\\s+class\\s+([A-Za-z0-9_]+)/);
      const className = match ? match[1] : 'Solution';
      filePath = path.join(tempDir, `${className}.java`);
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = `javac ${className}.java && java ${className}`;
    } else if (language === 'cpp') {
      filePath = path.join(tempDir, 'solution.cpp');
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = process.platform === 'win32' ? 'g++ -O2 solution.cpp -o solution.exe && solution.exe' : 'g++ -O2 solution.cpp -o solution && ./solution';
    } else {
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
      return resolve({
        output: `Unsupported language runtime: ${language}`,
        isError: true,
        executionTimeMs: 0
      });
    }

    exec(runCommand, { timeout: EXEC_TIMEOUT, maxBuffer: 1024 * 1024, cwd: tempDir }, (error, stdout, stderr) => {
      const executionTimeMs = Date.now() - startTime;
      
      setTimeout(() => {
        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (_) {}
      }, 500);

      if (error && error.killed) {
        return resolve({
          output: `Execution Timed Out (Limit: ${EXEC_TIMEOUT / 1000}s). Check for infinite loops.`,
          isError: true,
          executionTimeMs
        });
      }

      const cleanStdout = stdout ? stdout.toString() : '';
      const cleanStderr = stderr ? stderr.toString() : '';

      if (cleanStderr && !cleanStdout) {
        return resolve({
          output: cleanStderr,
          isError: true,
          executionTimeMs
        });
      }

      return resolve({
        output: (cleanStdout || 'Code executed successfully with no output.') + (cleanStderr ? `\\n[Warnings/Stderr]:\\n${cleanStderr}` : ''),
        isError: !!error,
        executionTimeMs
      });
    });
  });
}

app.post('/api/execute', async (req, res) => {
  const { language, code } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  try {
    const result = await runLocalCode(language, code);
    return res.json(result);
  } catch (err) {
    console.error('Execution error:', err.message);
    res.status(500).json({ error: 'Code execution failed', details: err.message });
  }
});

// Socket.io WebSockets Logic
io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, username, role = 'candidate', problemId }) => {
    if (!roomId || !username) return;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, getInitialRoom(roomId, problemId));
    } else if (rooms.get(roomId).users.size === 0 && problemId) {
      const room = rooms.get(roomId);
      const initProb = getFullProblem(problemId, FULL_PROBLEMS);
      if (initProb) {
        room.problemId = initProb.id;
        room.code = (initProb.starterCode && initProb.starterCode[room.language]) || '';
      }
    }

    const room = rooms.get(roomId);
    room.users.set(socket.id, { username, role, socketId: socket.id });

    if (room.timerRunning) {
      const elapsed = Math.floor((Date.now() - room.timerLastUpdate) / 1000);
      room.timerSeconds = Math.max(0, room.timerSeconds - elapsed);
      room.timerLastUpdate = Date.now();
      if (room.timerSeconds === 0) room.timerRunning = false;
    }

    socket.emit('room-state', {
      roomId,
      code: room.code,
      language: room.language,
      problemId: room.problemId,
      users: Array.from(room.users.values()),
      messages: room.messages,
      timerSeconds: room.timerSeconds,
      timerRunning: room.timerRunning
    });

    socket.to(roomId).emit('user-joined', {
      username,
      role,
      users: Array.from(room.users.values())
    });
  });

  socket.on('cursor-move', ({ roomId, username, role, position, selection }) => {
    if (roomId && position) {
      socket.to(roomId).emit('cursor-update', {
        socketId: socket.id,
        username,
        role,
        position,
        selection
      });
    }
  });

  socket.on('timer-toggle', ({ roomId, running }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      if (room.timerRunning && !running) {
        const elapsed = Math.floor((Date.now() - room.timerLastUpdate) / 1000);
        room.timerSeconds = Math.max(0, room.timerSeconds - elapsed);
      }
      room.timerRunning = running;
      room.timerLastUpdate = Date.now();
      io.in(roomId).emit('timer-update', {
        timerSeconds: room.timerSeconds,
        timerRunning: room.timerRunning
      });
    }
  });

  socket.on('timer-reset', ({ roomId, seconds = 45 * 60 }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.timerSeconds = seconds;
      room.timerRunning = false;
      room.timerLastUpdate = Date.now();
      io.in(roomId).emit('timer-update', {
        timerSeconds: room.timerSeconds,
        timerRunning: false
      });
    }
  });

  socket.on('code-change', ({ roomId, code }) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).code = code;
      socket.to(roomId).emit('code-update', code);
    }
  });

  socket.on('language-change', ({ roomId, language }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.language = language;
      const currentProb = PROBLEMS.find(p => p.id === room.problemId) || PROBLEMS[0];
      const newTemplate = currentProb.starterCode[language] || '';
      room.code = newTemplate;
      io.in(roomId).emit('language-update', { language, code: newTemplate });
    }
  });

  socket.on('problem-change', ({ roomId, problemId }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.problemId = problemId;
      const newProb = PROBLEMS.find(p => p.id === problemId) || PROBLEMS[0];
      const newTemplate = newProb.starterCode[room.language] || '';
      room.code = newTemplate;
      io.in(roomId).emit('problem-update', { problemId, code: newTemplate });
    }
  });

  socket.on('send-message', ({ roomId, message, username }) => {
    if (rooms.has(roomId) && message) {
      const chatMsg = {
        id: crypto.randomBytes(4).toString('hex'),
        username,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      rooms.get(roomId).messages.push(chatMsg);
      io.in(roomId).emit('receive-message', chatMsg);
    }
  });

  socket.on('code-executed', ({ roomId, output, isError, executionTimeMs }) => {
    socket.to(roomId).emit('execution-result', { output, isError, executionTimeMs });
  });

  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      if (room.users.has(socket.id)) {
        const user = room.users.get(socket.id);
        room.users.delete(socket.id);

        io.in(roomId).emit('user-left', {
          username: user.username,
          users: Array.from(room.users.values())
        });
        socket.to(roomId).emit('cursor-remove', {
          socketId: socket.id,
          username: user.username
        });

        if (room.users.size === 0) {
          setTimeout(() => {
            if (rooms.has(roomId) && rooms.get(roomId).users.size === 0) {
              rooms.delete(roomId);
            }
          }, 30 * 60 * 1000);
        }
      }
    }
  });
});

// Serve compiled client statically for unified single-server deployment
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 PeerPrep Real-Time Engine running on port ${PORT}`);
});

module.exports = app;
