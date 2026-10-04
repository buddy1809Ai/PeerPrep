import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Users, 
  Clock, 
  MessageSquare, 
  Terminal, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  Code2,
  LogOut
} from 'lucide-react';

const SOCKET_SERVER_URL = 'http://localhost:5000';

export default function App() {
  // Room & User State
  const [inRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState('interview-2026');
  const [username, setUsername] = useState('Aman');
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);

  // Editor & Language State
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [problemId, setProblemId] = useState('two-sum');
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);

  // Execution & Terminal State
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'chat'

  // Chat State
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Interview Timer State (45 Minutes)
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const socketRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Fetch problem list on load
  useEffect(() => {
    fetch(`${SOCKET_SERVER_URL}/api/problems`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        if (data.length > 0) {
          setCurrentProblem(data[0]);
          setCode(data[0].starterCode[language] || '');
        }
      })
      .catch(err => console.error('Failed to load problems:', err));
  }, []);

  // Update current problem when problemId changes
  useEffect(() => {
    if (problems.length > 0) {
      const prob = problems.find(p => p.id === problemId) || problems[0];
      setCurrentProblem(prob);
    }
  }, [problemId, problems]);

  // Timer Countdown Effect
  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Socket Connection Management
  useEffect(() => {
    if (!inRoom) return;

    const socket = io(SOCKET_SERVER_URL);
    socketRef.current = socket;

    // Join room event
    socket.emit('join-room', { roomId, username });

    // Initial Room State from server
    socket.on('room-state', (state) => {
      setCode(state.code);
      setLanguage(state.language);
      setProblemId(state.problemId);
      setUsers(state.users);
      setMessages(state.messages || []);
    });

    // Listen for code changes from peer
    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    // Listen for language changes from peer
    socket.on('language-update', ({ language: newLang, code: newCode }) => {
      setLanguage(newLang);
      setCode(newCode);
    });

    // Listen for problem change from peer
    socket.on('problem-update', ({ problemId: newProbId, code: newCode }) => {
      setProblemId(newProbId);
      setCode(newCode);
    });

    // User Presence Listeners
    socket.on('user-joined', ({ users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    socket.on('user-left', ({ users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    // Chat Message Listener
    socket.on('receive-message', (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    // Execution Result synced across peers
    socket.on('execution-result', ({ output: out, isError: err, executionTimeMs }) => {
      setOutput(out);
      setIsError(err);
      setExecutionTime(executionTimeMs);
      setIsRunning(false);
      setActiveTab('terminal');

      if (!err && out.toLowerCase().includes('true') || out.includes('[0, 1]') || out.includes('[0,1]')) {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [inRoom, roomId, username]);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // Handle Local Code Edit
  const handleEditorChange = (newVal) => {
    setCode(newVal);
    if (socketRef.current) {
      socketRef.current.emit('code-change', { roomId, code: newVal });
    }
  };

  // Handle Language Switch
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (socketRef.current) {
      socketRef.current.emit('language-change', { roomId, language: newLang });
    }
  };

  // Handle Problem Switch
  const handleProblemChange = (newProbId) => {
    setProblemId(newProbId);
    if (socketRef.current) {
      socketRef.current.emit('problem-change', { roomId, problemId: newProbId });
    }
  };

  // Handle Chat Submit
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    if (socketRef.current) {
      socketRef.current.emit('send-message', {
        roomId,
        message: chatInput.trim(),
        username
      });
      setChatInput('');
    }
  };

  // Run Code Remotely via Execution API
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running test suite & executing code...');
    setActiveTab('terminal');

    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code })
      });
      const data = await res.json();

      if (res.ok) {
        setOutput(data.output);
        setIsError(data.isError);
        setExecutionTime(data.executionTimeMs);

        // Sync with partner
        if (socketRef.current) {
          socketRef.current.emit('code-executed', {
            roomId,
            output: data.output,
            isError: data.isError,
            executionTimeMs: data.executionTimeMs
          });
        }

        if (!data.isError) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setOutput(data.error || 'Execution failed.');
        setIsError(true);
      }
    } catch (err) {
      setOutput('Failed to reach code execution engine: ' + err.message);
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 1. Lobby Screen (Join Room)
  if (!inRoom) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                PeerPrep <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">MERN</span>
              </h1>
              <p className="text-xs text-slate-400">Real-Time Collaborative Coding & Mock Interviews</p>
            </div>
          </div>

          <form onSubmit={() => setInRoom(true)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Full Name / Handle
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. Aman Gajbhiye"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Interview Room ID
              </label>
              <input
                type="text"
                required
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                placeholder="e.g. amazon-sde-round1"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium py-3 rounded-lg text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enter Interview Room <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Share the Room ID with your partner to code together in real-time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Live Interview Room
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight hidden sm:inline">PeerPrep</span>
          </div>

          {/* Room ID Badge & Copy */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-xs">
            <span className="text-slate-500">Room:</span>
            <span className="font-mono text-indigo-400 font-semibold">{roomId}</span>
            <button
              onClick={copyRoomId}
              title="Copy Room ID"
              className="ml-1 text-slate-400 hover:text-slate-200 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Connected Peers */}
          <div className="flex items-center gap-2 text-xs text-slate-400 hidden md:flex">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center gap-1">
              {users.map((u, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {u.username} <span className="text-[10px] text-indigo-400">({u.role})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Interview Timer */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span className={`font-mono text-xs font-semibold ${timeLeft < 300 ? 'text-rose-400' : 'text-slate-200'}`}>
            {formatTimer(timeLeft)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => { setTimeLeft(45 * 60); setIsTimerRunning(false); }}
            title="Reset to 45 mins"
            className="text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={e => handleLanguageChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs rounded-md px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="python">Python 3</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium px-3.5 py-1 rounded-md text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          {/* Leave Room Button */}
          <button
            onClick={() => setInRoom(false)}
            title="Exit Room"
            className="text-slate-400 hover:text-rose-400 p-1 rounded transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main 3-Column Working Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Statement (30% Width) */}
        <div className="w-[32%] border-r border-slate-800 bg-slate-900/60 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Problem Details</span>
            </div>
            
            {/* Problem Switcher */}
            <select
              value={problemId}
              onChange={e => handleProblemChange(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs rounded px-2 py-1 text-slate-300 focus:outline-none font-mono"
            >
              {problems.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          {currentProblem && (
            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-tight">{currentProblem.title}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {currentProblem.difficulty}
                </span>
              </div>

              <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {currentProblem.category}
              </span>

              <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                {currentProblem.description}
              </div>

              {/* Examples */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Examples:</h3>
                {currentProblem.examples?.map((ex, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1.5 text-xs font-mono">
                    <p className="text-slate-400"><strong className="text-indigo-400">Input:</strong> {ex.input}</p>
                    <p className="text-slate-400"><strong className="text-emerald-400">Output:</strong> {ex.output}</p>
                    {ex.explanation && (
                      <p className="text-slate-500 text-[11px]">Explanation: {ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Panel: Monaco Editor (43% Width) */}
        <div className="w-[43%] border-r border-slate-800 flex flex-col bg-[#1e1e1e]">
          <div className="h-8 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              solution.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'cpp'}
            </span>
            <span className="text-[10px] text-slate-500">Auto-synced across peers</span>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                fontSize: 13,
                fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12 }
              }}
            />
          </div>
        </div>

        {/* Right Panel: Terminal Output & Real-Time Chat (25% Width) */}
        <div className="w-[25%] flex flex-col bg-slate-950">
          {/* Tabs Navigation */}
          <div className="h-10 border-b border-slate-800 bg-slate-900/60 flex items-center px-2">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition ${
                activeTab === 'terminal' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Terminal
              {executionTime && (
                <span className="text-[10px] text-indigo-400 ml-1">({executionTime}ms)</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition ml-1 ${
                activeTab === 'chat' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Peer Chat
              {messages.length > 0 && (
                <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-1 rounded-full ml-1">
                  {messages.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab 1: Terminal Window */}
          {activeTab === 'terminal' && (
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>Execution Console</span>
                <span className={isError ? 'text-rose-400' : output ? 'text-emerald-400' : 'text-slate-500'}>
                  {isError ? 'Exit with error' : output ? 'Passed' : 'Idle'}
                </span>
              </div>
              <pre className={`flex-1 whitespace-pre-wrap ${isError ? 'text-rose-400' : 'text-slate-200'}`}>
                {output || 'Click "Run Code" above to compile & run solution against test cases.'}
              </pre>
            </div>
          )}

          {/* Tab 2: Live Chat Room */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {messages.length === 0 ? (
                  <p className="text-slate-500 text-center text-[11px] py-4">No messages yet. Say hello to your partner!</p>
                ) : (
                  messages.map(m => (
                    <div
                      key={m.id}
                      className={`p-2 rounded-lg max-w-[85%] ${
                        m.username === username
                          ? 'ml-auto bg-indigo-600/30 text-indigo-100 border border-indigo-500/30'
                          : 'bg-slate-900 text-slate-200 border border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-indigo-300">{m.username}</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="text-xs">{m.message}</p>
                    </div>
                  ))
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 bg-slate-900/50 flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded text-xs transition"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
