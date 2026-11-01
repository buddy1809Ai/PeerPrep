const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
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

// Curated Interview Problem Bank (Including Trilogy Innovations & FAANG)
const PROBLEMS = [
  {
    id: 'bitwise-xor-of-all-pairings',
    title: 'Bitwise XOR of All Pairings',
    difficulty: 'Medium',
    category: 'Bit Manipulation & Logic',
    company: 'Trilogy Innovations',
    description: "You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).\n\nReturn the bitwise XOR of all integers in nums3.\n\nOptimal Insight: Notice that if nums2 has an odd length, each element in nums1 appears an odd number of times in nums3. If nums2 has an even length, elements in nums1 cancel out (x ^ x = 0). Apply the same symmetric property to nums2.",
    examples: [
      {
        input: 'nums1 = [2,1,3], nums2 = [10,2,5,0]',
        output: '13',
        explanation: 'A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3]. The bitwise XOR of all integers is 13.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '0',
        explanation: 'All integers cancel out.'
      }
    ],
    starterCode: {
      javascript: `function xorAllNums(nums1, nums2) {
  let x1 = 0, x2 = 0;
  if (nums2.length % 2 !== 0) {
    for (const n of nums1) x1 ^= n;
  }
  if (nums1.length % 2 !== 0) {
    for (const n of nums2) x2 ^= n;
  }
  return x1 ^ x2;
}

// Test case
console.log('Result:', xorAllNums([2,1,3], [10,2,5,0]));`,
      python: `def xor_all_nums(nums1, nums2):
    x1, x2 = 0, 0
    if len(nums2) % 2 != 0:
        for n in nums1:
            x1 ^= n
    if len(nums1) % 2 != 0:
        for n in nums2:
            x2 ^= n
    return x1 ^ x2

# Test case
print('Result:', xor_all_nums([2,1,3], [10,2,5,0]))`,
      java: `public class Solution {
    public static int xorAllNums(int[] nums1, int[] nums2) {
        int x1 = 0, x2 = 0;
        if (nums2.length % 2 != 0) {
            for (int n : nums1) x1 ^= n;
        }
        if (nums1.length % 2 != 0) {
            for (int n : nums2) x2 ^= n;
        }
        return x1 ^ x2;
    }

    public static void main(String[] args) {
        int res = xorAllNums(new int[]{2, 1, 3}, new int[]{10, 2, 5, 0});
        System.out.println("Result: " + res);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int xorAllNums(vector<int>& nums1, vector<int>& nums2) {
    int x1 = 0, x2 = 0;
    if (nums2.size() % 2 != 0) {
        for (int n : nums1) x1 ^= n;
    }
    if (nums1.size() % 2 != 0) {
        for (int n : nums2) x2 ^= n;
    }
    return x1 ^ x2;
}

int main() {
    vector<int> nums1 = {2, 1, 3};
    vector<int> nums2 = {10, 2, 5, 0};
    cout << "Result: " << xorAllNums(nums1, nums2) << endl;
    return 0;
}`
    }
  },
  {
    id: 'substring-xor-queries',
    title: 'Substring XOR Queries',
    difficulty: 'Medium',
    category: 'Bit Manipulation & Hash Map',
    company: 'Trilogy Innovations',
    description: "You are given a binary string s, and a 2D integer array queries where queries[i] = [first_i, second_i].\nFor the i-th query, find the shortest substring of s whose decimal value val satisfies: val ^ first_i == second_i (which means val == first_i ^ second_i).\n\nReturn an array ans where ans[i] = [left_i, right_i] is the shortest substring bounds (left-most if tied), or [-1, -1] if no such substring exists.",
    examples: [
      {
        input: 's = "101101", queries = [[0,5],[1,2]]',
        output: '[[0,2],[2,3]]',
        explanation: 'For query [0,5], val = 5 (101 in binary). Substring s[0..2] is "101".'
      }
    ],
    starterCode: {
      javascript: `function substringXorQueries(s, queries) {
  const map = new Map();
  const n = s.length;
  for (let i = 0; i < n; i++) {
    let val = 0;
    if (s[i] === '0') {
      if (!map.has(0)) map.set(0, [i, i]);
      continue;
    }
    for (let j = i; j < Math.min(n, i + 30); j++) {
      val = (val << 1) | (s.charCodeAt(j) - 48);
      if (!map.has(val)) {
        map.set(val, [i, j]);
      }
    }
  }
  return queries.map(([f, sec]) => map.get(f ^ sec) || [-1, -1]);
}

console.log('Result:', JSON.stringify(substringXorQueries("101101", [[0,5],[1,2]])));`,
      python: `def substring_xor_queries(s, queries):
    lookup = {}
    n = len(s)
    for i in range(n):
        if s[i] == '0':
            if 0 not in lookup:
                lookup[0] = [i, i]
            continue
        val = 0
        for j in range(i, min(n, i + 30)):
            val = (val << 1) | int(s[j])
            if val not in lookup:
                lookup[val] = [i, j]
    return [lookup.get(f ^ sec, [-1, -1]) for f, sec in queries]

print('Result:', substring_xor_queries("101101", [[0,5],[1,2]]))`,
      java: `import java.util.*;

public class Solution {
    public static int[][] substringXorQueries(String s, int[][] queries) {
        Map<Integer, int[]> map = new HashMap<>();
        int n = s.length();
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '0') {
                if (!map.containsKey(0)) map.put(0, new int[]{i, i});
                continue;
            }
            int val = 0;
            for (int j = i; j < Math.min(n, i + 30); j++) {
                val = (val << 1) | (s.charAt(j) - '0');
                if (!map.containsKey(val)) map.put(val, new int[]{i, j});
            }
        }
        int[][] ans = new int[queries.length][2];
        for (int k = 0; k < queries.length; k++) {
            int target = queries[k][0] ^ queries[k][1];
            ans[k] = map.getOrDefault(target, new int[]{-1, -1});
        }
        return ans;
    }

    public static void main(String[] args) {
        int[][] res = substringXorQueries("101101", new int[][]{{0,5},{1,2}});
        System.out.println(Arrays.deepToString(res));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<vector<int>> substringXorQueries(string s, vector<vector<int>>& queries) {
    unordered_map<int, pair<int,int>> map;
    int n = s.size();
    for (int i = 0; i < n; i++) {
        if (s[i] == '0') {
            if (map.find(0) == map.end()) map[0] = {i, i};
            continue;
        }
        long long val = 0;
        for (int j = i; j < min(n, i + 30); j++) {
            val = (val << 1) | (s[j] - '0');
            if (map.find(val) == map.end()) map[val] = {i, j};
        }
    }
    vector<vector<int>> ans;
    for (auto& q : queries) {
        int target = q[0] ^ q[1];
        if (map.count(target)) ans.push_back({map[target].first, map[target].second});
        else ans.push_back({-1, -1});
    }
    return ans;
}

int main() {
    vector<vector<int>> q = {{0,5},{1,2}};
    auto res = substringXorQueries("101101", q);
    cout << "[";
    for(auto& p : res) cout << "[" << p[0] << "," << p[1] << "]";
    cout << "]" << endl;
    return 0;
}`
    }
  },
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    company: 'Amazon / Google',
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9));`,
      python: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
print(two_sum([2, 7, 11, 15], 9))`,
      java: `import java.util.*;
public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) return new int[] { map.get(complement), i };
            map.put(nums[i], i);
        }
        return new int[] {};
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) return {seen[complement], i};
        seen[nums[i]] = i;
    }
    return {};
}
int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = twoSum(nums, 9);
    cout << "[" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}`
    }
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    category: 'Design & Linked List',
    company: 'Meta / Microsoft',
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if that key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.\nBoth operations must run in O(1) average time complexity.",
    examples: [
      {
        input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)',
        output: '[null, null, null, 1, null, -1]',
        explanation: 'Key 2 was evicted because 1 was recently accessed.'
      }
    ],
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
  }
}
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log('Get 1:', cache.get(1));
cache.put(3, 3); // evicts key 2
console.log('Get 2:', cache.get(2));`,
      python: `from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

