
const PROBLEMS = [
  {
    "id": "two-sum",
    "slug": "two-sum",
    "title": "Two Sum",
    "url": "https://leetcode.com/problems/two-sum",
    "difficulty": "Easy",
    "category": "Arrays & Hash Table",
    "company": "Amazon / Google / Meta",
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    "inputFormat": "Array of integers `nums` and integer `target`",
    "outputFormat": "Array of two indices `[index1, index2]`",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]",
        "explanation": "nums[1] + nums[2] == 2 + 4 == 6, return [1, 2]."
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]",
        "explanation": "nums[0] + nums[1] == 3 + 3 == 6, return [0, 1]."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums = [2,7,11,15], target = 9",
        "expectedOutput": "[0,1]",
        "explanation": "Standard positive array"
      },
      {
        "id": 2,
        "input": "nums = [3,2,4], target = 6",
        "expectedOutput": "[1,2]",
        "explanation": "Target achieved with non-initial elements"
      },
      {
        "id": 3,
        "input": "nums = [3,3], target = 6",
        "expectedOutput": "[0,1]",
        "explanation": "Duplicate numbers at distinct indices"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
      "Optimal Time Complexity: O(N)",
      "Optimal Space Complexity: O(N)"
    ],
    "hints": [
      "Hint 1: A brute-force O(N^2) checks every pair. Can you solve it in a single pass?",
      "Hint 2: As you iterate through the array, what number do you need to reach target? That is (target - current).",
      "Hint 3: Store previously visited numbers and their indices in a Hash Map for O(1) lookup!"
    ],
    "starterCode": {
      "javascript": "// Problem: Two Sum (Easy)\n// Target Companies: Amazon, Google, Meta, Microsoft\n\nfunction twoSum(nums, target) {\n  // TODO: Implement optimal O(N) solution using a Hash Map\n  \n  return [];\n}\n\n// Verification Test Case\nconsole.log('Output:', JSON.stringify(twoSum([2, 7, 11, 15], 9)));\nconsole.log('Expected:', JSON.stringify([0, 1]));",
      "python": "# Problem: Two Sum (Easy)\n# Target Companies: Amazon, Google, Meta, Microsoft\n\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    # TODO: Implement optimal O(N) solution using a Hash Map\n    \n    return []\n\n# Verification Test Case\nprint('Output:', two_sum([2, 7, 11, 15], 9))\nprint('Expected:', [0, 1])",
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Two Sum (Easy)\n    public static int[] twoSum(int[] nums, int target) {\n        // TODO: Implement optimal O(N) solution using a Hash Map\n        \n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));\n        System.out.println(\"Expected: [0, 1]\");\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // TODO: Implement optimal O(N) solution using an unordered_map\n    return {};\n}\n\nint main() {\n    vector<int> nums = {2, 7, 11, 15};\n    vector<int> res = twoSum(nums, 9);\n    cout << \"Executed Two Sum\" << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "explanation": "Maintain a Hash Map mapping visited values to their indices. For each element nums[i], check if (target - nums[i]) exists in the map. If yes, return [map.get(complement), i]. Otherwise insert nums[i] -> i.",
      "code": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
    }
  },
  {
    "id": "3sum",
    "slug": "3sum",
    "title": "3Sum",
    "url": "https://leetcode.com/problems/3sum",
    "difficulty": "Medium",
    "category": "Two Pointers & Sorting",
    "company": "Amazon / Meta / Microsoft / Apple",
    "description": "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    "inputFormat": "Array of integers `nums`",
    "outputFormat": "Array of integer triplets `[[a, b, c], ...]`",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "The distinct triplets are [-1,0,1] and [-1,-1,2]."
      },
      {
        "input": "nums = [0,1,1]",
        "output": "[]",
        "explanation": "The only possible triplet does not sum up to 0."
      },
      {
        "input": "nums = [0,0,0]",
        "output": "[[0,0,0]]",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-1,0,1,2,-1,-4]",
        "expectedOutput": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "Mixed positive and negative values"
      },
      {
        "id": 2,
        "input": "nums = [0,1,1]",
        "expectedOutput": "[]",
        "explanation": "No zero sum triplet possible"
      },
      {
        "id": 3,
        "input": "nums = [0,0,0]",
        "expectedOutput": "[[0,0,0]]",
        "explanation": "All zero elements"
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5",
      "Optimal Time Complexity: O(N^2)",
      "Space Complexity: O(1) auxiliary"
    ],
    "hints": [
      "Hint 1: Sorting the array first takes O(N log N) and makes it trivial to skip duplicate triplets.",
      "Hint 2: Iterate index i from 0 to n-1. If nums[i] == nums[i-1], skip it to avoid duplicates.",
      "Hint 3: For each fixed nums[i], run a standard Two-Pointer sweep on the remaining subarray looking for sum == -nums[i]."
    ],
    "starterCode": {
      "javascript": "// Problem: 3Sum (Medium)\n// Target Companies: Amazon, Meta, Microsoft, Apple\n\nfunction threeSum(nums) {\n  // TODO: Sort nums and use two-pointer technique in O(N^2)\n  \n  return [];\n}\n\n// Verification Test Case\nconsole.log('Output:', JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])));\nconsole.log('Expected:', JSON.stringify([[-1, -1, 2], [-1, 0, 1]]));",
      "python": "# Problem: 3Sum (Medium)\n\ndef three_sum(nums: list[int]) -> list[list[int]]:\n    # TODO: Sort nums and use two-pointer technique in O(N^2)\n    return []\n\nprint('Output:', three_sum([-1, 0, 1, 2, -1, -4]))\nprint('Expected:', [[-1, -1, 2], [-1, 0, 1]])",
      "java": "import java.util.*;\n\npublic class Solution {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + threeSum(new int[]{-1, 0, 1, 2, -1, -4}));\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    return {};\n}\n\nint main() {\n    vector<int> nums = {-1, 0, 1, 2, -1, -4};\n    cout << \"Executed 3Sum\" << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1) auxiliary",
      "explanation": "Sort nums ascending. Iterate i from 0 to n-3. If nums[i] > 0, break early. If i > 0 and nums[i] === nums[i - 1], skip. Use left = i+1 and right = n-1. When sum === 0, record triplet and advance both pointers while skipping duplicate adjacent elements.",
      "code": "function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const result = [];\n  const n = nums.length;\n  for (let i = 0; i < n - 2; i++) {\n    if (nums[i] > 0) break;\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = n - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        result.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n  return result;\n}"
    }
  },
  {
    "id": "3sum-closest",
    "slug": "3sum-closest",
    "title": "3Sum Closest",
    "url": "https://leetcode.com/problems/3sum-closest",
    "difficulty": "Medium",
    "category": "Two Pointers & Sorting",
    "company": "Bloomberg / Amazon / Google",
    "description": "Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`.\n\nReturn the sum of the three integers.\n\nYou may assume that each input would have exactly one solution.",
    "inputFormat": "Array of integers `nums` and integer `target`",
    "outputFormat": "Integer sum closest to target",
    "examples": [
      {
        "input": "nums = [-1,2,1,-4], target = 1",
        "output": "2",
        "explanation": "The sum that is closest to the target is 2. (-1 + 2 + 1 = 2)."
      },
      {
        "input": "nums = [0,0,0], target = 1",
        "output": "0",
        "explanation": "The sum that is closest to the target is 0. (0 + 0 + 0 = 0)."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-1,2,1,-4], target = 1",
        "expectedOutput": "2",
        "explanation": "Target 1 with closest sum 2"
      },
      {
        "id": 2,
        "input": "nums = [0,0,0], target = 1",
        "expectedOutput": "0",
        "explanation": "All zero inputs"
      }
    ],
    "constraints": [
      "3 <= nums.length <= 500",
      "-1000 <= nums[i] <= 1000",
      "-10^4 <= target <= 10^4",
      "Optimal Time Complexity: O(N^2)",
      "Space Complexity: O(1)"
    ],
    "hints": [
      "Hint 1: Sort the array first to enable two-pointer traversal.",
      "Hint 2: Track closest sum by comparing Math.abs(currentSum - target) with Math.abs(closest - target).",
      "Hint 3: If currentSum < target, increment left pointer; if larger, decrement right pointer. If equal, return target immediately!"
    ],
    "starterCode": {
      "javascript": "// Problem: 3Sum Closest (Medium)\n\nfunction threeSumClosest(nums, target) {\n  // TODO: Implement O(N^2) closest triplet search\n  return 0;\n}\n\nconsole.log('Output:', threeSumClosest([-1, 2, 1, -4], 1));\nconsole.log('Expected: 2');",
      "python": "def three_sum_closest(nums: list[int], target: int) -> int:\n    return 0\n\nprint('Output:', three_sum_closest([-1, 2, 1, -4], 1))\nprint('Expected: 2')",
      "java": "public class Solution {\n    public static int threeSumClosest(int[] nums, int target) {\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + threeSumClosest(new int[]{-1, 2, 1, -4}, 1));\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint threeSumClosest(vector<int>& nums, int target) {\n    return 0;\n}\nint main() {\n    vector<int> nums = {-1, 2, 1, -4};\n    cout << \"Output: \" << threeSumClosest(nums, 1) << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(N^2)",
      "spaceComplexity": "O(1)",
      "explanation": "Sort array. Initialize closest = nums[0] + nums[1] + nums[2]. Loop each element and run two pointers from both ends of remaining array, adjusting closest whenever a smaller distance to target is reached.",
      "code": "function threeSumClosest(nums, target) {\n  nums.sort((a, b) => a - b);\n  let closest = nums[0] + nums[1] + nums[2];\n  const n = nums.length;\n  for (let i = 0; i < n - 2; i++) {\n    let left = i + 1, right = n - 1;\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (Math.abs(sum - target) < Math.abs(closest - target)) {\n        closest = sum;\n      }\n      if (sum < target) left++;\n      else if (sum > target) right--;\n      else return target;\n    }\n  }\n  return closest;\n}"
    }
  },
  {
    "id": "bitwise-xor-of-all-pairings",
    "slug": "bitwise-xor-of-all-pairings",
    "title": "Bitwise XOR of All Pairings",
    "url": "https://leetcode.com/problems/bitwise-xor-of-all-pairings",
    "difficulty": "Medium",
    "category": "Bit Manipulation & Math",
    "company": "Trilogy Innovations",
    "description": "You are given two 0-indexed arrays, `nums1` and `nums2`, consisting of non-negative integers. There exists another array, `nums3`, which contains the bitwise XOR of all pairings of integers between `nums1` and `nums2` (every integer in `nums1` is paired with every integer in `nums2` exactly once).\n\nReturn the bitwise XOR of all integers in `nums3`.",
    "inputFormat": "Two integer arrays `nums1` and `nums2`",
    "outputFormat": "Bitwise XOR sum integer",
    "examples": [
      {
        "input": "nums1 = [2,1,3], nums2 = [10,2,5,0]",
        "output": "13",
        "explanation": "nums3 = [8,0,7,2,11,3,4,1,9,1,6,3]. The bitwise XOR of all integers is 13."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "0",
        "explanation": "All integers pair up evenly and cancel out."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums1 = [2,1,3], nums2 = [10,2,5,0]",
        "expectedOutput": "13",
        "explanation": "Trilogy Innovations benchmark test case"
      },
      {
        "id": 2,
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "expectedOutput": "0",
        "explanation": "Even parity cancellation"
      }
    ],
    "constraints": [
      "1 <= nums1.length, nums2.length <= 10^5",
      "0 <= nums1[i], nums2[j] <= 10^9",
      "Optimal Time Complexity: O(N + M)",
      "Space Complexity: O(1)"
    ],
    "hints": [
      "Hint 1: Notice the mathematical property: a ^ a = 0 (even count cancels) and a ^ 0 = a (odd count remains).",
      "Hint 2: How many times does each element of nums1 appear in nums3? Exactly len(nums2) times!",
      "Hint 3: If len(nums2) is odd, XOR all elements of nums1. If len(nums1) is odd, XOR all elements of nums2. Compute in O(N + M) time!"
    ],
    "starterCode": {
      "javascript": "// Problem: Bitwise XOR of All Pairings (Medium)\n// Target Company: Trilogy Innovations\n\nfunction xorAllNums(nums1, nums2) {\n  // TODO: Parity analysis in O(N + M)\n  \n  return 0;\n}\n\n// Verification Test Case\nconsole.log('Output:', xorAllNums([2, 1, 3], [10, 2, 5, 0]));\nconsole.log('Expected: 13');",
      "python": "# Problem: Bitwise XOR of All Pairings (Medium)\n\ndef xor_all_nums(nums1: list[int], nums2: list[int]) -> int:\n    return 0\n\nprint('Output:', xor_all_nums([2, 1, 3], [10, 2, 5, 0]))\nprint('Expected: 13')",
      "java": "public class Solution {\n    public static int xorAllNums(int[] nums1, int[] nums2) {\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + xorAllNums(new int[]{2, 1, 3}, new int[]{10, 2, 5, 0}));\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint xorAllNums(vector<int>& nums1, vector<int>& nums2) {\n    return 0;\n}\nint main() {\n    vector<int> nums1 = {2, 1, 3}, nums2 = {10, 2, 5, 0};\n    cout << \"Output: \" << xorAllNums(nums1, nums2) << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(N + M)",
      "spaceComplexity": "O(1)",
      "explanation": "Each element in nums1 appears len(nums2) times. If len(nums2) is odd, each nums1[i] contributes to final XOR. Similarly for nums2 with len(nums1).",
      "code": "function xorAllNums(nums1, nums2) {\n  let x1 = 0, x2 = 0;\n  if (nums2.length % 2 !== 0) {\n    for (const n of nums1) x1 ^= n;\n  }\n  if (nums1.length % 2 !== 0) {\n    for (const n of nums2) x2 ^= n;\n  }\n  return x1 ^ x2;\n}"
    }
  },
  {
    "id": "all-oone-data-structure",
    "slug": "all-oone-data-structure",
    "title": "All O'one Data Structure",
    "url": "https://leetcode.com/problems/all-oone-data-structure",
    "difficulty": "Hard",
    "category": "Design & Doubly Linked List",
    "company": "Trilogy Innovations / Uber / LinkedIn",
    "description": "Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts in **O(1)** average time complexity.\n\nImplement the `AllOne` class:\n- `AllOne()`: Initializes the object of the data structure.\n- `inc(String key)`: Increments the count of the string `key` by 1. If `key` does not exist, insert it with count 1.\n- `dec(String key)`: Decrements the count of the string `key` by 1. If the count reaches 0, remove it.\n- `getMaxKey()`: Returns one of the keys with maximal count. If no element exists, return `\"\"`.\n- `getMinKey()`: Returns one of the keys with minimum count. If no element exists, return `\"\"`.",
    "inputFormat": "Sequence of method calls to AllOne instance",
    "outputFormat": "Max and Min keys or null for mutation calls",
    "examples": [
      {
        "input": "allOne.inc(\"hello\"); allOne.inc(\"hello\"); allOne.getMaxKey(); allOne.getMinKey(); allOne.inc(\"leet\"); allOne.getMaxKey();",
        "output": "[\"hello\", \"hello\", \"hello\"]",
        "explanation": "After two increments of \"hello\", max and min are \"hello\"."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "inc(\"hello\"), inc(\"hello\"), getMaxKey()",
        "expectedOutput": "\"hello\"",
        "explanation": "Single element frequency tracking"
      },
      {
        "id": 2,
        "input": "inc(\"hello\"), inc(\"world\"), inc(\"world\"), getMinKey()",
        "expectedOutput": "\"hello\"",
        "explanation": "Distinct minimum key query"
      }
    ],
    "constraints": [
      "1 <= key.length <= 10",
      "key consists of lowercase English letters.",
      "At most 5 * 10^4 calls will be made.",
      "Each operation MUST run in O(1) average time complexity."
    ],
    "hints": [
      "Hint 1: To achieve O(1) for both min and max, counts must remain ordered.",
      "Hint 2: Use a Doubly Linked List of Nodes, where each Node represents a specific count and holds a Set of strings having that count.",
      "Hint 3: Maintain a Hash Map mapping each string to its Node in the Doubly Linked List."
    ],
    "starterCode": {
      "javascript": "// Problem: All O'one Data Structure (Hard)\n// Target Companies: Trilogy Innovations, Uber, LinkedIn\n\nclass AllOne {\n  constructor() {\n    this.counts = new Map();\n  }\n\n  inc(key) {\n    this.counts.set(key, (this.counts.get(key) || 0) + 1);\n  }\n\n  dec(key) {\n    if (!this.counts.has(key)) return;\n    const c = this.counts.get(key) - 1;\n    if (c <= 0) this.counts.delete(key);\n    else this.counts.set(key, c);\n  }\n\n  getMaxKey() {\n    if (this.counts.size === 0) return \"\";\n    let maxK = \"\", maxC = -Infinity;\n    for (const [k, v] of this.counts.entries()) {\n      if (v > maxC) { maxC = v; maxK = k; }\n    }\n    return maxK;\n  }\n\n  getMinKey() {\n    if (this.counts.size === 0) return \"\";\n    let minK = \"\", minC = Infinity;\n    for (const [k, v] of this.counts.entries()) {\n      if (v < minC) { minC = v; minK = k; }\n    }\n    return minK;\n  }\n}\n\nconst allOne = new AllOne();\nallOne.inc(\"hello\");\nallOne.inc(\"hello\");\nconsole.log(\"MaxKey:\", allOne.getMaxKey());\nconsole.log(\"Expected: hello\");",
      "python": "class AllOne:\n    def __init__(self):\n        self.counts = {}\n\n    def inc(self, key: str) -> None:\n        self.counts[key] = self.counts.get(key, 0) + 1\n\n    def dec(self, key: str) -> None:\n        if key in self.counts:\n            self.counts[key] -= 1\n            if self.counts[key] == 0:\n                del self.counts[key]\n\n    def get_max_key(self) -> str:\n        return max(self.counts, key=self.counts.get) if self.counts else \"\"\n\n    def get_min_key(self) -> str:\n        return min(self.counts, key=self.counts.get) if self.counts else \"\"\n\nallOne = AllOne()\nallOne.inc(\"hello\")\nprint(\"MaxKey:\", allOne.get_max_key())",
      "java": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"AllOne compiled\");\n    }\n}",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    cout << \"AllOne compiled\" << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(1) average for all operations",
      "spaceComplexity": "O(N) total distinct strings",
      "explanation": "Doubly Linked List with head and tail sentinels holds Buckets with count and Set<string>. Map stores string -> bucket reference. Incrementing moves key to bucket with count+1 in O(1).",
      "code": "// Doubly linked list of frequency buckets"
    }
  },
  {
    "id": "trapping-rain-water",
    "slug": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "url": "https://leetcode.com/problems/trapping-rain-water",
    "difficulty": "Hard",
    "category": "Two Pointers & Dynamic Programming",
    "company": "Google / Amazon / Meta / Bloomberg",
    "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "inputFormat": "Array of non-negative integers `height`",
    "outputFormat": "Total trapped water integer units",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The elevation map traps 6 units of rain water."
      },
      {
        "input": "height = [4,2,0,3,2,5]",
        "output": "9",
        "explanation": "Trapped water between boundaries equals 9 units."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "expectedOutput": "6",
        "explanation": "Standard multi-peak elevation map"
      },
      {
        "id": 2,
        "input": "height = [4,2,0,3,2,5]",
        "expectedOutput": "9",
        "explanation": "Deep central valley"
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
      "Optimal Time Complexity: O(N)",
      "Space Complexity: O(1)"
    ],
    "hints": [
      "Hint 1: Water trapped above bar i is min(leftMax[i], rightMax[i]) - height[i].",
      "Hint 2: You can eliminate O(N) memory by using Two Pointers from left = 0 and right = n-1.",
      "Hint 3: Maintain leftMax and rightMax. Always advance the pointer pointing to the lower maximum boundary!"
    ],
    "starterCode": {
      "javascript": "// Problem: Trapping Rain Water (Hard)\n\nfunction trap(height) {\n  // TODO: Two Pointers in O(N) time and O(1) space\n  return 0;\n}\n\nconsole.log('Output:', trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));\nconsole.log('Expected: 6');",
      "python": "def trap(height: list[int]) -> int:\n    return 0\n\nprint('Output:', trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))\nprint('Expected: 6')",
      "java": "public class Solution {\n    public static int trap(int[] height) {\n        return 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + trap(new int[]{0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1}));\n    }\n}",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\nint trap(vector<int>& height) {\n    return 0;\n}\nint main() {\n    vector<int> h = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};\n    cout << \"Output: \" << trap(h) << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "explanation": "Use two pointers from left and right. The smaller boundary determines how much water can be trapped, so update that side's maximum and move inward.",
      "code": "function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, total = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else total += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else total += rightMax - height[right];\n      right--;\n    }\n  }\n  return total;\n}"
    }
  },
  {
    "id": "lru-cache",
    "slug": "lru-cache",
    "title": "LRU Cache",
    "url": "https://leetcode.com/problems/lru-cache",
    "difficulty": "Medium",
    "category": "System Design & Data Structures",
    "company": "Amazon / Microsoft / Google / Meta",
    "description": "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)`: Initialize the LRU cache with positive size `capacity`.\n- `int get(int key)`: Return the value of the `key` if the key exists, otherwise return `-1`.\n- `void put(int key, int value)`: Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair. If capacity exceeded, evict least recently used key.\n\nBoth functions must run in **O(1)** average time complexity.",
    "inputFormat": "Capacity integer, followed by sequence of get/put calls",
    "outputFormat": "Get return values or null for put",
    "examples": [
      {
        "input": "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)",
        "output": "[null, null, null, 1, null, -1]",
        "explanation": "Key 2 was evicted because key 1 was read."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "capacity = 2, put(1,1), put(2,2), get(1)",
        "expectedOutput": "1",
        "explanation": "Basic get retrieval"
      },
      {
        "id": 2,
        "input": "capacity = 2, put(1,1), put(2,2), put(3,3), get(1)",
        "expectedOutput": "-1",
        "explanation": "Key 1 evicted due to capacity"
      }
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
      "Optimal Time Complexity: O(1) for both get and put"
    ],
    "hints": [
      "Hint 1: A Hash Map provides O(1) lookups, but does not track eviction order.",
      "Hint 2: A Doubly Linked List allows O(1) node removal and insertion.",
      "Hint 3: Combine a Hash Map (key -> node) with a Doubly Linked List."
    ],
    "starterCode": {
      "javascript": "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) {\n      this.map.delete(this.map.keys().next().value);\n    }\n  }\n}\n\nconst lru = new LRUCache(2);\nlru.put(1, 1);\nlru.put(2, 2);\nconsole.log('get(1):', lru.get(1));\nconsole.log('Expected: 1');",
      "python": "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity: self.cache.popitem(last=False)\n\nlru = LRUCache(2)\nlru.put(1, 1)\nprint('get(1):', lru.get(1))",
      "java": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"LRU Cache compiled\");\n    }\n}",
      "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    cout << \"LRU Cache compiled\" << endl;\n    return 0;\n}"
    },
    "solution": {
      "timeComplexity": "O(1) for get and put",
      "spaceComplexity": "O(capacity)",
      "explanation": "JavaScript Map maintains insertion order. By deleting and re-inserting accessed keys, the keys().next().value iterator yields least recently used key in O(1).",
      "code": "// JS Map based LRUCache"
    }
  },
  {
    "id": "median-of-two-sorted-arrays",
    "slug": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays",
    "difficulty": "Hard",
    "category": "Binary Search & Divide and Conquer",
    "company": "Google / Amazon / Microsoft / Meta",
    "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be **O(log (m+n))**.",
    "inputFormat": "Two sorted integer arrays `nums1` and `nums2`",
    "outputFormat": "Floating point median value",
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.0",
        "explanation": "Merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.5",
        "explanation": "Merged array = [1,2,3,4] and median is 2.5."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums1 = [1,3], nums2 = [2]",
        "expectedOutput": "2.0",
        "explanation": "Odd total length"
      },
      {
        "id": 2,
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "expectedOutput": "2.5",
        "explanation": "Even total length"
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "Optimal Time Complexity: O(log(min(M, N)))"
    ],
    "hints": [
      "Hint 1: Merging in O(M+N) violates the complexity constraint. You must binary search.",
      "Hint 2: Binary search on the shorter array to find partition cut i.",
      "Hint 3: Ensure maxLeft1 <= minRight2 and maxLeft2 <= minRight1."
    ],
    "starterCode": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n  // TODO: Binary search partition in O(log(min(m, n)))\n  return 0.0;\n}\nconsole.log('Output:', findMedianSortedArrays([1, 3], [2]));\nconsole.log('Expected: 2.0');",
      "python": "def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:\n    return 0.0\nprint('Output:', find_median_sorted_arrays([1, 3], [2]))",
      "java": "public class Solution {\n    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}",
      "cpp": "#include <vector>\nusing namespace std;\ndouble findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    return 0.0;\n}"
    },
    "solution": {
      "timeComplexity": "O(log(min(M, N)))",
      "spaceComplexity": "O(1)",
      "explanation": "Binary search partition on the shorter array.",
      "code": "function findMedianSortedArrays(nums1, nums2) { ... }"
    }
  },
  {
    "id": "132-pattern",
    "slug": "132-pattern",
    "title": "132 Pattern",
    "url": "https://leetcode.com/problems/132-pattern",
    "difficulty": "Medium",
    "category": "Monotonic Stack",
    "company": "Amazon / Bloomberg / Meta / Google",
    "description": "Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of three integers `nums[i]`, `nums[j]` and `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`.\n\nReturn `true` if there is a **132 pattern** in `nums`, otherwise return `false`.",
    "inputFormat": "Array of integers `nums`",
    "outputFormat": "Boolean true/false",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "false",
        "explanation": "There is no 132 pattern in the sequence."
      },
      {
        "input": "nums = [3,1,4,2]",
        "output": "true",
        "explanation": "There is a 132 pattern in the sequence: [1, 4, 2]."
      },
      {
        "input": "nums = [-1,3,2,0]",
        "output": "true",
        "explanation": "There are three 132 patterns in the sequence."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums = [1,2,3,4]",
        "expectedOutput": "false",
        "explanation": "Monotonically increasing"
      },
      {
        "id": 2,
        "input": "nums = [3,1,4,2]",
        "expectedOutput": "true",
        "explanation": "Pattern at [1,4,2]"
      },
      {
        "id": 3,
        "input": "nums = [-1,3,2,0]",
        "expectedOutput": "true",
        "explanation": "Negative numbers with pattern"
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 2 * 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Optimal Time Complexity: O(N)",
      "Space Complexity: O(N)"
    ],
    "hints": [
      "Hint 1: We need nums[i] < nums[k] < nums[j] with i < j < k.",
      "Hint 2: Scan from right to left while maintaining a Monotonic Stack to find candidates for nums[j] and the largest possible nums[k].",
      "Hint 3: Whenever current nums[i] < nums[k], a valid 132 pattern is found!"
    ],
    "starterCode": {
      "javascript": "function find132pattern(nums) {\n  // TODO: Monotonic Stack in O(N)\n  return false;\n}\nconsole.log('Output:', find132pattern([3, 1, 4, 2]));\nconsole.log('Expected: true');",
      "python": "def find132pattern(nums: list[int]) -> bool:\n    return False",
      "java": "public class Solution {\n    public static boolean find132pattern(int[] nums) {\n        return false;\n    }\n}",
      "cpp": "#include <vector>\nusing namespace std;\nbool find132pattern(vector<int>& nums) {\n    return false;\n}"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "explanation": "Iterate from right to left maintaining stack of nums[j] candidates.",
      "code": "function find132pattern(nums) { ... }"
    }
  },
  {
    "id": "minimum-remove-to-make-valid-parentheses",
    "slug": "minimum-remove-to-make-valid-parentheses",
    "title": "Minimum Remove to Make Valid Parentheses",
    "url": "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses",
    "difficulty": "Medium",
    "category": "String & Stack",
    "company": "Meta / Amazon / Bloomberg / Microsoft",
    "description": "Given a string `s` of `'('`, `')'` and lowercase English characters.\n\nYour task is to remove the minimum number of parentheses so that the resulting parentheses string is valid and return **any** valid string.",
    "inputFormat": "String `s`",
    "outputFormat": "Valid string after removing minimum parentheses",
    "examples": [
      {
        "input": "s = \"lee(t(c)o)de)\"",
        "output": "\"lee(t(c)o)de\"",
        "explanation": "Valid parenthesized string"
      },
      {
        "input": "s = \"a)b(c)d\"",
        "output": "\"ab(c)d\""
      },
      {
        "input": "s = \"))((\"",
        "output": "\"\""
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "s = \"lee(t(c)o)de)\"",
        "expectedOutput": "\"lee(t(c)o)de\"",
        "explanation": "Unmatched closing parenthesis at the end"
      },
      {
        "id": 2,
        "input": "s = \"a)b(c)d\"",
        "expectedOutput": "\"ab(c)d\"",
        "explanation": "Unmatched closing parenthesis in the middle"
      },
      {
        "id": 3,
        "input": "s = \"))((\"",
        "expectedOutput": "\"\"",
        "explanation": "All invalid parentheses"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "s[i] is either '(', ')', or lowercase English letter.",
      "Optimal Time Complexity: O(N)",
      "Space Complexity: O(N)"
    ],
    "hints": [
      "Hint 1: An unmatched closing parenthesis ')' can never become valid.",
      "Hint 2: Push indices of opening parentheses '(' onto a stack.",
      "Hint 3: At the end, remove any indices left in the stack."
    ],
    "starterCode": {
      "javascript": "function minRemoveToMakeValid(s) {\n  // TODO: Stack based index tracking in O(N)\n  return \"\";\n}\nconsole.log('Output:', JSON.stringify(minRemoveToMakeValid(\"lee(t(c)o)de)\")));\nconsole.log('Expected:', JSON.stringify(\"lee(t(c)o)de\"));",
      "python": "def min_remove_to_make_valid(s: str) -> str:\n    return \"\"",
      "java": "public class Solution {\n    public static String minRemoveToMakeValid(String s) {\n        return \"\";\n    }\n}",
      "cpp": "#include <string>\nusing namespace std;\nstring minRemoveToMakeValid(string s) {\n    return \"\";\n}"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "explanation": "Track open bracket indices on a stack.",
      "code": "function minRemoveToMakeValid(s) { ... }"
    }
  },
  {
    "id": "substring-xor-queries",
    "slug": "substring-xor-queries",
    "title": "Substring XOR Queries",
    "url": "https://leetcode.com/problems/substring-xor-queries",
    "difficulty": "Medium",
    "category": "Bit Manipulation & Hash Table",
    "company": "Trilogy Innovations",
    "description": "You are given a binary string `s`, and a 2D integer array `queries` where `queries[i] = [first_i, second_i]`.\n\nFor each query, find the shortest substring of `s` whose decimal value `val` satisfies: `val ^ first_i == second_i`.\n\nReturn an array `ans` where `ans[i] = [left_i, right_i]` is the shortest substring bounds, or `[-1, -1]`.",
    "inputFormat": "Binary string s and 2D query array",
    "outputFormat": "Array of range intervals [[left, right], ...]",
    "examples": [
      {
        "input": "s = \"101101\", queries = [[0,5],[1,2]]",
        "output": "[[0,2],[2,3]]",
        "explanation": "For query [0,5], val = 5. Substring s[0..2] is \"101\"."
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "s = \"101101\", queries = [[0,5],[1,2]]",
        "expectedOutput": "[[0,2],[2,3]]",
        "explanation": "Substring binary match"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s[i] is either '0' or '1'",
      "1 <= queries.length <= 10^5",
      "Optimal Time Complexity: O(N * 30 + Q)"
    ],
    "hints": [
      "Hint 1: val ^ first == second implies val == first ^ second.",
      "Hint 2: Since numbers in queries are <= 10^9, their binary representation is at most 30 bits long!",
      "Hint 3: Precompute all substrings of s with lengths up to 30."
    ],
    "starterCode": {
      "javascript": "function substringXorQueries(s, queries) {\n  return [];\n}\nconsole.log('Output:', JSON.stringify(substringXorQueries(\"101101\", [[0,5],[1,2]])));\nconsole.log('Expected:', JSON.stringify([[0,2],[2,3]]));",
      "python": "def substring_xor_queries(s: str, queries: list[list[int]]) -> list[list[int]]:\n    return []",
      "java": "public class Solution {\n    public static int[][] substringXorQueries(String s, int[][] queries) {\n        return new int[][]{};\n    }\n}",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\nvector<vector<int>> substringXorQueries(string s, vector<vector<int>>& queries) {\n    return {};\n}"
    },
    "solution": {
      "timeComplexity": "O(N * 30 + Q)",
      "spaceComplexity": "O(N * 30)",
      "explanation": "Pre-index decimal values of all substrings up to length 30.",
      "code": "function substringXorQueries(s, queries) { ... }"
    }
  },
  {
    "id": "fraction-addition-and-subtraction",
    "slug": "fraction-addition-and-subtraction",
    "title": "Fraction Addition and Subtraction",
    "url": "https://leetcode.com/problems/fraction-addition-and-subtraction",
    "difficulty": "Medium",
    "category": "Math & Simulation",
    "company": "Trilogy Innovations",
    "description": "Given a string `expression` representing an expression of fraction addition and subtraction, return the calculation result in string format.\n\nThe final result should be an irreducible fraction `A/B`.",
    "inputFormat": "String arithmetic expression",
    "outputFormat": "Irreducible fraction string A/B",
    "examples": [
      {
        "input": "expression = \"-1/2+1/2\"",
        "output": "\"0/1\"",
        "explanation": "-1/2 + 1/2 = 0/1"
      },
      {
        "input": "expression = \"-1/2+1/2+1/3\"",
        "output": "\"1/3\""
      }
    ],
    "testCases": [
      {
        "id": 1,
        "input": "expression = \"-1/2+1/2\"",
        "expectedOutput": "\"0/1\"",
        "explanation": "Opposite signs cancel"
      },
      {
        "id": 2,
        "input": "expression = \"-1/2+1/2+1/3\"",
        "expectedOutput": "\"1/3\"",
        "explanation": "Fraction arithmetic"
      }
    ],
    "constraints": [
      "The input string only contains \"0\" to \"9\", \"/\", \"+\", \"-\"",
      "Numerator and denominator are in range [1, 10]",
      "Optimal Time Complexity: O(N * log(min(A, B)))"
    ],
    "hints": [
      "Hint 1: Parse the string sequentially to extract numerators and denominators.",
      "Hint 2: When adding a/b + c/d = (a*d + c*b) / (b*d).",
      "Hint 3: Use the Euclidean GCD algorithm to reduce the fraction."
    ],
    "starterCode": {
      "javascript": "function fractionAddition(expression) {\n  return \"0/1\";\n}\nconsole.log('Output:', fractionAddition(\"-1/2+1/2+1/3\"));\nconsole.log('Expected: \"1/3\"');",
      "python": "def fraction_addition(expression: str) -> str:\n    return \"0/1\"",
      "java": "public class Solution {\n    public static String fractionAddition(String expression) {\n        return \"0/1\";\n    }\n}",
      "cpp": "#include <string>\nusing namespace std;\nstring fractionAddition(string expression) {\n    return \"0/1\";\n}"
    },
    "solution": {
      "timeComplexity": "O(N * log(min(A, B)))",
      "spaceComplexity": "O(1)",
      "explanation": "Scan fractions, accumulate running fraction, reduce with GCD.",
      "code": "function fractionAddition(expression) { ... }"
    }
  }
];

const CURATED_MAP = new Map();
PROBLEMS.forEach(p => {
  CURATED_MAP.set(p.id, p);
  if (p.slug) CURATED_MAP.set(p.slug, p);
});

function getFunctionName(slug, title) {
  if (slug === 'bitwise-xor-of-all-pairings') return 'xorAllNums';
  if (slug === 'two-sum') return 'twoSum';
  if (slug === '3sum') return 'threeSum';
  if (slug === '3sum-closest') return 'threeSumClosest';
  if (slug === 'all-oone-data-structure') return 'AllOne';
  if (slug === 'trapping-rain-water') return 'trap';
  if (slug === '132-pattern') return 'find132pattern';
  if (slug === 'lru-cache') return 'LRUCache';
  if (slug === 'substring-xor-queries') return 'substringXorQueries';
  if (slug === 'fraction-addition-and-subtraction') return 'fractionAddition';
  if (slug === 'median-of-two-sorted-arrays') return 'findMedianSortedArrays';
  if (slug === 'minimum-remove-to-make-valid-parentheses') return 'minRemoveToMakeValid';

  const clean = (slug || title || 'solve')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
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

  const testCases = [
    { id: 1, input: jsParams + ' = ' + sampleCall, expectedOutput: 'Optimal solution output', explanation: 'Sample verification case' },
    { id: 2, input: jsParams + ' = boundary case', expectedOutput: 'Boundary case output', explanation: 'Edge verification case' }
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
    'Hint 3: Watch out for boundary conditions such as empty collections, single-element cases, and integer overflow before writing final code.'
  ];

  return {
    id: slug,
    slug,
    title,
    difficulty,
    category: primaryTopic,
    company: primaryCompany,
    companies,
    topics,
    frequency: raw.frequency || 80,
    companyFreq: raw.companyFreq || {},
    acceptanceRate: acceptance,
    url,
    description,
    inputFormat: jsParams + ' parameter signature',
    outputFormat: 'Calculated return value matching specification',
    examples,
    testCases,
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

  if (prob && (!prob.testCases || prob.testCases.length === 0)) {
    prob.testCases = (prob.examples || []).map((ex, i) => ({
      id: i + 1,
      input: ex.input,
      expectedOutput: ex.output,
      explanation: ex.explanation || ''
    }));
  }

  return prob;
}

export {
  PROBLEMS,
  CURATED_MAP,
  getFunctionName,
  generateProblemDetails,
  getFullProblem
};
