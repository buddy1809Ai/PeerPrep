// Problem Utilities & Dynamic Generator for all 3,392 LeetCode Questions

const PROBLEMS = [
  {
    id: 'bitwise-xor-of-all-pairings',
    slug: 'bitwise-xor-of-all-pairings',
    title: 'Bitwise XOR of All Pairings',
    url: 'https://leetcode.com/problems/bitwise-xor-of-all-pairings',
    constraints: ['1 <= nums1.length, nums2.length <= 10^5', '0 <= nums1[i], nums2[j] <= 10^9'],
    difficulty: 'Medium',
    category: 'Bit Manipulation & Logic',
    company: 'Trilogy Innovations',
    description: "You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).\n\nReturn the bitwise XOR of all integers in nums3.",
    examples: [
      {
        input: 'nums1 = [2,1,3], nums2 = [10,2,5,0]',
        output: '13',
        explanation: 'nums3 = [8,0,7,2,11,3,4,1,9,1,6,3]. The bitwise XOR of all integers is 13.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '0',
        explanation: 'All integers pair up evenly and cancel out.'
      }
    ],
    hints: [
      "Hint 1: Notice the mathematical property: a ^ a = 0 (even count cancels) and a ^ 0 = a (odd count remains).",
      "Hint 2: How many times does each element of nums1 appear in nums3? Exactly len(nums2) times!",
      "Hint 3: If len(nums2) is odd, XOR all elements of nums1. If len(nums1) is odd, XOR all elements of nums2. Compute in O(N + M) time!"
    ],
    starterCode: {
      javascript: `function xorAllNums(nums1, nums2) {
  // TODO: Write your optimal solution here...
  // Do NOT use O(N*M) nested loops. Look for parity cancellation!
  return 0;
}

// Test Run
console.log('Output:', xorAllNums([2, 1, 3], [10, 2, 5, 0]));
console.log('Expected: 13');`,
      python: `def xor_all_nums(nums1, nums2):
    # TODO: Write your optimal solution here...
    return 0

# Test Run
print('Output:', xor_all_nums([2, 1, 3], [10, 2, 5, 0]))
print('Expected: 13')`,
      java: `public class Solution {
    public static int xorAllNums(int[] nums1, int[] nums2) {
        // TODO: Write your optimal solution here...
        return 0;
    }

    public static void main(String[] args) {
        int res = xorAllNums(new int[]{2, 1, 3}, new int[]{10, 2, 5, 0});
        System.out.println("Output: " + res);
        System.out.println("Expected: 13");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int xorAllNums(vector<int>& nums1, vector<int>& nums2) {
    // TODO: Write your optimal solution here...
    return 0;
}

int main() {
    vector<int> nums1 = {2, 1, 3};
    vector<int> nums2 = {10, 2, 5, 0};
    cout << "Output: " << xorAllNums(nums1, nums2) << endl;
    cout << "Expected: 13" << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(N + M)',
      spaceComplexity: 'O(1)',
      explanation: 'Each element in nums1 appears len(nums2) times. If len(nums2) is odd, each nums1[i] contributes to the final XOR. Similarly for nums2 with len(nums1).',
      code: `function xorAllNums(nums1, nums2) {
  let x1 = 0, x2 = 0;
  if (nums2.length % 2 !== 0) {
    for (const n of nums1) x1 ^= n;
  }
  if (nums1.length % 2 !== 0) {
    for (const n of nums2) x2 ^= n;
  }
  return x1 ^ x2;
}`
    }
  },
  {
    id: 'substring-xor-queries',
    slug: 'substring-xor-queries',
    title: 'Substring XOR Queries',
    url: 'https://leetcode.com/problems/substring-xor-queries',
    constraints: ['1 <= s.length <= 10^4', 's[i] is either "0" or "1"', '1 <= queries.length <= 10^5', '0 <= first_i, second_i <= 10^9'],
    difficulty: 'Medium',
    category: 'Bit Manipulation & Hash Table',
    company: 'Trilogy Innovations',
    description: "You are given a binary string s, and a 2D integer array queries where queries[i] = [first_i, second_i].\nFor each query, find the shortest substring of s whose decimal value val satisfies: val ^ first_i == second_i (which means val == first_i ^ second_i).\n\nReturn an array ans where ans[i] = [left_i, right_i] is the shortest substring bounds (left-most if tied), or [-1, -1] if no such substring exists.",
    examples: [
      {
        input: 's = "101101", queries = [[0,5],[1,2]]',
        output: '[[0,2],[2,3]]',
        explanation: 'For query [0,5], val = 5 (binary "101"). Substring s[0..2] is "101". For query [1,2], val = 3 (binary "11"). Substring s[2..3] is "11".'
      }
    ],
    hints: [
      "Hint 1: val ^ first == second implies val == first ^ second. Compute target = first ^ second for each query.",
      "Hint 2: Since numbers in queries are <= 10^9, their binary representation is at most 30 bits long!",
      "Hint 3: Precompute all substrings of s with lengths up to 30 and store their earliest shortest bounds in a hash map."
    ],
    starterCode: {
      javascript: `function substringXorQueries(s, queries) {
  // TODO: Write your optimal solution here...
  return [];
}

// Test Run
console.log('Output:', JSON.stringify(substringXorQueries("101101", [[0,5],[1,2]])));
console.log('Expected: [[0,2],[2,3]]');`,
      python: `def substring_xor_queries(s, queries):
    # TODO: Write your optimal solution here...
    return []

print('Output:', substring_xor_queries("101101", [[0,5],[1,2]]))
print('Expected: [[0, 2], [2, 3]]')`,
      java: `import java.util.*;

public class Solution {
    public static int[][] substringXorQueries(String s, int[][] queries) {
        // TODO: Write your optimal solution here...
        return new int[queries.length][2];
    }

    public static void main(String[] args) {
        int[][] res = substringXorQueries("101101", new int[][]{{0,5},{1,2}});
        System.out.println("Output: " + Arrays.deepToString(res));
        System.out.println("Expected: [[0, 2], [2, 3]]");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> substringXorQueries(string s, vector<vector<int>>& queries) {
    // TODO: Write your optimal solution here...
    return {};
}

int main() {
    vector<vector<int>> q = {{0,5},{1,2}};
    auto res = substringXorQueries("101101", q);
    cout << "Executed query count: " << q.size() << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(N * 30 + Q)',
      spaceComplexity: 'O(N * 30)',
      explanation: 'Since numbers fit in 30 bits, substrings longer than 30 are unnecessary. Pre-indexing lengths 1..30 in a hash map guarantees O(1) query lookups.',
      code: `function substringXorQueries(s, queries) {
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
      if (!map.has(val)) map.set(val, [i, j]);
    }
  }
  return queries.map(([f, sec]) => map.get(f ^ sec) || [-1, -1]);
}`
    }
  },
  {
    id: 'fraction-addition-and-subtraction',
    slug: 'fraction-addition-and-subtraction',
    title: 'Fraction Addition and Subtraction',
    url: 'https://leetcode.com/problems/fraction-addition-and-subtraction',
    constraints: ['The input string only contains "0" to "9", "/", "+", "-"', 'Numerator and denominator are in range [1, 10]'],
    difficulty: 'Medium',
    category: 'Math & Simulation',
    company: 'Trilogy Innovations',
    description: "Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.\n\nThe final result should be an irreducible fraction. If your final result is an integer, say 2, you need to change it to the format of a fraction that has a denominator 1 -- so in this case, 2/1.",
    examples: [
      {
        input: 'expression = "-1/2+1/2"',
        output: '"0/1"',
        explanation: '-1/2 + 1/2 = 0/1'
      },
      {
        input: 'expression = "-1/2+1/2+1/3"',
        output: '"1/3"'
      }
    ],
    hints: [
      "Hint 1: Parse the string sequentially to extract numerators and denominators along with their signs.",
      "Hint 2: Maintain a running numerator and denominator. When adding a/b + c/d = (a*d + c*b) / (b*d).",
      "Hint 3: Use the Euclidean GCD algorithm to reduce the fraction to simplest form at the end."
    ],
    starterCode: {
      javascript: `function fractionAddition(expression) {
  // TODO: Parse fractions, add/subtract, and reduce with GCD...
  return "0/1";
}

console.log('Output:', fractionAddition("-1/2+1/2+1/3"));
console.log('Expected: "1/3"');`,
      python: `def fraction_addition(expression: str) -> str:
    # TODO: Write your fraction arithmetic solution here...
    return "0/1"

print('Output:', fractionAddition("-1/2+1/2+1/3"))
print('Expected: 1/3')`,
      java: `public class Solution {
    public static String fractionAddition(String expression) {
        // TODO: Write your fraction arithmetic solution here...
        return "0/1";
    }

    public static void main(String[] args) {
        System.out.println("Output: " + fractionAddition("-1/2+1/2+1/3"));
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

string fractionAddition(string expression) {
    // TODO: Write your fraction arithmetic solution here...
    return "0/1";
}

int main() {
    cout << "Output: " << fractionAddition("-1/2+1/2+1/3") << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(N * log(min(A, B)))',
      spaceComplexity: 'O(1)',
      explanation: 'Use regex or sequential token scanning to parse fractions. Compute running fraction and reduce using GCD.',
      code: `function fractionAddition(expression) {
  function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  }
  const regex = /([+-]?\\d+)\\/(\\d+)/g;
  let num = 0, den = 1;
  let match;
  while ((match = regex.exec(expression)) !== null) {
    const n = parseInt(match[1]);
    const d = parseInt(match[2]);
    num = num * d + n * den;
    den = den * d;
  }
  const g = gcd(num, den);
  return \`\${num / g}/\${den / g}\`;
}`
    }
  },
  {
    id: 'two-sum',
    slug: 'two-sum',
    title: 'Two Sum',
    url: 'https://leetcode.com/problems/two-sum',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    company: 'Amazon / Google',
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 2 + 7 == 9, return [0, 1].'
      }
    ],
    hints: [
      "Hint 1: A brute force O(N^2) checks every pair. Can you do it in a single pass?",
      "Hint 2: As you iterate through the array, what number do you need to reach target? (target - current).",
      "Hint 3: Store previous numbers and their indices in a Hash Map for O(1) lookup!"
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // TODO: Solve in O(N) time using a Hash Map...
  return [];
}

console.log('Output:', twoSum([2, 7, 11, 15], 9));
console.log('Expected: [0, 1]');`,
      python: `def two_sum(nums, target):
    # TODO: Solve in O(N) time using a Hash Map...
    return []

print('Output:', two_sum([2, 7, 11, 15], 9))
print('Expected: [0, 1]')`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // TODO: Solve in O(N) time using a Hash Map...
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println("Output: " + Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: Solve in O(N) time using an unordered_map...
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = twoSum(nums, 9);
    cout << "Executed Two Sum" << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      explanation: 'Use a hash map to store seen values. For each number, check if target - num exists in map.',
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
    }
  },
  {
    id: 'lru-cache',
    slug: 'lru-cache',
    title: 'LRU Cache',
    url: 'https://leetcode.com/problems/lru-cache',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls will be made to get and put'],
    difficulty: 'Medium',
    category: 'System Design & Data Structures',
    company: 'Meta / Microsoft',
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement the LRUCache class:\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return value of the key if it exists, otherwise -1.\n- void put(int key, int value) Update or insert key-value pair. If capacity exceeded, evict the least recently used key.\nBoth operations MUST run in O(1) average time complexity.",
    examples: [
      {
        input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)',
        output: '[null, null, null, 1, null, -1]',
        explanation: 'Key 2 was evicted because key 1 was read.'
      }
    ],
    hints: [
      "Hint 1: To get O(1) lookup, you need a Hash Map. To get O(1) removal and insertion in order, what data structure do you need?",
      "Hint 2: A Doubly Linked List allows O(1) node removal and O(1) head/tail insertion!",
      "Hint 3: In JavaScript, Map preserves insertion order, so re-inserting refreshes key recency!"
    ],
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    // TODO: Initialize data structures...
  }
  get(key) {
    // TODO: Return value & refresh recency in O(1)...
    return -1;
  }
  put(key, value) {
    // TODO: Insert/update & evict LRU item if capacity exceeded...
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log('Get 1:', cache.get(1));`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # TODO: Initialize OrderedDict or Doubly Linked List...
    def get(self, key: int) -> int:
        return -1
    def put(self, key: int, value: int) -> None:
        pass

c = LRUCache(2)
c.put(1, 1)
print('Get 1:', c.get(1))`,
      java: `import java.util.*;

public class Solution {
    static class LRUCache {
        public LRUCache(int capacity) {
            // TODO: Implement O(1) LRU Cache...
        }
        public int get(int key) { return -1; }
        public void put(int key, int value) {}
    }

    public static void main(String[] args) {
        LRUCache c = new LRUCache(2);
        System.out.println("LRU Cache initialized");
    }
}`,
      cpp: `#include <iostream>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {}
    int get(int key) { return -1; }
    void put(int key, int value) {}
};

int main() {
    LRUCache c(2);
    cout << "LRU Cache initialized" << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(1) for get and put',
      spaceComplexity: 'O(Capacity)',
      explanation: 'Maintain a Doubly Linked List with head and tail sentinel nodes alongside a Hash Map mapping keys to node references.',
      code: `class LRUCache {
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
}`
    }
  },
  {
    id: 'trapping-rain-water',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    url: 'https://leetcode.com/problems/trapping-rain-water',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    difficulty: 'Hard',
    category: 'Two Pointers & Dynamic Programming',
    company: 'Google / Amazon',
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map can trap 6 units of rain water.'
      }
    ],
    hints: [
      "Hint 1: Water trapped at index i is determined by: min(max_left, max_right) - height[i].",
      "Hint 2: Instead of computing pre-arrays for left and right max, can you use Two Pointers from both ends?",
      "Hint 3: Maintain left and right pointers. Move the pointer with the smaller max boundary!"
    ],
    starterCode: {
      javascript: `function trap(height) {
  // TODO: Solve using optimal Two Pointers in O(N) time and O(1) space...
  return 0;
}

console.log('Output:', trap([0,1,0,2,1,0,1,3,2,1,2,1]));
console.log('Expected: 6');`,
      python: `def trap(height):
    # TODO: Solve in O(N) time and O(1) space...
    return 0

print('Output:', trap([0,1,0,2,1,0,1,3,2,1,2,1]))
print('Expected: 6')`,
      java: `public class Solution {
    public static int trap(int[] height) {
        // TODO: Solve in O(N) time and O(1) space...
        return 0;
    }
    public static void main(String[] args) {
        System.out.println("Output: " + trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1}));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;
int trap(vector<int>& height) {
    return 0;
}
int main() {
    vector<int> h = {0,1,0,2,1,0,1,3,2,1,2,1};
    cout << "Trapping Rain Water test" << endl;
    return 0;
}`
    },
    solution: {
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      explanation: 'Use two pointers from left and right. The smaller boundary limits water trapping, so move inward.',
      code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, total = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}`
    }
  }
];

// In-Memory Room State Storage

const CURATED_MAP = new Map();
PROBLEMS.forEach(p => {
  CURATED_MAP.set(p.id, p);
  if (p.slug) CURATED_MAP.set(p.slug, p);
});

function getFunctionName(slug, title) {
  if (slug === 'bitwise-xor-of-all-pairings') return 'xorAllNums';
  if (slug === 'two-sum') return 'twoSum';
  if (slug === 'trapping-rain-water') return 'trap';
  if (slug === '132-pattern') return 'find132pattern';
  if (slug === 'lru-cache') return 'LRUCache';
  if (slug === 'substring-xor-queries') return 'substringXorQueries';
  if (slug === 'fraction-addition-and-subtraction') return 'fractionAddition';
  
  const clean = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const parts = clean.split(' ');
  if (!parts[0]) return 'solve';
  const camel = parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  return /^[a-zA-Z_]/.test(camel) ? camel : '_' + camel;
}

function generateProblemDetails(raw) {
  if (!raw) return null;
  const slug = raw.slug || raw.id || 'problem';
  if (CURATED_MAP.has(slug) || CURATED_MAP.has(raw.id)) {
    return CURATED_MAP.get(slug) || CURATED_MAP.get(raw.id);
  }

  const title = raw.title || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const difficulty = raw.difficulty || 'Medium';
  const topics = Array.isArray(raw.topics) && raw.topics.length > 0 ? raw.topics : ['Algorithms'];
  const companies = Array.isArray(raw.companies) && raw.companies.length > 0 ? raw.companies : ['Tech Companies'];
  const primaryTopic = topics[0] || 'Algorithms';
  const primaryCompany = companies[0] || 'Top Tech';
  const acceptance = raw.acceptanceRate || 50;
  const url = raw.url || ('https://leetcode.com/problems/' + slug);
  const fnName = getFunctionName(slug, title);

  let jsParams = 'nums';
  let pyParams = 'nums: list[int]';
  let javaParams = 'int[] nums';
  let cppParams = 'vector<int>& nums';
  let sampleCall = '[1, 2, 3]';
  let javaCall = 'new int[]{1, 2, 3}';

  if (topics.some(t => t.toLowerCase().includes('string'))) {
    jsParams = 's';
    pyParams = 's: str';
    javaParams = 'String s';
    cppParams = 'string s';
    sampleCall = '"leetcode"';
    javaCall = '"leetcode"';
  } else if (topics.some(t => t.toLowerCase().includes('dynamic') || t.toLowerCase().includes('math'))) {
    jsParams = 'n';
    pyParams = 'n: int';
    javaParams = 'int n';
    cppParams = 'int n';
    sampleCall = '5';
    javaCall = '5';
  } else if (topics.some(t => t.toLowerCase().includes('tree'))) {
    jsParams = 'root';
    pyParams = 'root';
    javaParams = 'TreeNode root';
    cppParams = 'TreeNode* root';
    sampleCall = 'null';
    javaCall = 'null';
  }

  const starterCode = {
    javascript: '// Problem: ' + title + ' (' + difficulty + ')\n// Target Companies: ' + companies.slice(0, 4).join(', ') + '\n// Algorithmic Topics: ' + topics.slice(0, 4).join(', ') + '\n\nfunction ' + fnName + '(' + jsParams + ') {\n  // TODO: Implement optimal solution for ' + title + '\n  // Complexity Expectation: ' + (difficulty === 'Hard' ? 'O(N log N)' : 'O(N)') + ' time\n  \n  return null;\n}\n\n// Verification Test Case\nconsole.log("Testing ' + fnName + ':", ' + fnName + '(' + sampleCall + '));\n',
    python: '# Problem: ' + title + ' (' + difficulty + ')\n# Target Companies: ' + companies.slice(0, 4).join(', ') + '\n# Algorithmic Topics: ' + topics.slice(0, 4).join(', ') + '\n\ndef ' + fnName + '(' + pyParams + '):\n    # TODO: Implement optimal solution for ' + title + '\n    # Complexity Expectation: ' + (difficulty === 'Hard' ? 'O(N log N)' : 'O(N)') + ' time\n    \n    return None\n\n# Verification Test Case\nprint("Testing ' + fnName + ':", ' + fnName + '(' + sampleCall + '))\n',
    java: 'import java.util.*;\n\npublic class Solution {\n    // Problem: ' + title + ' (' + difficulty + ')\n    // Target Companies: ' + companies.slice(0, 4).join(', ') + '\n    public static Object ' + fnName + '(' + javaParams + ') {\n        // TODO: Implement optimal solution for ' + title + '\n        \n        return null;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Testing ' + fnName + ': " + ' + fnName + '(' + javaCall + '));\n    }\n}\n',
    cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\n// Problem: ' + title + ' (' + difficulty + ')\n// Target Companies: ' + companies.slice(0, 4).join(', ') + '\nint ' + fnName + '(' + cppParams + ') {\n    // TODO: Implement optimal solution for ' + title + '\n    \n    return 0;\n}\n\nint main() {\n    cout << "Testing ' + fnName + '..." << endl;\n    return 0;\n}\n'
  };

  const description = 'Solve **"' + title + '"** (' + difficulty + ').\n\n### Problem Overview:\nThis problem is a verified technical interview challenge frequently evaluated by **' + companies.slice(0, 6).join(', ') + '**.\n\n### Objective:\nDesign and implement an algorithm to solve **' + title + '** adhering to the time and space complexity standards required in live technical interviews.\n\n### Core Algorithmic Focus:\n• Primary Topics: **' + topics.join(', ') + '**\n• Target Companies: **' + companies.slice(0, 4).join(', ') + '**\n• Acceptance Rate: **' + acceptance + '%**\n\n### Official Reference & Benchmark:\nFull problem statement, additional edge cases, and community benchmarks:\n[' + title + ' on LeetCode](' + url + ')';

  const examples = [
    {
      input: jsParams + ' = ' + sampleCall,
      output: 'Optimal solution output meeting constraints',
      explanation: 'Standard sample case for ' + title + '.'
    },
    {
      input: jsParams + ' = boundary input case',
      output: 'Correct boundary handling',
      explanation: 'Corner case evaluated by ' + primaryCompany + ' technical interviewers.'
    }
  ];

  const constraints = [
    '1 <= input.length <= 10^5',
    '-10^9 <= elements <= 10^9',
    'Optimal Time Complexity: ' + (difficulty === 'Hard' ? 'O(N log N)' : 'O(N)'),
    'Space Complexity: O(1) auxiliary / O(N) auxiliary',
    'Execution Sandbox Timeout: 7.0 seconds'
  ];

  const hints = [
    'Hint 1: This problem directly tests core principles of ' + primaryTopic + '. Think about how ' + topics.slice(0, 2).join(' and ') + ' can reduce redundant computations.',
    'Hint 2: Interviewers at ' + primaryCompany + ' look for optimal Big-O bounds. Can you achieve ' + (difficulty === 'Hard' ? 'O(N log N)' : 'O(N)') + ' using a hash table, two pointers, or greedy scan?',
    'Hint 3: Verify edge cases before running: zero-element or single-element inputs, negative integers, and integer overflow boundaries.'
  ];

  return {
    id: raw.id || slug,
    slug,
    title,
    difficulty,
    category: topics.slice(0, 3).join(' • '),
    company: companies.slice(0, 4).join(', '),
    companies,
    topics,
    frequency: raw.frequency || 80,
    companyFreq: raw.companyFreq || {},
    acceptanceRate: acceptance,
    url,
    description,
    examples,
    constraints,
    hints,
    starterCode,
    solution: {
      timeComplexity: difficulty === 'Hard' ? 'O(N log N)' : 'O(N)',
      spaceComplexity: 'O(1) / O(N)',
      explanation: 'Official benchmark and editorial available at: ' + url,
      code: '// Editorial reference and verified solution: ' + url
    }
  };
}

function getFullProblem(idOrSlug, allProblemsList = []) {
  let prob = null;
  if (!idOrSlug) {
    prob = { ...PROBLEMS[0] };
  } else if (typeof idOrSlug === 'object' && idOrSlug.title) {
    const s = idOrSlug.slug || idOrSlug.id;
    if (s && CURATED_MAP.has(s)) {
      prob = { ...CURATED_MAP.get(s), ...idOrSlug };
    } else {
      prob = generateProblemDetails(idOrSlug);
    }
  } else {
    const target = String(idOrSlug).toLowerCase().trim();
    if (CURATED_MAP.has(target)) {
      prob = { ...CURATED_MAP.get(target) };
    } else if (Array.isArray(allProblemsList) && allProblemsList.length > 0) {
      const match = allProblemsList.find(p => 
        (p.id && String(p.id).toLowerCase() === target) ||
        (p.slug && String(p.slug).toLowerCase() === target) ||
        (p.title && String(p.title).toLowerCase() === target)
      );
      if (match) {
        prob = generateProblemDetails(match);
      }
    }
    if (!prob) {
      prob = generateProblemDetails({ id: idOrSlug, slug: idOrSlug, title: idOrSlug });
    }
  }

  if (prob && !prob.url) {
    const s = prob.slug || prob.id;
    if (s) {
      prob.url = 'https://leetcode.com/problems/' + s;
    }
  }
  return prob;
}


module.exports = {
  PROBLEMS,
  CURATED_MAP,
  getFunctionName,
  generateProblemDetails,
  getFullProblem
};