c = LRUCache(2)
c.put(1, 1)
c.put(2, 2)
print('Get 1:', c.get(1))
c.put(3, 3)
print('Get 2 (should be -1):', c.get(2))`,
      java: `import java.util.*;
public class Solution {
    static class LRUCache extends LinkedHashMap<Integer, Integer> {
        private int capacity;
        public LRUCache(int capacity) {
            super(capacity, 0.75f, true);
            this.capacity = capacity;
        }
        public int get(int key) {
            return super.getOrDefault(key, -1);
        }
        public void put(int key, int value) {
            super.put(key, value);
        }
        @Override
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    }
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println("Get 1: " + cache.get(1));
        cache.put(3, 3);
        System.out.println("Get 2: " + cache.get(2));
    }
}`,
      cpp: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;
class LRUCache {
    int cap;
    list<pair<int,int>> lru;
    unordered_map<int, list<pair<int,int>>::iterator> map;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!map.count(key)) return -1;
        lru.splice(lru.begin(), lru, map[key]);
        return map[key]->second;
    }
    void put(int key, int value) {
        if (map.count(key)) {
            lru.splice(lru.begin(), lru, map[key]);
            map[key]->second = value;
            return;
        }
        if (lru.size() == cap) {
            int old = lru.back().first;
            lru.pop_back();
            map.erase(old);
        }
        lru.push_front({key, value});
        map[key] = lru.begin();
    }
};
int main() {
    LRUCache c(2);
    c.put(1, 1); c.put(2, 2);
    cout << "Get 1: " << c.get(1) << endl;
    c.put(3, 3);
    cout << "Get 2: " << c.get(2) << endl;
    return 0;
}`
    }
  }
];

