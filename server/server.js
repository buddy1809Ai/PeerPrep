const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

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

// Curated Interview Problem Bank
const PROBLEMS = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
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

// Test call
console.log(twoSum([2, 7, 11, 15], 9));`,
      python: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

# Test call
print(two_sum([2, 7, 11, 15], 9))`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result));
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
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
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
    id: 'valid-anagram',
    title: '242. Valid Anagram',
    difficulty: 'Easy',
    category: 'Strings & Hash Table',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: 'true'
      },
      {
        input: 's = "rat", t = "car"',
        output: 'false'
      }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram"));`,
      python: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    from collections import Counter
    return Counter(s) == Counter(t)

print(is_anagram("anagram", "nagaram"))`,
      java: `import java.util.*;

public class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram"));
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> count(26, 0);
    for (char c : s) count[c - 'a']++;
    for (char c : t) {
        if (--count[c - 'a'] < 0) return false;
    }
    return true;
}

int main() {
    cout << boolalpha << isAnagram("anagram", "nagaram") << endl;
    return 0;
}`
    }
  },
  {
    id: 'reverse-linked-list',
    title: '206. Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      }
    ],
    starterCode: {
      javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}

// Build list: 1 -> 2 -> 3
let head = new ListNode(1, new ListNode(2, new ListNode(3)));
let rev = reverseList(head);
let out = [];
while (rev) { out.push(rev.val); rev = rev.next; }
console.log(out.join(" -> "));`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

head = ListNode(1, ListNode(2, ListNode(3)))
rev = reverse_list(head)
res = []
while rev:
    res.append(str(rev.val))
    rev = rev.next
print(" -> ".join(res))`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class Solution {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(1, new ListNode(2, new ListNode(3)));
        ListNode rev = reverseList(head);
        while (rev != null) {
            System.out.print(rev.val + (rev.next != null ? " -> " : "\n"));
            rev = rev.next;
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *n) : val(x), next(n) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}

int main() {
    ListNode* head = new ListNode(1, new ListNode(2, new ListNode(3)));
    ListNode* rev = reverseList(head);
    while (rev) {
        cout << rev->val << (rev->next ? " -> " : "\n");
        rev = rev->next;
    }
    return 0;
}`
    }
  }
];

// In-Memory Room State Storage
const rooms = new Map();

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
  res.json({ status: 'ok', service: 'PeerPrep Real-Time Engine', activeRooms: rooms.size });
});

app.get('/api/problems', (req, res) => {
  res.json(PROBLEMS);
});

// Remote Code Execution via Piston API (Free, high-throughput sandbox)
app.post('/api/execute', async (req, res) => {
  const { language, code } = req.body;
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  const pistonLangMap = {
    javascript: { language: 'javascript', version: '18.15.0' },
    python: { language: 'python', version: '3.10.0' },
    java: { language: 'java', version: '15.0.2' },
    cpp: { language: 'c++', version: '10.2.0' }
  };

  const runtime = pistonLangMap[language] || { language: 'javascript', version: '18.15.0' };

  try {
    const startTime = Date.now();
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ content: code }]
      })
    });

    const data = await response.json();
    const executionTimeMs = Date.now() - startTime;

    if (data.run) {
      return res.json({
        output: data.run.stdout || data.run.stderr || 'Code executed with no output.',
        isError: !!data.run.stderr,
        executionTimeMs
      });
    } else {
      return res.status(500).json({ error: 'Execution engine failed', details: data });
    }
  } catch (err) {
    console.error('Remote execution error:', err.message);
    res.status(500).json({ error: 'Code execution service unavailable', details: err.message });
  }
});

// WebSocket Real-Time Synchronization Layer
io.on('connection', (socket) => {
  console.log(`[Socket Connected] ID: ${socket.id}`);

  // User Joins a Room
  socket.on('join-room', ({ roomId, username }) => {
    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, getInitialRoom(roomId));
    }

    const room = rooms.get(roomId);
    const role = room.users.size === 0 ? 'Interviewer' : 'Candidate';
    room.users.set(socket.id, { username, role });

    console.log(`[Room ${roomId}] ${username} joined as ${role}`);

    // Send full current room state to joining user
    socket.emit('room-state', {
      roomId,
      code: room.code,
      language: room.language,
      problemId: room.problemId,
      users: Array.from(room.users.values()),
      messages: room.messages
    });

    // Notify other users in the room
    socket.to(roomId).emit('user-joined', {
      username,
      role,
      users: Array.from(room.users.values())
    });
  });

  // Real-time Code Typing Sync
  socket.on('code-change', ({ roomId, code }) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).code = code;
      // Broadcast to everybody in the room EXCEPT the sender (prevents cursor jump)
      socket.to(roomId).emit('code-update', code);
    }
  });

  // Language Change Sync
  socket.on('language-change', ({ roomId, language }) => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      room.language = language;

      // Swap to default template for this problem & language
      const currentProb = PROBLEMS.find(p => p.id === room.problemId) || PROBLEMS[0];
      const newTemplate = currentProb.starterCode[language] || '';
      room.code = newTemplate;

      io.in(roomId).emit('language-update', { language, code: newTemplate });
    }
  });

  // Problem Switch Sync
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

  // Real-Time Chat Message
  socket.on('send-message', ({ roomId, message, username }) => {
    if (rooms.has(roomId)) {
      const chatItem = {
        id: Date.now().toString(),
        username,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      rooms.get(roomId).messages.push(chatItem);
      io.in(roomId).emit('receive-message', chatItem);
    }
  });

  // Sync Code Execution Output across both screens
  socket.on('code-executed', ({ roomId, output, isError, executionTimeMs }) => {
    io.in(roomId).emit('execution-result', { output, isError, executionTimeMs });
  });

  // Disconnect Cleanup
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

        // Clean up empty room after 30 minutes
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 PeerPrep Real-Time Engine running on http://localhost:${PORT}`);
});