// In-Memory Room State Storage
const rooms = new Map();
const evaluations = [];

function getInitialRoom(roomId) {
  const defaultProblem = PROBLEMS[0];
  const defaultLanguage = 'javascript';
  return {
    roomId,
    language: defaultLanguage,
    problemId: defaultProblem.id,
    code: defaultProblem.starterCode[defaultLanguage],
    users: new Map(), // socketId -> { username, role }
    messages: []
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
  console.log(`[Evaluation Saved] Room ${roomId} - ${evaluation.candidateName}: ${evaluation.recommendation}`);
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
    const tempDir = path.join(__dirname, 'temp_runs', runId);
    
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
      runCommand = 'python solution.py';
    } else if (language === 'java') {
      const match = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = match ? match[1] : 'Solution';
      filePath = path.join(tempDir, `${className}.java`);
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = `javac ${className}.java && java ${className}`;
    } else if (language === 'cpp') {
      filePath = path.join(tempDir, 'solution.cpp');
      fs.writeFileSync(filePath, code, 'utf8');
      runCommand = 'g++ -O2 solution.cpp -o solution.exe && solution.exe';
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
        output: (cleanStdout || 'Code executed successfully with no output.') + (cleanStderr ? `\n[Warnings/Stderr]:\n${cleanStderr}` : ''),
        isError: !!error,
        executionTimeMs
      });
    });
  });
}

// Remote / Local Code Execution Endpoint
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
  console.log(`[Socket Connected] ID: ${socket.id}`);

  socket.on('join-room', ({ roomId, username, role = 'candidate' }) => {
    if (!roomId || !username) return;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, getInitialRoom(roomId));
    }

    const room = rooms.get(roomId);
    room.users.set(socket.id, { username, role, socketId: socket.id });

    console.log(`[Room ${roomId}] ${username} joined as ${role}`);

    socket.emit('room-state', {
      roomId,
      code: room.code,
      language: room.language,
      problemId: room.problemId,
      users: Array.from(room.users.values()),
      messages: room.messages
    });

    socket.to(roomId).emit('user-joined', {
      username,
      role,
      users: Array.from(room.users.values())
    });
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
        console.log(`[Room ${roomId}] ${user.username} left`);

        io.in(roomId).emit('user-left', {
          username: user.username,
          users: Array.from(room.users.values())
        });

        if (room.users.size === 0) {
          setTimeout(() => {
            if (rooms.has(roomId) && rooms.get(roomId).users.size === 0) {
              rooms.delete(roomId);
              console.log(`[Room ${roomId}] Cleaned up empty room`);
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
