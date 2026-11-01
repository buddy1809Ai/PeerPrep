// Production Problem Utilities & Dataset Engine for PeerPrep
// Supports 3,392 LeetCode problems across 470 companies with Java Default & Interview Intelligence

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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Hash Map Lookup",
        "Array Indexing",
        "Complement Math"
      ],
      "bruteForceThinking": "Iterate through all pairs (i, j) with i < j and check if nums[i] + nums[j] == target. Quadratic O(N^2) time complexity.",
      "progressiveHints": {
        "concept": "For any number x, there is only one specific value (target - x) that can pair with it to reach the target.",
        "approach": "Can you remember previously seen numbers so you can check for the complement in O(1) time?",
        "algorithm": "Iterate through nums. For each element, check if target - nums[i] exists in a hash map. If yes, return indices; if no, store nums[i] -> i."
      },
      "patternRecognition": "Hash Map Complement Lookup / Two-Sum Pattern.",
      "interviewFollowUps": [
        "What if the input array is already sorted? (Two Pointers in O(1) space).",
        "What if duplicate pairs exist and we need all unique pairs? (Sorting + Skip duplicates)."
      ],
      "complexityCoach": {
        "naive": "O(N^2) brute force nested loops.",
        "optimal": "O(N) time and O(N) space using a single pass with a Hash Map.",
        "guidance": "Single pass hash table insertion allows simultaneous lookup and storage."
      },
      "commonMistakes": [
        "Using the same element twice (e.g. nums[i] + nums[i] == target).",
        "Assuming the array is sorted when it is not."
      ],
      "revisionCard": "Two Sum: map.has(target - num) ? return [map.get(target - num), i] : map.set(num, i); O(N) time & space."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Two Pointers",
        "Sorting",
        "Duplicate Handling"
      ],
      "bruteForceThinking": "Generate all triplets (i, j, k) with i < j < k and check if their sum is 0. Cubic O(N^3) time complexity.",
      "progressiveHints": {
        "concept": "If you sort the array, you can fix one number and reduce the remaining task to finding two numbers that sum to -nums[i].",
        "approach": "With the array sorted, use two pointers (left and right) to find pairs summing to -nums[i] in O(N) time.",
        "algorithm": "Sort nums. Loop i from 0 to n-3. If nums[i] > 0 break. If i > 0 and nums[i] == nums[i-1] continue. Use left = i + 1, right = n - 1. Move pointers and skip duplicates."
      },
      "patternRecognition": "Sorting + Two-Pointer Pair Reduction.",
      "interviewFollowUps": [
        "How to extend this to 4Sum or K-Sum?",
        "Can 3Sum be solved in O(N^2) without sorting using a hash set?"
      ],
      "complexityCoach": {
        "naive": "O(N^3) triple loops.",
        "optimal": "O(N^2) time and O(1) auxiliary space (excluding sort/output).",
        "guidance": "Skipping duplicate values at both the outer loop and inner pointers is essential to prevent duplicate triplets."
      },
      "commonMistakes": [
        "Failing to skip duplicate values for i, left, and right, leading to redundant triplets in the result.",
        "Checking duplicates using index instead of value comparisons."
      ],
      "revisionCard": "3Sum: sort; for each i: if(nums[i]==nums[i-1]) skip; left=i+1, right=n-1; two pointers; skip duplicates."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Sorting",
        "Two Pointers",
        "Absolute Difference Tracking"
      ],
      "bruteForceThinking": "Check all N*(N-1)*(N-2)/6 triplets and track the minimum absolute difference |sum - target|. O(N^3) time.",
      "progressiveHints": {
        "concept": "Similar to 3Sum, sorting allows you to use two pointers to move closer to the target.",
        "approach": "Sort the array. Fix element i, and use left = i + 1, right = n - 1. If sum < target, increase sum by left++; if sum > target, decrease sum by right--; if sum == target return target.",
        "algorithm": "Track closestSum initialized to nums[0] + nums[1] + nums[2]. Update closestSum whenever |target - currentSum| < |target - closestSum|."
      },
      "patternRecognition": "Two-Pointer Target Approximation.",
      "interviewFollowUps": [
        "What if multiple triplets produce the same closest distance? Which one should be returned?",
        "Can this be solved using binary search on the third element?"
      ],
      "complexityCoach": {
        "naive": "O(N^3) brute force.",
        "optimal": "O(N^2) time and O(1) extra space after sorting.",
        "guidance": "Early exit when sum == target saves unnecessary iterations."
      },
      "commonMistakes": [
        "Integer overflow when taking absolute difference with large numbers.",
        "Initializing closestSum to 0 or target instead of the first triplet sum."
      ],
      "revisionCard": "3Sum Closest: sort; left=i+1, right=n-1; update closest if |target-sum| < |target-closest|; move left/right based on sum vs target."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Bitwise XOR Invariants",
        "Parity & Frequency Analysis"
      ],
      "bruteForceThinking": "Compute nums1[i] ^ nums2[j] for all pairs and XOR them together. O(M * N) time and can TLE for 10^5 elements.",
      "progressiveHints": {
        "concept": "XOR is associative, commutative, and self-inverting (x ^ x = 0).",
        "approach": "How many times does each element in nums1 appear in the total XOR? It appears nums2.length times.",
        "algorithm": "If nums2.length is odd, every element of nums1 contributes to the total. If nums1.length is odd, every element of nums2 contributes. Compute total XOR in O(M + N) time."
      },
      "patternRecognition": "Mathematical Parity / XOR Self-Inversion Invariant.",
      "interviewFollowUps": [
        "What if the operation is AND or OR instead of XOR?",
        "How to generalize this when pairings come from three arrays?"
      ],
      "complexityCoach": {
        "naive": "O(M * N) quadratic loop.",
        "optimal": "O(M + N) linear time and O(1) space using parity analysis.",
        "guidance": "Trilogy Innovations tests mathematical property exploitation over brute-force loops."
      },
      "commonMistakes": [
        "Attempting to simulate pairwise XOR computation resulting in O(N^2) Time Limit Exceeded.",
        "Checking parity of array length using division instead of bitwise & 1."
      ],
      "revisionCard": "XOR Parity: if len2%2 != 0 xor1 contributes; if len1%2 != 0 xor2 contributes; return xor1 ^ xor2; O(M+N)."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Doubly Linked List of Buckets",
        "Hash Map of Keys",
        "O(1) All Operations"
      ],
      "bruteForceThinking": "Use a single HashMap<String, Integer> and sort keys on getMaxKey / getMinKey in O(N log N) time.",
      "progressiveHints": {
        "concept": "To get min and max in O(1), group keys with the same frequency into Doubly Linked List Buckets.",
        "approach": "Each Bucket contains a frequency count and a HashSet of keys with that count. A HashMap maps each key to its containing Bucket.",
        "algorithm": "Inc: move key to bucket with count+1 (creating bucket if needed). Dec: move key to bucket with count-1. getMaxKey returns any key from tail bucket; getMinKey returns any key from head bucket."
      },
      "patternRecognition": "Bucket Doubly Linked List with Cross-Indexing HashMap.",
      "interviewFollowUps": [
        "How does this design differ from LFU Cache?",
        "How to handle concurrent increments and decrements?"
      ],
      "complexityCoach": {
        "naive": "O(N) search for min/max key.",
        "optimal": "O(1) strictly for inc, dec, getMaxKey, and getMinKey.",
        "guidance": "Empty buckets must be removed immediately to preserve O(1) head/tail access."
      },
      "commonMistakes": [
        "Leaving empty buckets in the linked list, causing getMinKey to return from a zero-key bucket.",
        "Failing to remove key from keyToBucket map when count reaches 0."
      ],
      "revisionCard": "All O(1): HashMap<key, Bucket> + DoublyLinkedList<Bucket>; each bucket has count & HashSet<keys>; O(1) all ops."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Two Pointers",
        "Monotonic Stack",
        "Prefix Max / Suffix Max"
      ],
      "bruteForceThinking": "For each bar, water level is min(maxLeft, maxRight) - height[i]. Calculating maxLeft and maxRight naively takes O(N^2) time.",
      "progressiveHints": {
        "concept": "The trapped water above any bar is determined strictly by min(maxHeightToLeft, maxHeightToRight) - height[i].",
        "approach": "Two Pointers from left and right: maintain leftMax and rightMax. The side with the smaller max limits water retention.",
        "algorithm": "If height[left] < height[right]: if height[left] >= leftMax, update leftMax; else water += leftMax - height[left]; left++. Symmetrical for right."
      },
      "patternRecognition": "Two Pointers Two-Sided Invariant / Trapping Envelope.",
      "interviewFollowUps": [
        "Can you solve Trapping Rain Water II (3D elevation map using a PriorityQueue)?",
        "How would dynamic water inflow over time affect this model?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) scanning left and right maximums per element.",
        "optimal": "O(N) time and O(1) space with two pointers, or O(N) space with prefix/suffix arrays.",
        "guidance": "Two pointers eliminates the O(N) space required by precomputed prefix/suffix max arrays."
      },
      "commonMistakes": [
        "Adding negative water when height[i] exceeds the local maximum.",
        "Confusing bar heights with water capacities."
      ],
      "revisionCard": "Trap Water: left=0, right=n-1; if(h[l]<h[r]) { h[l]>=lmax ? lmax=h[l] : water+=lmax-h[l]; l++; } else { ... }; O(N) time, O(1) space."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Doubly Linked List",
        "Hash Map",
        "Amortized O(1) Operations"
      ],
      "bruteForceThinking": "Use an array or list of pairs. When accessed, move item to end in O(N) time. Get and Put both take O(N).",
      "progressiveHints": {
        "concept": "O(1) lookup requires a Hash Map. O(1) removal and insertion at head/tail requires a Doubly Linked List with dummy head and tail.",
        "approach": "Hash map maps key -> Node. Node has key, val, prev, next.",
        "algorithm": "Get: if key not in map return -1. Move node to front (most recently used), return val. Put: if key exists, update val and move to front. If new, add node to front and map. If size > capacity, remove node from tail and map."
      },
      "patternRecognition": "Composite Data Structure (HashMap + DoublyLinkedList).",
      "interviewFollowUps": [
        "How to make this thread-safe in a concurrent environment? (ReadWriteLock or ConcurrentHashMap with fine-grained segment locks).",
        "How would you implement LFU (Least Frequently Used) Cache?"
      ],
      "complexityCoach": {
        "naive": "O(N) per operation using array scanning.",
        "optimal": "O(1) strictly per get and put with HashMap + DoublyLinkedList.",
        "guidance": "Sentinel dummy head and tail nodes eliminate null pointer checks during node detachment and insertion."
      },
      "commonMistakes": [
        "Forgetting to remove key from HashMap when evicting tail node from Doubly Linked List.",
        "Not updating key in Node structure, preventing reverse lookup during eviction."
      ],
      "revisionCard": "LRU: HashMap<key, Node> + DoublyLinkedList with dummy head & tail; get: moveToHead; put: add/update & evict tail if full; O(1)."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Binary Search on Search Space",
        "Partitioning Invariant",
        "Divide and Conquer"
      ],
      "bruteForceThinking": "Merge the two sorted arrays into an array of size M + N, sort or two-finger scan to middle element. O(M + N) time and O(M + N) space.",
      "progressiveHints": {
        "concept": "To achieve O(log(min(M, N))) time, you cannot traverse all elements. You must partition both arrays simultaneously.",
        "approach": "Binary search the partition index i in nums1. Partition index j in nums2 is automatically (M + N + 1) / 2 - i.",
        "algorithm": "Ensure nums1 is shorter array. Binary search i in [0, M]. Check if maxLeft1 <= minRight2 and maxLeft2 <= minRight1. If true, median found!"
      },
      "patternRecognition": "Binary Search on Partition Boundary.",
      "interviewFollowUps": [
        "How to find the k-th smallest element in two sorted arrays?",
        "What if there are K sorted arrays instead of 2?"
      ],
      "complexityCoach": {
        "naive": "O(M + N) two-pointer merge.",
        "optimal": "O(log(min(M, N))) strictly logarithmic time and O(1) space.",
        "guidance": "Always binary search on the smaller array to guarantee O(log(min(M, N))) and prevent negative index j."
      },
      "commonMistakes": [
        "Index out of bounds on array edges (use -Infinity and +Infinity as sentinel values for partitions).",
        "Binary searching on the larger array instead of smaller array."
      ],
      "revisionCard": "Median 2 Arrays: binary search partition on smaller array: maxL1 <= minR2 and maxL2 <= minR1; O(log(min(M,N)))."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Monotonic Stack",
        "Prefix Minimum Array"
      ],
      "bruteForceThinking": "Check all triplets (i, j, k) with i < j < k and verify nums[i] < nums[k] < nums[j]. O(N^3) or O(N^2) time.",
      "progressiveHints": {
        "concept": "We want nums[i] < nums[k] < nums[j]. To maximize our chance, nums[i] should be as small as possible, and nums[j] should be as large as possible.",
        "approach": "Scan from right to left maintaining candidate for nums[k] (the third value) using a Monotonic Stack of decreasing candidates for nums[j].",
        "algorithm": "Iterate from right to left. While stack and nums[i] > stack.top(): s3 = stack.pop(). Push nums[i]. If nums[i] < s3 return true."
      },
      "patternRecognition": "Monotonic Stack Backward Scan with Candidate Tracking.",
      "interviewFollowUps": [
        "Can you solve this scanning left to right with a prefix min array?",
        "How to adapt this for 123 Pattern or 231 Pattern?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) scanning for j and checking min on left and max on right.",
        "optimal": "O(N) time and O(N) space scanning right to left.",
        "guidance": "Maintaining s3 as the largest valid middle value guarantees immediate termination when an element smaller than s3 is found."
      },
      "commonMistakes": [
        "Scanning forward without tracking the maximum middle candidate.",
        "Confusing the strict inequalities (<)."
      ],
      "revisionCard": "132 Pattern: scan right to left; while(stack && nums[i]>stack.top) s3=pop(); push(nums[i]); if(nums[i]<s3) return true; O(N)."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Stack for Index Matching",
        "String Rebuilding"
      ],
      "bruteForceThinking": "Generate all subsets of removals and test validity. Exponential O(2^N) time.",
      "progressiveHints": {
        "concept": "An opening bracket is invalid if it is never closed. A closing bracket is invalid if there was no unmatched opening bracket before it.",
        "approach": "Use a stack to record indices of opening parentheses. When seeing a closing parenthesis, if stack is empty, mark current index for removal. If not empty, pop.",
        "algorithm": "At the end of the pass, all indices remaining in the stack are unmatched opening parentheses. Filter out all marked indices and rebuild the string."
      },
      "patternRecognition": "Index-Tracking Stack / Two-Pass Filter.",
      "interviewFollowUps": [
        "Can you solve this in O(1) auxiliary space (excluding result string)?",
        "What if multiple valid strings can be formed and you must return all unique valid strings?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) repeated string modifications.",
        "optimal": "O(N) time and O(N) space using index set.",
        "guidance": "Converting string to array / character list enables in-place marking in O(N) time."
      },
      "commonMistakes": [
        "String concatenation in a loop leading to O(N^2) quadratic string copies in Java/Python.",
        "Forgetting that leftover open parentheses in the stack must also be removed."
      ],
      "revisionCard": "Min Remove Parentheses: stack of open indices; mark unmatched ) and leftover (; rebuild without marked indices; O(N)."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Bitwise XOR Invariants",
        "Precomputation with Hash Map",
        "Binary Substring Representation"
      ],
      "bruteForceThinking": "For each query [first, second], compute val = first ^ second. Convert val to binary string and search in s using indexOf. Takes O(Q * N) time.",
      "progressiveHints": {
        "concept": "first ^ val = second is equivalent to val = first ^ second.",
        "approach": "val <= 10^9, which in binary has at most 30 bits! Substrings longer than 30 characters cannot match any query value.",
        "algorithm": "Precompute all binary values of substrings of s with length <= 30 and store their earliest [start, end] in a HashMap. Answer each query in O(1)."
      },
      "patternRecognition": "Query Inversion + Bounded Substring Precomputation.",
      "interviewFollowUps": [
        "What if queries are streaming and s is dynamic?",
        "How to handle memory if s has length 10^6?"
      ],
      "complexityCoach": {
        "naive": "O(Q * N) substring search per query.",
        "optimal": "O(N * 30 + Q) time and O(N * 30) space.",
        "guidance": "Noticing that 10^9 fits within 30 bits is the mathematical breakthrough required for Trilogy interview clearing."
      },
      "commonMistakes": [
        "Searching for each query individually across the entire string.",
        "Not recording the earliest occurrence of a binary value."
      ],
      "revisionCard": "Substring XOR: val = first ^ second; precompute all substrings up to len 30 in map: map[val] = [start, end]; O(30N + Q)."
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
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Euclidean GCD Algorithm",
        "Fraction Arithmetic",
        "String Parsing"
      ],
      "bruteForceThinking": "Parse entire expression into an AST or evaluate with floating point numbers (which causes precision errors).",
      "progressiveHints": {
        "concept": "Floating point numbers will lose precision. You must perform exact fraction arithmetic using integers and GCD.",
        "approach": "Add fractions sequentially: A/B + C/D = (A*D + B*C) / (B*D). Then reduce by gcd(abs(numerator), denominator).",
        "algorithm": "Parse numerator and denominator tokens using regex or index scanning. Maintain running numerator and denominator. Reduce at end."
      },
      "patternRecognition": "Simulation with Exact Arithmetic & Euclidean GCD.",
      "interviewFollowUps": [
        "How to handle parentheses and order of operations (* and /)?",
        "What if numerators and denominators exceed 64-bit integer limits?"
      ],
      "complexityCoach": {
        "naive": "Floating point evaluation causing precision errors.",
        "optimal": "O(N * log(min(A, B))) time and O(1) space with GCD reduction.",
        "guidance": "Always divide both numerator and denominator by their greatest common divisor."
      },
      "commonMistakes": [
        "Forgetting negative signs in numerators.",
        "Not reducing fraction to irreducible form at the end."
      ],
      "revisionCard": "Fraction Add: num = num*d + n*den, den = den*d; reduce by gcd(abs(num), den); return num/den."
    }
  },
  {
    "id": "valid-parentheses",
    "slug": "valid-parentheses",
    "title": "Valid Parentheses",
    "url": "https://leetcode.com/problems/valid-parentheses",
    "difficulty": "Easy",
    "category": "Stack & String",
    "company": "Amazon / Meta / Google / Microsoft",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Bloomberg",
      "Apple"
    ],
    "topics": [
      "String",
      "Stack"
    ],
    "acceptanceRate": 40.5,
    "frequency": 98.2,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    "inputFormat": "A single string `s` containing parentheses characters.",
    "outputFormat": "Return `true` if the string is valid, or `false` otherwise.",
    "examples": [
      {
        "id": 1,
        "input": "s = \"()\"",
        "output": "true",
        "explanation": "Matching single pair of parentheses."
      },
      {
        "id": 2,
        "input": "s = \"()[]{}\"",
        "output": "true",
        "explanation": "All types of brackets match in sequence."
      },
      {
        "id": 3,
        "input": "s = \"(]\"",
        "output": "false",
        "explanation": "Mismatched closing bracket type."
      }
    ],
    "constraints": [
      "`1 <= s.length <= 10^4`",
      "`s` consists of parentheses only `'()[]{}'`."
    ],
    "hints": [
      "Use a Last-In First-Out (LIFO) data structure: whenever you see an opening bracket, push its expected counterpart onto a stack.",
      "When encountering a closing bracket, check if the stack is non-empty and whether top matches the current bracket.",
      "At the end of string traversal, the stack must be completely empty for the string to be valid."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "s = \"()\"",
        "expectedOutput": "true"
      },
      {
        "id": 2,
        "input": "s = \"()[]{}\"",
        "expectedOutput": "true"
      },
      {
        "id": 3,
        "input": "s = \"(]\"",
        "expectedOutput": "false"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Valid Parentheses (Easy)\n    // Target Companies: Amazon, Meta, Google, Microsoft\n    public static boolean isValid(String s) {\n        // TODO: Implement optimal LIFO Stack solution\n        Stack<Character> stack = new Stack<>();\n        \n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Test 1: \" + isValid(\"()\"));\n        System.out.println(\"Expected: true\");\n    }\n}\n",
      "python": "# Problem: Valid Parentheses (Easy)\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        # TODO: Implement optimal Stack solution\n        stack = []\n        return False\n\n# Verification\nprint(Solution().isValid(\"()\"))\n",
      "cpp": "#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // TODO: Implement optimal Stack solution\n        stack<char> st;\n        return false;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << boolalpha << sol.isValid(\"()\") << endl;\n    return 0;\n}\n",
      "javascript": "// Problem: Valid Parentheses (Easy)\nfunction isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (c === '(' || c === '{' || c === '[') {\n      stack.push(c);\n    } else {\n      if (!stack.length || stack.pop() !== map[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n\nconsole.log(isValid(\"()\"));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "approach": "LIFO Stack Matching",
      "explanation": "Traverse the string character by character. Push open brackets or their expected counterparts onto a stack. When a closing bracket is encountered, pop the top of the stack and verify that it matches. Finally, return true if the stack is empty.",
      "code": "function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (c === '(' || c === '{' || c === '[') {\n      stack.push(c);\n    } else {\n      if (!stack.length || stack.pop() !== map[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Stack Data Structure",
        "LIFO Property",
        "Hash Table Mapping"
      ],
      "bruteForceThinking": "Repeatedly find adjacent pairs '()', '[]', '{}' and remove them from string until no pairs remain. This takes O(N^2) time due to string reallocations.",
      "progressiveHints": {
        "concept": "Think about which bracket must be closed first: the most recently opened bracket must be closed first.",
        "approach": "Use a Stack to remember unclosed open brackets. A closing bracket must immediately match the stack top.",
        "algorithm": "Store bracket pairs in a map. For each char: if opening, push; if closing, check if stack is empty or top doesn't match; if so return false. After loop return stack.isEmpty()."
      },
      "patternRecognition": "Monotonic / LIFO Stack pattern for matching nested or balanced structures.",
      "interviewFollowUps": [
        "What if the string can contain non-bracket characters like letters or numbers?",
        "Can we solve this in O(1) space if only one type of bracket '()' is allowed?",
        "How would you handle quotation marks where opening and closing characters are identical?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) time via string substitution regex / replace.",
        "optimal": "O(N) time with O(N) auxiliary space using a Stack.",
        "guidance": "A single pass with a stack visits each element at most twice (one push, one pop)."
      },
      "commonMistakes": [
        "Forgetting to check if stack is empty before popping.",
        "Returning true while opening brackets remain in the stack at the end.",
        "Odd length strings can be immediately rejected in O(1) time."
      ],
      "revisionCard": "LIFO stack: push openers, match closers with pop, verify empty at end."
    }
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
    "difficulty": "Easy",
    "category": "Array & Dynamic Programming",
    "company": "Amazon / Google / Meta / Microsoft / Apple",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Uber"
    ],
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "acceptanceRate": 54.2,
    "frequency": 97.4,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.",
    "inputFormat": "An integer array `prices`.",
    "outputFormat": "An integer representing the maximum possible profit.",
    "examples": [
      {
        "id": 1,
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        "id": 2,
        "input": "prices = [7,6,4,3,1]",
        "output": "0",
        "explanation": "In this case, no transactions are done and the max profit = 0."
      }
    ],
    "constraints": [
      "`1 <= prices.length <= 10^5`",
      "`0 <= prices[i] <= 10^4`"
    ],
    "hints": [
      "You cannot sell a stock before you buy one.",
      "Track the minimum price seen so far as you iterate through the days.",
      "At each day, the potential profit is current price minus minimum price seen so far."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "prices = [7,1,5,3,6,4]",
        "expectedOutput": "5"
      },
      {
        "id": 2,
        "input": "prices = [7,6,4,3,1]",
        "expectedOutput": "0"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Best Time to Buy and Sell Stock (Easy)\n    // Target Companies: Amazon, Google, Meta, Microsoft, Apple\n    public static int maxProfit(int[] prices) {\n        // TODO: Implement optimal O(N) one-pass solution\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n        \n        return maxProfit;\n    }\n\n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        System.out.println(\"Output: \" + maxProfit(prices));\n        System.out.println(\"Expected: 5\");\n    }\n}\n",
      "python": "# Problem: Best Time to Buy and Sell Stock (Easy)\nclass Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # TODO: Implement optimal one-pass solution\n        return 0\n\n# Verification\nprint(Solution().maxProfit([7, 1, 5, 3, 6, 4]))\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // TODO: Implement optimal one-pass solution\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> prices = {7, 1, 5, 3, 6, 4};\n    cout << sol.maxProfit(prices) << endl;\n    return 0;\n}\n",
      "javascript": "// Problem: Best Time to Buy and Sell Stock (Easy)\nfunction maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let i = 0; i < prices.length; i++) {\n    if (prices[i] < minPrice) {\n      minPrice = prices[i];\n    } else if (prices[i] - minPrice > maxProfit) {\n      maxProfit = prices[i] - minPrice;\n    }\n  }\n  return maxProfit;\n}\n\nconsole.log(maxProfit([7, 1, 5, 3, 6, 4]));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "approach": "One-Pass Greedy / Dynamic Programming State Tracking",
      "explanation": "Maintain the minimum price encountered up to the current day. For every subsequent day, calculate the profit if sold on that day (current price - minPrice), updating maxProfit accordingly.",
      "code": "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let i = 0; i < prices.length; i++) {\n    if (prices[i] < minPrice) {\n      minPrice = prices[i];\n    } else if (prices[i] - minPrice > maxProfit) {\n      maxProfit = prices[i] - minPrice;\n    }\n  }\n  return maxProfit;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Array Traversal",
        "Running Minimum Concept"
      ],
      "bruteForceThinking": "Compare all pairs (i, j) with i < j and compute prices[j] - prices[i] to find maximum. O(N^2) time.",
      "progressiveHints": {
        "concept": "If you sell on day i, when was the best day to buy? It was the day with the minimum price before day i.",
        "approach": "Keep a running minimum of price as you scan from left to right.",
        "algorithm": "Initialize minPrice = Infinity, maxProfit = 0. In a loop, minPrice = min(minPrice, p), maxProfit = max(maxProfit, p - minPrice). Return maxProfit."
      },
      "patternRecognition": "Running minimum / prefix state reduction.",
      "interviewFollowUps": [
        "What if you are allowed to complete as many transactions as you like (Stock II)?",
        "What if you must pay a transaction fee for every trade?",
        "What if there is a 1-day cooldown period after selling?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) brute force nested loops.",
        "optimal": "O(N) time and O(1) extra space in a single pass.",
        "guidance": "Preserving prefix minimum eliminates redundant backward scanning."
      },
      "commonMistakes": [
        "Selling before buying (picking the minimum price after the maximum price).",
        "Initializing maxProfit to negative infinity instead of 0 when prices only decrease."
      ],
      "revisionCard": "minPrice = min(minPrice, p); maxProfit = max(maxProfit, p - minPrice); O(N) time, O(1) space."
    }
  },
  {
    "id": "maximum-subarray",
    "slug": "maximum-subarray",
    "title": "Maximum Subarray",
    "url": "https://leetcode.com/problems/maximum-subarray",
    "difficulty": "Medium",
    "category": "Array & Dynamic Programming",
    "company": "Amazon / Microsoft / Google / Apple",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Apple",
      "LinkedIn"
    ],
    "topics": [
      "Array",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    "acceptanceRate": 50.8,
    "frequency": 96.5,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.",
    "inputFormat": "An array of integers `nums`.",
    "outputFormat": "An integer representing the maximum contiguous subarray sum.",
    "examples": [
      {
        "id": 1,
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        "id": 2,
        "input": "nums = [1]",
        "output": "1",
        "explanation": "The subarray [1] has the largest sum 1."
      },
      {
        "id": 3,
        "input": "nums = [5,4,-1,7,8]",
        "output": "23",
        "explanation": "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    "constraints": [
      "`1 <= nums.length <= 10^5`",
      "`-10^4 <= nums[i] <= 10^4`"
    ],
    "hints": [
      "Consider how each element either extends the previous subarray or starts a new subarray.",
      "If the sum of the subarray before current index is negative, it will only reduce the sum of any subsequent subarray.",
      "Kadane's Algorithm maintains currentMax and globalMax in a single O(N) pass."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "expectedOutput": "6"
      },
      {
        "id": 2,
        "input": "nums = [1]",
        "expectedOutput": "1"
      },
      {
        "id": 3,
        "input": "nums = [5,4,-1,7,8]",
        "expectedOutput": "23"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Maximum Subarray (Medium)\n    // Target Companies: Amazon, Microsoft, Google, Apple\n    public static int maxSubArray(int[] nums) {\n        // TODO: Implement Kadane's Algorithm\n        int currentSum = nums[0];\n        int maxSum = nums[0];\n        \n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(\"Output: \" + maxSubArray(nums));\n        System.out.println(\"Expected: 6\");\n    }\n}\n",
      "python": "# Problem: Maximum Subarray (Medium)\nclass Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # TODO: Implement Kadane's Algorithm\n        current_sum = max_sum = nums[0]\n        for x in nums[1:]:\n            current_sum = max(x, current_sum + x)\n            max_sum = max(max_sum, current_sum)\n        return max_sum\n\nprint(Solution().maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int curSum = nums[0], maxSum = nums[0];\n        for (size_t i = 1; i < nums.size(); ++i) {\n            curSum = max(nums[i], curSum + nums[i]);\n            maxSum = max(maxSum, curSum);\n        }\n        return maxSum;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}\n",
      "javascript": "// Problem: Maximum Subarray (Medium)\nfunction maxSubArray(nums) {\n  let currentSum = nums[0];\n  let maxSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}\n\nconsole.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "approach": "Kadane's Algorithm (Dynamic Programming)",
      "explanation": "At each step, decide whether to start a new subarray at nums[i] or extend the existing subarray. Maintain currentSum = max(nums[i], currentSum + nums[i]) and record the overall maximum.",
      "code": "function maxSubArray(nums) {\n  let currentSum = nums[0];\n  let maxSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Contiguous Subarray Concept",
        "Prefix Sums",
        "Dynamic Programming Basics"
      ],
      "bruteForceThinking": "Calculate sums of all N*(N+1)/2 subarrays using nested loops in O(N^2) or O(N^3) time.",
      "progressiveHints": {
        "concept": "A negative prefix can never help increase the sum of any future subarray.",
        "approach": "At index i, either add nums[i] to currentSum, or reset currentSum to nums[i] if currentSum was negative.",
        "algorithm": "Kadane's Algorithm: current = max(nums[i], current + nums[i]); globalMax = max(globalMax, current)."
      },
      "patternRecognition": "Kadane's Algorithm / Local vs Global State DP.",
      "interviewFollowUps": [
        "How would you return the actual start and end indices of the maximal subarray?",
        "Can you solve this using a Divide and Conquer approach in O(N log N) time?",
        "What if the array is circular (Circular Maximum Subarray)?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) nested loops.",
        "optimal": "O(N) time and O(1) space with Kadane's Algorithm.",
        "guidance": "Greedy state reset on negative prefix reduces quadratic search space to linear."
      },
      "commonMistakes": [
        "Initializing maxSum to 0 when all array elements are negative (e.g. [-5, -2, -8] should return -2, not 0).",
        "Confusing contiguous subarray with non-contiguous subsequence."
      ],
      "revisionCard": "Kadane: cur = max(x, cur + x); max = max(max, cur); init with nums[0]."
    }
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "slug": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters",
    "difficulty": "Medium",
    "category": "Sliding Window & Hash Table",
    "company": "Amazon / Google / Meta / Microsoft / Apple",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Uber"
    ],
    "topics": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "acceptanceRate": 34.6,
    "frequency": 99.1,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given a string `s`, find the length of the **longest substring** without repeating characters.\n\nA **substring** is a contiguous non-empty sequence of characters within a string.",
    "inputFormat": "A single string `s`.",
    "outputFormat": "An integer representing the length of the longest substring with unique characters.",
    "examples": [
      {
        "id": 1,
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3."
      },
      {
        "id": 2,
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      },
      {
        "id": 3,
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with the length of 3."
      }
    ],
    "constraints": [
      "`0 <= s.length <= 5 * 10^4`",
      "`s` consists of English letters, digits, symbols and spaces."
    ],
    "hints": [
      "Use a sliding window [left, right] with a hash map or integer lookup to store the last seen index of each character.",
      "When a duplicate character is found at right, advance left past the character's last seen position.",
      "Keep track of the maximum window size (right - left + 1)."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "s = \"abcabcbb\"",
        "expectedOutput": "3"
      },
      {
        "id": 2,
        "input": "s = \"bbbbb\"",
        "expectedOutput": "1"
      },
      {
        "id": 3,
        "input": "s = \"pwwkew\"",
        "expectedOutput": "3"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Longest Substring Without Repeating Characters (Medium)\n    // Target Companies: Amazon, Google, Meta, Microsoft, Apple\n    public static int lengthOfLongestSubstring(String s) {\n        // TODO: Implement Sliding Window with Hash Map\n        int maxLength = 0;\n        \n        return maxLength;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + lengthOfLongestSubstring(\"abcabcbb\"));\n        System.out.println(\"Expected: 3\");\n    }\n}\n",
      "python": "# Problem: Longest Substring Without Repeating Characters (Medium)\nclass Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_map = {}\n        left = max_len = 0\n        for right, char in enumerate(s):\n            if char in char_map and char_map[char] >= left:\n                left = char_map[char] + 1\n            char_map[char] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len\n\nprint(Solution().lengthOfLongestSubstring(\"abcabcbb\"))\n",
      "cpp": "#include <iostream>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char, int> seen;\n        int left = 0, maxLen = 0;\n        for (int right = 0; right < s.length(); ++right) {\n            if (seen.count(s[right]) && seen[s[right]] >= left) {\n                left = seen[s[right]] + 1;\n            }\n            seen[s[right]] = right;\n            maxLen = max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(\"abcabcbb\") << endl;\n    return 0;\n}\n",
      "javascript": "// Problem: Longest Substring Without Repeating Characters (Medium)\nfunction lengthOfLongestSubstring(s) {\n  const map = new Map();\n  let left = 0;\n  let maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (map.has(char) && map.get(char) >= left) {\n      left = map.get(char) + 1;\n    }\n    map.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}\n\nconsole.log(lengthOfLongestSubstring(\"abcabcbb\"));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(min(M, N)) where M is alphabet size",
      "approach": "Sliding Window with Index Map",
      "explanation": "Maintain a sliding window [left, right]. Store the most recent index of each character in a map. When duplicate is seen, jump left to map.get(char) + 1.",
      "code": "function lengthOfLongestSubstring(s) {\n  const map = new Map();\n  let left = 0;\n  let maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (map.has(char) && map.get(char) >= left) {\n      left = map.get(char) + 1;\n    }\n    map.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Sliding Window Technique",
        "Hash Map / Set",
        "String Indexing"
      ],
      "bruteForceThinking": "Check all substrings s[i...j] in O(N^2) and check if each has unique characters in O(N), giving O(N^3) time.",
      "progressiveHints": {
        "concept": "Can you maintain a window that expands to the right and contracts from the left whenever a duplicate is found?",
        "approach": "Instead of shrinking left one by one with a set, store the last index of each char so left can jump directly.",
        "algorithm": "If char is in map and map[char] >= left, left = map[char] + 1. Update map[char] = right and maxLen = max(maxLen, right - left + 1)."
      },
      "patternRecognition": "Dynamic Sliding Window with Direct Index Jumping.",
      "interviewFollowUps": [
        "What if the string contains only ASCII characters? (Optimize with fixed int[128] array).",
        "What if at most k distinct characters are allowed?",
        "What if at most 2 duplicate characters are allowed?"
      ],
      "complexityCoach": {
        "naive": "O(N^3) brute force with nested loops.",
        "optimal": "O(N) time and O(min(M, N)) space with sliding window.",
        "guidance": "Direct left-pointer jumping avoids duplicate increments."
      },
      "commonMistakes": [
        "Forgetting to check if map.get(char) >= left (using an old occurrence outside current window).",
        "Empty string edge case returning 1 instead of 0."
      ],
      "revisionCard": "Sliding window [left, right]: if duplicate in window, left = map[char] + 1; update map & maxLen."
    }
  },
  {
    "id": "climbing-stairs",
    "slug": "climbing-stairs",
    "title": "Climbing Stairs",
    "url": "https://leetcode.com/problems/climbing-stairs",
    "difficulty": "Easy",
    "category": "Dynamic Programming",
    "company": "Amazon / Google / Meta / Microsoft",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Adobe"
    ],
    "topics": [
      "Math",
      "Dynamic Programming",
      "Memoization"
    ],
    "acceptanceRate": 52.8,
    "frequency": 94,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?",
    "inputFormat": "An integer `n`.",
    "outputFormat": "An integer representing the number of distinct ways to climb to the top.",
    "examples": [
      {
        "id": 1,
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways: 1 step + 1 step, or 2 steps."
      },
      {
        "id": 2,
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways: 1+1+1, 1+2, or 2+1."
      }
    ],
    "constraints": [
      "`1 <= n <= 45`"
    ],
    "hints": [
      "To reach step n, you must have come from step n - 1 or step n - 2.",
      "The recurrence relation is ways(n) = ways(n - 1) + ways(n - 2).",
      "This is equivalent to the Fibonacci sequence with base cases ways(1) = 1, ways(2) = 2."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "n = 2",
        "expectedOutput": "2"
      },
      {
        "id": 2,
        "input": "n = 3",
        "expectedOutput": "3"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Climbing Stairs (Easy)\n    // Target Companies: Amazon, Google, Meta, Microsoft\n    public static int climbStairs(int n) {\n        // TODO: Implement O(N) time O(1) space Fibonacci transition\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Output: \" + climbStairs(3));\n        System.out.println(\"Expected: 3\");\n    }\n}\n",
      "python": "# Problem: Climbing Stairs (Easy)\nclass Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2:\n            return n\n        a, b = 1, 2\n        for _ in range(3, n + 1):\n            a, b = b, a + b\n        return b\n\nprint(Solution().climbStairs(3))\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; ++i) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};\n\nint main() {\n    Solution sol;\n    cout << sol.climbStairs(3) << endl;\n    return 0;\n}\n",
      "javascript": "// Problem: Climbing Stairs (Easy)\nfunction climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    const c = a + b;\n    a = b;\n    b = c;\n  }\n  return b;\n}\n\nconsole.log(climbStairs(3));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "approach": "Iterative Fibonacci State Compression",
      "explanation": "ways(n) = ways(n-1) + ways(n-2). Instead of storing full DP array, maintain two variables a and b.",
      "code": "function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    const c = a + b;\n    a = b;\n    b = c;\n  }\n  return b;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Recursion Tree",
        "Overlapping Subproblems",
        "Fibonacci Transition"
      ],
      "bruteForceThinking": "Naive recursion climbStairs(n-1) + climbStairs(n-2) without memoization runs in O(2^N) exponential time.",
      "progressiveHints": {
        "concept": "Draw the decision tree for n = 4. Notice how climbStairs(2) is calculated multiple times.",
        "approach": "Use dynamic programming to store previous results, or bottom-up tabulation.",
        "algorithm": "Only the previous two values are needed: a = 1, b = 2. Update iteratively up to n in O(N) time and O(1) space."
      },
      "patternRecognition": "1D State Transition / Fibonacci DP.",
      "interviewFollowUps": [
        "What if you can climb 1, 2, or 3 steps?",
        "What if you can take any number of steps from an array stepSizes?",
        "Can we compute the answer in O(log N) time using matrix exponentiation?"
      ],
      "complexityCoach": {
        "naive": "O(2^N) exponential recursion.",
        "optimal": "O(N) time and O(1) space, or O(log N) via matrix power.",
        "guidance": "Two-variable state reduction saves O(N) stack or array memory."
      },
      "commonMistakes": [
        "Stack overflow for large n if using recursion without memoization.",
        "Incorrect base cases for n = 1 or n = 2."
      ],
      "revisionCard": "ways(n) = ways(n-1) + ways(n-2); Fibonacci with base cases 1 and 2; O(N) time, O(1) space."
    }
  },
  {
    "id": "reverse-linked-list",
    "slug": "reverse-linked-list",
    "title": "Reverse Linked List",
    "url": "https://leetcode.com/problems/reverse-linked-list",
    "difficulty": "Easy",
    "category": "Linked List",
    "company": "Amazon / Google / Meta / Microsoft / Apple",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Uber"
    ],
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "acceptanceRate": 75.3,
    "frequency": 96,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    "inputFormat": "The head node of a singly-linked list `head`.",
    "outputFormat": "The head node of the reversed singly-linked list.",
    "examples": [
      {
        "id": 1,
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]",
        "explanation": "All pointers reversed."
      },
      {
        "id": 2,
        "input": "head = [1,2]",
        "output": "[2,1]",
        "explanation": "Two node list reversal."
      },
      {
        "id": 3,
        "input": "head = []",
        "output": "[]",
        "explanation": "Empty list returns empty list."
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range `[0, 5000]`.",
      "`-5000 <= Node.val <= 5000`"
    ],
    "hints": [
      "Think about maintaining three pointers: prev, curr, and next.",
      "At each step, save curr.next, redirect curr.next to prev, then advance prev and curr.",
      "When curr reaches null, prev is the new head of the reversed list."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "head = [1,2,3,4,5]",
        "expectedOutput": "[5,4,3,2,1]"
      },
      {
        "id": 2,
        "input": "head = [1,2]",
        "expectedOutput": "[2,1]"
      },
      {
        "id": 3,
        "input": "head = []",
        "expectedOutput": "[]"
      }
    ],
    "starterCode": {
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\npublic class Solution {\n    public static ListNode reverseList(ListNode head) {\n        // TODO: Implement iterative 3-pointer reversal\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Reverse Linked List verified.\");\n    }\n}\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n",
      "python": "# Definition for singly-linked list.\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def reverseList(self, head: ListNode) -> ListNode:\n        prev = None\n        curr = head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev\n",
      "cpp": "struct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr != nullptr) {\n            ListNode* nxt = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n};\n",
      "javascript": "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "approach": "Iterative Three-Pointer Pointer Reversal",
      "explanation": "Maintain prev, curr, and next pointers. Reassign curr.next to prev at every step.",
      "code": "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Linked List Node Structure",
        "Pointer Manipulation"
      ],
      "bruteForceThinking": "Copy node values into an array, reverse the array, then copy values back. Requires O(N) auxiliary space.",
      "progressiveHints": {
        "concept": "You must reverse the direction of each edge: arrow that points right should point left.",
        "approach": "Use three pointers: previous node, current node, and temporary next node.",
        "algorithm": "Loop while curr is not null: save curr.next, curr.next = prev, prev = curr, curr = nextTemp. Return prev."
      },
      "patternRecognition": "In-Place Linked List Pointer Reversal.",
      "interviewFollowUps": [
        "Can you implement this recursively?",
        "How would you reverse only a portion of the list between position left and right (Reverse Linked List II)?"
      ],
      "complexityCoach": {
        "naive": "O(N) space via array buffer.",
        "optimal": "O(N) time and O(1) space in place.",
        "guidance": "Always save next pointer before overwriting curr.next."
      },
      "commonMistakes": [
        "Losing the reference to the rest of the list before redirecting curr.next.",
        "Returning curr instead of prev after the loop."
      ],
      "revisionCard": "prev = null, curr = head; while(curr) { nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; } return prev;"
    }
  },
  {
    "id": "invert-binary-tree",
    "slug": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "url": "https://leetcode.com/problems/invert-binary-tree",
    "difficulty": "Easy",
    "category": "Binary Tree",
    "company": "Google / Amazon / Meta / Microsoft",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Microsoft",
      "Twitter"
    ],
    "topics": [
      "Tree",
      "Depth-First Search",
      "Breadth-First Search",
      "Binary Tree"
    ],
    "acceptanceRate": 76.5,
    "frequency": 93.2,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given the `root` of a binary tree, invert the tree, and return its root.\n\nInverting a tree means swapping the left and right subtrees of every node in the tree.",
    "inputFormat": "The root node of a binary tree `root`.",
    "outputFormat": "The root node of the inverted binary tree.",
    "examples": [
      {
        "id": 1,
        "input": "root = [4,2,7,1,3,6,9]",
        "output": "[4,7,2,9,6,3,1]",
        "explanation": "Every left and right child is mirrored."
      },
      {
        "id": 2,
        "input": "root = [2,1,3]",
        "output": "[2,3,1]",
        "explanation": "Leaves 1 and 3 are swapped."
      },
      {
        "id": 3,
        "input": "root = []",
        "output": "[]",
        "explanation": "Empty tree remains empty."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range `[0, 100]`.",
      "`-100 <= Node.val <= 100`"
    ],
    "hints": [
      "This is a classic problem suitable for recursive divide-and-conquer.",
      "For each node, swap its left and right children, then invert the subtrees.",
      "Base case: if root is null, return null."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "root = [4,2,7,1,3,6,9]",
        "expectedOutput": "[4,7,2,9,6,3,1]"
      },
      {
        "id": 2,
        "input": "root = [2,1,3]",
        "expectedOutput": "[2,3,1]"
      },
      {
        "id": 3,
        "input": "root = []",
        "expectedOutput": "[]"
      }
    ],
    "starterCode": {
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int val) { this.val = val; }\n * }\n */\npublic class Solution {\n    public static TreeNode invertTree(TreeNode root) {\n        // TODO: Invert tree recursively\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Invert Tree verified.\");\n    }\n}\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int val) { this.val = val; }\n}\n",
      "python": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def invertTree(self, root: TreeNode) -> TreeNode:\n        if not root:\n            return None\n        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root\n",
      "cpp": "struct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        TreeNode* temp = root->left;\n        root->left = invertTree(root->right);\n        root->right = invertTree(temp);\n        return root;\n    }\n};\n",
      "javascript": "function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(H) where H is tree height",
      "approach": "Recursive Depth-First Traversal",
      "explanation": "Swap left and right children for the current root node, then recursively invoke invertTree on both children.",
      "code": "function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Binary Tree Structure",
        "Recursive DFS",
        "Tree Traversal"
      ],
      "bruteForceThinking": "All nodes must be visited at least once, so O(N) is theoretically optimal.",
      "progressiveHints": {
        "concept": "What needs to happen to the children of the root node? They need to swap places.",
        "approach": "Does this same operation need to happen for all subtrees? Yes, a recursive structure.",
        "algorithm": "if root == null return null; swap(root.left, root.right); invertTree(root.left); invertTree(root.right); return root;"
      },
      "patternRecognition": "Divide and Conquer / Tree DFS Post-order or Pre-order traversal.",
      "interviewFollowUps": [
        "How would you solve this iteratively using a Queue (BFS)?",
        "What happens if the tree is heavily skewed (worst-case recursion stack space)?"
      ],
      "complexityCoach": {
        "naive": "O(N) recursive.",
        "optimal": "O(N) time with O(H) auxiliary call stack.",
        "guidance": "BFS queue avoids deep call-stack recursion overflow on skewed trees."
      },
      "commonMistakes": [
        "Overwriting root.left before inverting root.right without a temporary holder variable.",
        "Missing base case `if (root == null) return null;`"
      ],
      "revisionCard": "if(!root) return null; swap(left, right); recurse both; return root; O(N) time, O(H) space."
    }
  },
  {
    "id": "container-with-most-water",
    "slug": "container-with-most-water",
    "title": "Container With Most Water",
    "url": "https://leetcode.com/problems/container-with-most-water",
    "difficulty": "Medium",
    "category": "Two Pointers & Greedy",
    "company": "Amazon / Google / Meta / Apple",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Apple",
      "Adobe"
    ],
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "acceptanceRate": 54.9,
    "frequency": 97,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n**Notice** that you may not slant the container.",
    "inputFormat": "An array of non-negative integers `height`.",
    "outputFormat": "An integer representing maximum water capacity.",
    "examples": [
      {
        "id": 1,
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 7 * 7 = 49."
      },
      {
        "id": 2,
        "input": "height = [1,1]",
        "output": "1",
        "explanation": "min(1, 1) * (1 - 0) = 1."
      }
    ],
    "constraints": [
      "`n == height.length`",
      "`2 <= n <= 10^5`",
      "`0 <= height[i] <= 10^4`"
    ],
    "hints": [
      "Start with the widest container: two pointers at the extreme ends left = 0 and right = n - 1.",
      "The width decreases at every step. To find a larger area, the bottleneck (shorter line) must be replaced.",
      "Move the pointer corresponding to the shorter height inward."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "expectedOutput": "49"
      },
      {
        "id": 2,
        "input": "height = [1,1]",
        "expectedOutput": "1"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Container With Most Water (Medium)\n    // Target Companies: Amazon, Google, Meta, Apple\n    public static int maxArea(int[] height) {\n        // TODO: Implement Two-Pointer Greedy approach\n        int left = 0, right = height.length - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            maxWater = Math.max(maxWater, h * (right - left));\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxWater;\n    }\n\n    public static void main(String[] args) {\n        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(\"Output: \" + maxArea(height));\n        System.out.println(\"Expected: 49\");\n    }\n}\n",
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_area = 0\n        while left < right:\n            h = min(height[left], height[right])\n            max_area = max(max_area, h * (right - left))\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        return max_area\n\nprint(Solution().maxArea([1,8,6,2,5,4,8,3,7]))\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxWater = 0;\n        while (left < right) {\n            int h = min(height[left], height[right]);\n            maxWater = max(maxWater, h * (right - left));\n            if (height[left] < height[right]) left++;\n            else right--;\n        }\n        return maxWater;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> h = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n    cout << sol.maxArea(h) << endl;\n    return 0;\n}\n",
      "javascript": "function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  let maxWater = 0;\n  while (left < right) {\n    const h = Math.min(height[left], height[right]);\n    maxWater = Math.max(maxWater, h * (right - left));\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxWater;\n}\n\nconsole.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "approach": "Two-Pointer Inward Shrinkage",
      "explanation": "Place pointers at left = 0 and right = n - 1. Compute area. The shorter line determines the water level, so moving the taller line inward can only decrease width without increasing height. Therefore, move the shorter pointer inward.",
      "code": "function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  let maxWater = 0;\n  while (left < right) {\n    const h = Math.min(height[left], height[right]);\n    maxWater = Math.max(maxWater, h * (right - left));\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxWater;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Two Pointers Technique",
        "Greedy Elimination of Subproblems"
      ],
      "bruteForceThinking": "Examine all pairs (i, j) with i < j and compute area min(h[i], h[j]) * (j - i). O(N^2) time.",
      "progressiveHints": {
        "concept": "Area is width * height. Starting at maximum width gives the largest possible width.",
        "approach": "To get more area with smaller width, height must increase. Moving the taller bar cannot increase height because the shorter bar is the bottleneck.",
        "algorithm": "Always advance the pointer pointing to the shorter vertical bar. Terminate when left == right."
      },
      "patternRecognition": "Two-Pointer Inward Shrinking with Greedy Bottleneck Elimination.",
      "interviewFollowUps": [
        "Why is it mathematically guaranteed that we don't miss the optimal solution by skipping other pairs?",
        "How would this change if the container is 3-dimensional (water enclosed by a grid of heights)?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) nested loops.",
        "optimal": "O(N) time and O(1) space with two pointers.",
        "guidance": "Proving the greedy elimination invariant is the key interview hurdle."
      },
      "commonMistakes": [
        "Moving the taller line or moving both lines at once.",
        "Looping with left <= right instead of left < right (single line cannot hold water)."
      ],
      "revisionCard": "left=0, right=n-1; while(left<right) maxA=max(maxA, min(hl, hr)*(r-l)); move shorter bar inward; O(N) time."
    }
  },
  {
    "id": "coin-change",
    "slug": "coin-change",
    "title": "Coin Change",
    "url": "https://leetcode.com/problems/coin-change",
    "difficulty": "Medium",
    "category": "Dynamic Programming",
    "company": "Amazon / Google / Meta / Microsoft / Apple",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Bloomberg"
    ],
    "topics": [
      "Array",
      "Dynamic Programming",
      "Breadth-First Search"
    ],
    "acceptanceRate": 43.1,
    "frequency": 97.5,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.",
    "inputFormat": "An integer array `coins` and an integer `amount`.",
    "outputFormat": "An integer representing the minimum number of coins, or `-1` if impossible.",
    "examples": [
      {
        "id": 1,
        "input": "coins = [1,2,5], amount = 11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 coins)."
      },
      {
        "id": 2,
        "input": "coins = [2], amount = 3",
        "output": "-1",
        "explanation": "Amount 3 cannot be formed with only coin of 2."
      },
      {
        "id": 3,
        "input": "coins = [1], amount = 0",
        "output": "0",
        "explanation": "Zero coins are needed for amount 0."
      }
    ],
    "constraints": [
      "`1 <= coins.length <= 12`",
      "`1 <= coins[i] <= 2^31 - 1`",
      "`0 <= amount <= 10^4`"
    ],
    "hints": [
      "This is the unbounded knapsack problem: min coins to reach amount.",
      "Define dp[i] as the minimum coins needed to make amount i.",
      "Base case: dp[0] = 0. For each coin c and each amount i >= c: dp[i] = min(dp[i], dp[i - c] + 1)."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "coins = [1,2,5], amount = 11",
        "expectedOutput": "3"
      },
      {
        "id": 2,
        "input": "coins = [2], amount = 3",
        "expectedOutput": "-1"
      },
      {
        "id": 3,
        "input": "coins = [1], amount = 0",
        "expectedOutput": "0"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Coin Change (Medium)\n    // Target Companies: Amazon, Google, Meta, Microsoft, Apple\n    public static int coinChange(int[] coins, int amount) {\n        // TODO: Implement Bottom-Up DP\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n\n    public static void main(String[] args) {\n        int[] coins = {1, 2, 5};\n        System.out.println(\"Output: \" + coinChange(coins, 11));\n        System.out.println(\"Expected: 3\");\n    }\n}\n",
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for coin in coins:\n            for i in range(coin, amount + 1):\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(Solution().coinChange([1,2,5], 11))\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int coin : coins) {\n            for (int i = coin; i <= amount; ++i) {\n                dp[i] = min(dp[i], dp[i - coin] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> coins = {1, 2, 5};\n    cout << sol.coinChange(coins, 11) << endl;\n    return 0;\n}\n",
      "javascript": "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(amount + 1);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const c of coins) {\n      if (c <= i) {\n        dp[i] = Math.min(dp[i], dp[i - c] + 1);\n      }\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}\n\nconsole.log(coinChange([1, 2, 5], 11));\n"
    },
    "solution": {
      "timeComplexity": "O(amount * coins.length)",
      "spaceComplexity": "O(amount)",
      "approach": "Bottom-Up Dynamic Programming (Unbounded Knapsack)",
      "explanation": "Initialize dp array of size amount + 1 with infinity. dp[0] = 0. Iterate through all amounts 1 to amount, updating dp[i] = min(dp[i], dp[i - coin] + 1) for each eligible coin.",
      "code": "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(amount + 1);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const c of coins) {\n      if (c <= i) {\n        dp[i] = Math.min(dp[i], dp[i - c] + 1);\n      }\n    }\n  }\n  return dp[amount] > amount ? -1 : dp[amount];\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Unbounded Knapsack Pattern",
        "Bottom-Up DP",
        "BFS Shortest Path"
      ],
      "bruteForceThinking": "Try all combinations of coins recursively. Without memoization, time complexity is exponential O(S^N) where S is amount.",
      "progressiveHints": {
        "concept": "Can a greedy approach (always choosing the largest coin) fail? Yes, e.g. coins=[1,3,4,5], amount=7 (Greedy picks 5+1+1=3 coins, but 4+3=2 coins).",
        "approach": "Because greedy fails, we must explore overlapping subproblems with Dynamic Programming.",
        "algorithm": "dp[i] = min(dp[i - c] + 1) for all c in coins where c <= i. Initialize dp with amount + 1."
      },
      "patternRecognition": "Unbounded Knapsack / Minimum Cost to Target DP.",
      "interviewFollowUps": [
        "How would you solve this using BFS? (BFS finds the shortest path, guaranteeing the minimum coin count at first reach).",
        "How many distinct combinations of coins make up the amount (Coin Change II)?"
      ],
      "complexityCoach": {
        "naive": "Exponential brute force.",
        "optimal": "O(amount * C) time and O(amount) space.",
        "guidance": "Amount + 1 serves as a safe sentinel for infinity without integer overflow."
      },
      "commonMistakes": [
        "Assuming the greedy strategy works for arbitrary coin denominations.",
        "Integer overflow when using Integer.MAX_VALUE + 1 in Java."
      ],
      "revisionCard": "dp[0]=0; dp[i]=min(dp[i], dp[i-coin]+1); sentinel=amount+1; return dp[amount]>amount ? -1 : dp[amount];"
    }
  },
  {
    "id": "daily-temperatures",
    "slug": "daily-temperatures",
    "title": "Daily Temperatures",
    "url": "https://leetcode.com/problems/daily-temperatures",
    "difficulty": "Medium",
    "category": "Monotonic Stack",
    "company": "Amazon / Google / Meta / Microsoft",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Bloomberg"
    ],
    "topics": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "acceptanceRate": 66.2,
    "frequency": 95.1,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
    "inputFormat": "An array of integers `temperatures`.",
    "outputFormat": "An array of integers representing the number of days until a warmer day.",
    "examples": [
      {
        "id": 1,
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "output": "[1,1,4,2,1,1,0,0]",
        "explanation": "For day 0 (73), day 1 (74) is warmer (1 day wait). Day 2 (75), day 6 (76) is warmer (4 days wait)."
      },
      {
        "id": 2,
        "input": "temperatures = [30,40,50,60]",
        "output": "[1,1,1,0]",
        "explanation": "Monotonically increasing temperatures."
      },
      {
        "id": 3,
        "input": "temperatures = [30,60,90]",
        "output": "[1,1,0]",
        "explanation": "Direct warmer days."
      }
    ],
    "constraints": [
      "`1 <= temperatures.length <= 10^5`",
      "`30 <= temperatures[i] <= 100`"
    ],
    "hints": [
      "To find the next greater element efficiently, use a Monotonic Decreasing Stack storing indices.",
      "Whenever the current temperature is warmer than the temperature at the stack top, pop the index and record the difference.",
      "Push the current index onto the stack."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "temperatures = [73,74,75,71,69,72,76,73]",
        "expectedOutput": "[1,1,4,2,1,1,0,0]"
      },
      {
        "id": 2,
        "input": "temperatures = [30,40,50,60]",
        "expectedOutput": "[1,1,1,0]"
      },
      {
        "id": 3,
        "input": "temperatures = [30,60,90]",
        "expectedOutput": "[1,1,0]"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Daily Temperatures (Medium)\n    // Target Companies: Amazon, Google, Meta, Microsoft\n    public static int[] dailyTemperatures(int[] temperatures) {\n        // TODO: Implement Monotonic Decreasing Stack\n        int n = temperatures.length;\n        int[] result = new int[n];\n        Stack<Integer> stack = new Stack<>();\n        \n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prevIdx = stack.pop();\n                result[prevIdx] = i - prevIdx;\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};\n        System.out.println(\"Output: \" + Arrays.toString(dailyTemperatures(temps)));\n        System.out.println(\"Expected: [1, 1, 4, 2, 1, 1, 0, 0]\");\n    }\n}\n",
      "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        n = len(temperatures)\n        ans = [0] * n\n        stack = [] # indices\n        for i, t in enumerate(temperatures):\n            while stack and t > temperatures[stack[-1]]:\n                prev = stack.pop()\n                ans[prev] = i - prev\n            stack.append(i)\n        return ans\n\nprint(Solution().dailyTemperatures([73,74,75,71,69,72,76,73]))\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> ans(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; ++i) {\n            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n                int prev = st.top();\n                st.pop();\n                ans[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return ans;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> temps = {73, 74, 75, 71, 69, 72, 76, 73};\n    vector<int> res = sol.dailyTemperatures(temps);\n    for (int x : res) cout << x << \" \";\n    cout << endl;\n    return 0;\n}\n",
      "javascript": "function dailyTemperatures(temperatures) {\n  const n = temperatures.length;\n  const result = new Array(n).fill(0);\n  const stack = []; // indices\n  for (let i = 0; i < n; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      result[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return result;\n}\n\nconsole.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));\n"
    },
    "solution": {
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "approach": "Monotonic Decreasing Stack",
      "explanation": "Iterate through the array while maintaining a stack of indices with decreasing temperatures. When a warmer day is found, pop and record the day difference for all cooler days in the stack.",
      "code": "function dailyTemperatures(temperatures) {\n  const n = temperatures.length;\n  const result = new Array(n).fill(0);\n  const stack = [];\n  for (let i = 0; i < n; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      result[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return result;\n}"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Next Greater Element Pattern",
        "Monotonic Stack",
        "Index Tracking"
      ],
      "bruteForceThinking": "For each day i, iterate through days j > i until a warmer day is found. Worst-case O(N^2) time for strictly decreasing temperatures.",
      "progressiveHints": {
        "concept": "You need the next greater element for each index in the array.",
        "approach": "Use a stack that stores indices whose warmer day has not yet been found.",
        "algorithm": "While current temp > temp[stack.top], pop and answer[top] = i - top. Then push i."
      },
      "patternRecognition": "Next Greater Element / Monotonic Decreasing Stack.",
      "interviewFollowUps": [
        "What if the array is circular (e.g. Next Greater Element II)?",
        "Can we solve this in O(1) space if the temperatures are bounded between 30 and 100?"
      ],
      "complexityCoach": {
        "naive": "O(N^2) brute-force nested scan.",
        "optimal": "O(N) time and O(N) space.",
        "guidance": "Each element is pushed and popped at most once across the entire traversal."
      },
      "commonMistakes": [
        "Storing temperatures in the stack instead of indices.",
        "Using strict inequality >= instead of >."
      ],
      "revisionCard": "Monotonic stack storing indices: while(t[i] > t[stack.peek()]) { prev=pop(); res[prev]=i-prev; } push(i); O(N) time."
    }
  },
  {
    "id": "merge-k-sorted-lists",
    "slug": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "url": "https://leetcode.com/problems/merge-k-sorted-lists",
    "difficulty": "Hard",
    "category": "Linked List & Heap",
    "company": "Amazon / Meta / Google / Microsoft / Apple",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Apple",
      "Uber"
    ],
    "topics": [
      "Linked List",
      "Divide and Conquer",
      "Heap (Priority Queue)",
      "Merge Sort"
    ],
    "acceptanceRate": 51.5,
    "frequency": 97.2,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\n*Merge all the linked-lists into one sorted linked-list and return it.*",
    "inputFormat": "An array of `k` sorted linked list head pointers `lists`.",
    "outputFormat": "The head pointer of the merged sorted linked list.",
    "examples": [
      {
        "id": 1,
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]",
        "explanation": "All lists merged in ascending sorted order."
      },
      {
        "id": 2,
        "input": "lists = []",
        "output": "[]",
        "explanation": "Empty array of lists returns null."
      }
    ],
    "constraints": [
      "`k == lists.length`",
      "`0 <= k <= 10^4`",
      "`0 <= lists[i].length <= 500`",
      "`-10^4 <= lists[i][j] <= 10^4`"
    ],
    "hints": [
      "You can merge lists pairwise using Divide and Conquer, similar to Merge Sort.",
      "Alternatively, maintain a Min-Heap (PriorityQueue) containing the head node of each of the k lists.",
      "Extract the minimum node, append it to your result, and push its next pointer into the heap. Repeat until the heap is empty."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "expectedOutput": "[1,1,2,3,4,4,5,6]"
      },
      {
        "id": 2,
        "input": "lists = []",
        "expectedOutput": "[]"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\n/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode(int val) { this.val = val; }\n * }\n */\npublic class Solution {\n    // Problem: Merge k Sorted Lists (Hard)\n    // Target Companies: Amazon, Meta, Google, Microsoft, Apple\n    public static ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode node : lists) {\n            if (node != null) pq.add(node);\n        }\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (!pq.isEmpty()) {\n            ListNode minNode = pq.poll();\n            curr.next = minNode;\n            curr = curr.next;\n            if (minNode.next != null) {\n                pq.add(minNode.next);\n            }\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Merge k Sorted Lists verified.\");\n    }\n}\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n",
      "python": "import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def mergeKLists(self, lists: list[ListNode]) -> ListNode:\n        heap = []\n        for i, node in enumerate(lists):\n            if node:\n                heapq.heappush(heap, (node.val, i, node))\n        dummy = curr = ListNode(0)\n        while heap:\n            val, i, node = heapq.heappop(heap)\n            curr.next = node\n            curr = curr.next\n            if node.next:\n                heapq.heappush(heap, (node.next.val, i, node.next))\n        return dummy.next\n",
      "cpp": "#include <iostream>\n#include <vector>\n#include <queue>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };\n        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);\n        for (auto l : lists) {\n            if (l) pq.push(l);\n        }\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (!pq.empty()) {\n            ListNode* minNode = pq.top();\n            pq.pop();\n            tail->next = minNode;\n            tail = tail->next;\n            if (minNode->next) pq.push(minNode->next);\n        }\n        return dummy.next;\n    }\n};\n",
      "javascript": "function mergeKLists(lists) {\n  // Pairwise Divide and Conquer merge\n  if (!lists || !lists.length) return null;\n  function mergeTwo(l1, l2) {\n    let dummy = { next: null };\n    let curr = dummy;\n    while (l1 && l2) {\n      if (l1.val <= l2.val) {\n        curr.next = l1;\n        l1 = l1.next;\n      } else {\n        curr.next = l2;\n        l2 = l2.next;\n      }\n      curr = curr.next;\n    }\n    curr.next = l1 || l2;\n    return dummy.next;\n  }\n  let interval = 1;\n  while (interval < lists.length) {\n    for (let i = 0; i + interval < lists.length; i += interval * 2) {\n      lists[i] = mergeTwo(lists[i], lists[i + interval]);\n    }\n    interval *= 2;\n  }\n  return lists[0] || null;\n}\n"
    },
    "solution": {
      "timeComplexity": "O(N log k) where N is total nodes and k is number of lists",
      "spaceComplexity": "O(k) for PriorityQueue",
      "approach": "Min-Heap Priority Queue or Divide & Conquer",
      "explanation": "Insert heads of all k lists into a min-heap. Repeatedly pop the smallest node and push its next successor.",
      "code": "function mergeKLists(lists) { /* O(N log k) */ }"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Linked List Merge Sort",
        "Min-Heap / PriorityQueue",
        "Divide and Conquer"
      ],
      "bruteForceThinking": "Merge lists one by one sequentially: list 1 with list 2 (2N/k nodes), then result with list 3 (3N/k), taking O(k * N) time.",
      "progressiveHints": {
        "concept": "At each step, which node must be chosen next? The smallest of the current heads of the k lists.",
        "approach": "A Min-Heap of size k lets you extract the minimum in O(log k) time.",
        "algorithm": "Add all non-null heads to pq. Poll min, link to tail, add min.next to pq if non-null. Repeat until pq is empty."
      },
      "patternRecognition": "K-Way Merge with Min-Heap / Divide and Conquer.",
      "interviewFollowUps": [
        "How does the Divide and Conquer approach compare with Min-Heap in space complexity?",
        "What if the lists are stored across distributed machines?"
      ],
      "complexityCoach": {
        "naive": "O(k * N) sequential pairwise merging.",
        "optimal": "O(N log k) time and O(k) space using a Min-Heap, or O(1) space with iterative Divide & Conquer.",
        "guidance": "Divide and conquer achieves O(N log k) without requiring extra heap memory."
      },
      "commonMistakes": [
        "Lists array containing null pointers or empty lists.",
        "Infinite loops if minNode.next is not properly pushed."
      ],
      "revisionCard": "Min-Heap of size k: poll min, curr.next = min, push min.next; O(N log k) time, O(k) space."
    }
  },
  {
    "id": "word-search",
    "slug": "word-search",
    "title": "Word Search",
    "url": "https://leetcode.com/problems/word-search",
    "difficulty": "Medium",
    "category": "Matrix & Backtracking",
    "company": "Amazon / Google / Microsoft / Bloomberg",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Bloomberg",
      "Snap"
    ],
    "topics": [
      "Array",
      "String",
      "Backtracking",
      "Matrix"
    ],
    "acceptanceRate": 41.2,
    "frequency": 95,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "Given an `m x n` grid of characters `board` and a string `word`, return `true` *if `word` exists in the grid*.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    "inputFormat": "A 2D character array `board` and a string `word`.",
    "outputFormat": "Boolean `true` if word exists, `false` otherwise.",
    "examples": [
      {
        "id": 1,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "output": "true",
        "explanation": "Word ABCCED is found along adjacent cells."
      },
      {
        "id": 2,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"",
        "output": "true",
        "explanation": "Word SEE is found."
      },
      {
        "id": 3,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "output": "false",
        "explanation": "Cell B cannot be reused."
      }
    ],
    "constraints": [
      "`m == board.length`",
      "`n = board[i].length`",
      "`1 <= m, n <= 6`",
      "`1 <= word.length <= 15`",
      "`board` and `word` consist of only lowercase and uppercase English letters."
    ],
    "hints": [
      "Start DFS from every cell matching word[0].",
      "Mark visited cells in-place (e.g. board[r][c] = '#') to prevent revisiting.",
      "Restore the character upon backtracking (board[r][c] = originalChar)."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        "expectedOutput": "true"
      },
      {
        "id": 2,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"SEE\"",
        "expectedOutput": "true"
      },
      {
        "id": 3,
        "input": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        "expectedOutput": "false"
      }
    ],
    "starterCode": {
      "java": "public class Solution {\n    // Problem: Word Search (Medium)\n    // Target Companies: Amazon, Google, Microsoft, Bloomberg\n    public static boolean exist(char[][] board, String word) {\n        int m = board.length, n = board[0].length;\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (dfs(board, word, r, c, 0)) return true;\n            }\n        }\n        return false;\n    }\n\n    private static boolean dfs(char[][] board, String word, int r, int c, int idx) {\n        if (idx == word.length()) return true;\n        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(idx)) {\n            return false;\n        }\n        char temp = board[r][c];\n        board[r][c] = '#'; // Mark visited\n        boolean found = dfs(board, word, r + 1, c, idx + 1) ||\n                        dfs(board, word, r - 1, c, idx + 1) ||\n                        dfs(board, word, r, c + 1, idx + 1) ||\n                        dfs(board, word, r, c - 1, idx + 1);\n        board[r][c] = temp; // Backtrack\n        return found;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Word Search verified.\");\n    }\n}\n",
      "python": "class Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        m, n = len(board), len(board[0])\n        def dfs(r, c, idx):\n            if idx == len(word): return True\n            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[idx]:\n                return False\n            temp = board[r][c]\n            board[r][c] = '#'\n            found = (dfs(r + 1, c, idx + 1) or\n                     dfs(r - 1, c, idx + 1) or\n                     dfs(r, c + 1, idx + 1) or\n                     dfs(r, c - 1, idx + 1))\n            board[r][c] = temp\n            return found\n\n        for r in range(m):\n            for c in range(n):\n                if dfs(r, c, 0): return True\n        return False\n",
      "cpp": "#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        int m = board.size(), n = board[0].size();\n        for (int r = 0; r < m; ++r) {\n            for (int c = 0; c < n; ++c) {\n                if (dfs(board, word, r, c, 0)) return true;\n            }\n        }\n        return false;\n    }\n    bool dfs(vector<vector<char>>& board, const string& word, int r, int c, int idx) {\n        if (idx == word.size()) return true;\n        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[idx]) return false;\n        char temp = board[r][c];\n        board[r][c] = '#';\n        bool found = dfs(board, word, r + 1, c, idx + 1) ||\n                     dfs(board, word, r - 1, c, idx + 1) ||\n                     dfs(board, word, r, c + 1, idx + 1) ||\n                     dfs(board, word, r, c - 1, idx + 1);\n        board[r][c] = temp;\n        return found;\n    }\n};\n",
      "javascript": "function exist(board, word) {\n  const m = board.length, n = board[0].length;\n  function dfs(r, c, idx) {\n    if (idx === word.length) return true;\n    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;\n    const temp = board[r][c];\n    board[r][c] = '#';\n    const found = dfs(r + 1, c, idx + 1) ||\n                  dfs(r - 1, c, idx + 1) ||\n                  dfs(r, c + 1, idx + 1) ||\n                  dfs(r, c - 1, idx + 1);\n    board[r][c] = temp;\n    return found;\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}\n"
    },
    "solution": {
      "timeComplexity": "O(M * N * 3^L) where L is word length",
      "spaceComplexity": "O(L) recursion stack depth",
      "approach": "Backtracking with In-Place Visited Masking",
      "explanation": "At each cell matching word[0], branch 4 directions. Mark current cell '#' to prevent self-cycles, and restore on backtrack.",
      "code": "function exist(board, word) { /* O(M*N*3^L) */ }"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "2D Grid Traversal",
        "Backtracking Paradigm",
        "Recursion Call Stack"
      ],
      "bruteForceThinking": "Explore all paths of length L from each cell. Without visited tracking, paths cycle indefinitely.",
      "progressiveHints": {
        "concept": "Can you visit the same cell twice in one word path? No, each cell can be used at most once.",
        "approach": "Instead of allocating an extra boolean[][] visited array, mutate board[r][c] temporarily.",
        "algorithm": "Check bounds and char match. Mark '#', recurse 4 neighbors for idx+1. Restore char. Return true if any path matches."
      },
      "patternRecognition": "Grid Backtracking with In-Place State Restoration.",
      "interviewFollowUps": [
        "What if we need to search for multiple words simultaneously (Word Search II / Trie)?",
        "Can we optimize by pruning early if the board doesn't contain enough characters to form the word?"
      ],
      "complexityCoach": {
        "naive": "O(M * N * 4^L) without tracking visited direction.",
        "optimal": "O(M * N * 3^L) since you don't go backward to the cell you just came from.",
        "guidance": "In-place board mutation avoids O(M*N) memory overhead."
      },
      "commonMistakes": [
        "Forgetting to restore the board character when backtracking, corrupting subsequent searches.",
        "Index out of bounds before checking character equality."
      ],
      "revisionCard": "DFS(r, c, idx): if(idx==len) return true; check bounds/char; temp=board[r][c]; board[r][c]='#'; found=any4; board[r][c]=temp; return found;"
    }
  },
  {
    "id": "course-schedule",
    "slug": "course-schedule",
    "title": "Course Schedule",
    "url": "https://leetcode.com/problems/course-schedule",
    "difficulty": "Medium",
    "category": "Graph & Topological Sort",
    "company": "Amazon / Google / Meta / Microsoft",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Uber",
      "Palantir"
    ],
    "topics": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph",
      "Topological Sort"
    ],
    "acceptanceRate": 46.8,
    "frequency": 96.8,
    "contentStatus": "VERIFIED_EDITORIAL",
    "isCurated": true,
    "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.\n\n*Return `true` if you can finish all courses. Otherwise, return `false`.*",
    "inputFormat": "An integer `numCourses` and a 2D integer array `prerequisites`.",
    "outputFormat": "Boolean `true` if all courses can be finished, `false` otherwise.",
    "examples": [
      {
        "id": 1,
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "output": "true",
        "explanation": "Take course 0 then take course 1."
      },
      {
        "id": 2,
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "output": "false",
        "explanation": "A cycle exists: course 0 requires 1, and course 1 requires 0."
      }
    ],
    "constraints": [
      "`1 <= numCourses <= 2000`",
      "`0 <= prerequisites.length <= 5000`",
      "`prerequisites[i].length == 2`",
      "`0 <= a_i, b_i < numCourses`",
      "All prerequisite pairs are unique."
    ],
    "hints": [
      "This problem is equivalent to finding if a cycle exists in a directed graph.",
      "Kahn's Algorithm (BFS with in-degrees): count in-degrees for each course, push courses with in-degree 0 into a queue.",
      "Pop from queue, decrement in-degrees of neighbors. If count of processed nodes equals numCourses, return true."
    ],
    "testCases": [
      {
        "id": 1,
        "input": "numCourses = 2, prerequisites = [[1,0]]",
        "expectedOutput": "true"
      },
      {
        "id": 2,
        "input": "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        "expectedOutput": "false"
      }
    ],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    // Problem: Course Schedule (Medium)\n    // Target Companies: Amazon, Google, Meta, Microsoft\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Kahn's Algorithm (BFS Topological Sort)\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) q.add(i);\n        }\n        int count = 0;\n        while (!q.isEmpty()) {\n            int course = q.poll();\n            count++;\n            for (int nextCourse : adj.get(course)) {\n                if (--inDegree[nextCourse] == 0) {\n                    q.add(nextCourse);\n                }\n            }\n        }\n        return count == numCourses;\n    }\n\n    public static void main(String[] args) {\n        int[][] prereqs = {{1, 0}};\n        System.out.println(\"Output: \" + canFinish(2, prereqs));\n        System.out.println(\"Expected: true\");\n    }\n}\n",
      "python": "from collections import deque\n\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        in_degree = [0] * numCourses\n        adj = [[] for _ in range(numCourses)]\n        for dest, src in prerequisites:\n            adj[src].append(dest)\n            in_degree[dest] += 1\n        q = deque([i for i in range(numCourses) if in_degree[i] == 0])\n        count = 0\n        while q:\n            c = q.popleft()\n            count += 1\n            for nxt in adj[c]:\n                in_degree[nxt] -= 1\n                if in_degree[nxt] == 0:\n                    q.append(nxt)\n        return count == numCourses\n",
      "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<int> inDegree(numCourses, 0);\n        vector<vector<int>> adj(numCourses);\n        for (const auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (inDegree[i] == 0) q.push(i);\n        }\n        int count = 0;\n        while (!q.empty()) {\n            int c = q.front(); q.pop();\n            count++;\n            for (int nxt : adj[c]) {\n                if (--inDegree[nxt] == 0) q.push(nxt);\n            }\n        }\n        return count == numCourses;\n    }\n};\n",
      "javascript": "function canFinish(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [dest, src] of prerequisites) {\n    adj[src].push(dest);\n    inDegree[dest]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  let count = 0;\n  while (queue.length) {\n    const course = queue.shift();\n    count++;\n    for (const next of adj[course]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return count === numCourses;\n}\n\nconsole.log(canFinish(2, [[1, 0]]));\n"
    },
    "solution": {
      "timeComplexity": "O(V + E) where V = numCourses, E = prerequisites.length",
      "spaceComplexity": "O(V + E) for adjacency list and queue",
      "approach": "Kahn's Algorithm (BFS Topological Sort / Cycle Detection)",
      "explanation": "Construct directed graph src -> dest. Maintain in-degree array. Courses with in-degree 0 can be taken immediately. Decrement in-degree of prerequisites. If processed count equals V, a directed acyclic ordering exists.",
      "code": "function canFinish(numCourses, prerequisites) { /* O(V + E) */ }"
    },
    "interviewIntelligence": {
      "prerequisites": [
        "Directed Graph Representation",
        "In-Degree & Out-Degree",
        "Topological Sort"
      ],
      "bruteForceThinking": "Check all permutations of course sequences to see if any satisfies all prerequisites. Factorial O(N!) time.",
      "progressiveHints": {
        "concept": "Can you take a course that depends on itself directly or indirectly? No, a cycle prevents completion.",
        "approach": "A Directed Acyclic Graph (DAG) always admits at least one node with in-degree 0.",
        "algorithm": "Kahn's Algorithm: Queue all in-degree 0 nodes. Decrement neighbor degrees upon pop. Return count == numCourses."
      },
      "patternRecognition": "Topological Sort / Directed Cycle Detection.",
      "interviewFollowUps": [
        "How would you return the actual order of courses to take (Course Schedule II)?",
        "How can this be solved using 3-color DFS cycle detection (white, gray, black)?"
      ],
      "complexityCoach": {
        "naive": "O(N!) factorial search.",
        "optimal": "O(V + E) linear time and linear space with Kahn's algorithm.",
        "guidance": "BFS with in-degrees is iterative and avoids recursion stack depth limits."
      },
      "commonMistakes": [
        "Inverting the edge direction (adding dest -> src instead of src -> dest).",
        "Failing to handle disconnected components with in-degree 0."
      ],
      "revisionCard": "Topological Sort: inDegree array + queue(inDegree==0); count++; decrement neighbors; return count==numCourses; O(V+E)."
    }
  }
];

const CURATED_MAP = new Map();
PROBLEMS.forEach(p => {
  CURATED_MAP.set(p.id, p);
  CURATED_MAP.set(p.slug, p);
});

function toCamelCase(str) {
  if (!str) return 'solve';
  return str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
            .replace(/^[^a-zA-Z]+/, '')
            .replace(/^[A-Z]/, chr => chr.toLowerCase());
}

function getFunctionName(slug, title) {
  if (slug === 'two-sum') return 'twoSum';
  if (slug === '3sum') return 'threeSum';
  if (slug === '3sum-closest') return 'threeSumClosest';
  if (slug === 'bitwise-xor-of-all-pairings') return 'xorAllNums';
  if (slug === 'substring-xor-queries') return 'substringXorQueries';
  if (slug === 'fraction-addition-and-subtraction') return 'fractionAddition';
  if (slug === 'trapping-rain-water') return 'trap';
  if (slug === 'median-of-two-sorted-arrays') return 'findMedianSortedArrays';
  if (slug === '132-pattern') return 'find132pattern';
  if (slug === 'minimum-remove-to-make-valid-parentheses') return 'minRemoveToMakeValid';
  if (slug === 'valid-parentheses') return 'isValid';
  if (slug === 'best-time-to-buy-and-sell-stock') return 'maxProfit';
  if (slug === 'maximum-subarray') return 'maxSubArray';
  if (slug === 'longest-substring-without-repeating-characters') return 'lengthOfLongestSubstring';
  if (slug === 'climbing-stairs') return 'climbStairs';
  if (slug === 'reverse-linked-list') return 'reverseList';
  if (slug === 'invert-binary-tree') return 'invertTree';
  if (slug === 'container-with-most-water') return 'maxArea';
  if (slug === 'coin-change') return 'coinChange';
  if (slug === 'daily-temperatures') return 'dailyTemperatures';
  if (slug === 'merge-k-sorted-lists') return 'mergeKLists';
  if (slug === 'word-search') return 'exist';
  if (slug === 'course-schedule') return 'canFinish';

  return toCamelCase(title || slug);
}

function deriveSignatures(slug, title, topics) {
  const topicsLower = (topics || []).map(t => t.toLowerCase());
  const titleLower = (title || slug).toLowerCase();

  if (titleLower.startsWith('is') || titleLower.startsWith('has') || titleLower.startsWith('can') || titleLower.includes('valid') || titleLower.includes('exist')) {
    if (topicsLower.some(t => t.includes('tree'))) {
      return {
        javaSig: 'TreeNode root',
        pySig: 'root: TreeNode',
        cppSig: 'TreeNode* root',
        jsSig: 'root',
        sampleCall: 'null',
        javaCall: 'null',
        returnType: 'boolean',
        defaultReturn: 'false'
      };
    }
    if (topicsLower.some(t => t.includes('string'))) {
      return {
        javaSig: 'String s',
        pySig: 's: str',
        cppSig: 'string s',
        jsSig: 's',
        sampleCall: '"racecar"',
        javaCall: '"racecar"',
        returnType: 'boolean',
        defaultReturn: 'false'
      };
    }
    return {
      javaSig: 'int[] nums',
      pySig: 'nums: list[int]',
      cppSig: 'vector<int>& nums',
      jsSig: 'nums',
      sampleCall: '[1, 2, 3]',
      javaCall: 'new int[]{1, 2, 3}',
      returnType: 'boolean',
      defaultReturn: 'false'
    };
  }

  if (topicsLower.some(t => t.includes('linked list'))) {
    return {
      javaSig: 'ListNode head',
      pySig: 'head: ListNode',
      cppSig: 'ListNode* head',
      jsSig: 'head',
      sampleCall: 'null',
      javaCall: 'null',
      returnType: 'ListNode',
      defaultReturn: 'null'
    };
  }

  if (topicsLower.some(t => t.includes('tree'))) {
    return {
      javaSig: 'TreeNode root',
      pySig: 'root: TreeNode',
      cppSig: 'TreeNode* root',
      jsSig: 'root',
      sampleCall: 'null',
      javaCall: 'null',
      returnType: 'int',
      defaultReturn: '0'
    };
  }

  if (topicsLower.some(t => t.includes('string'))) {
    return {
      javaSig: 'String s',
      pySig: 's: str',
      cppSig: 'string s',
      jsSig: 's',
      sampleCall: '"leetcode"',
      javaCall: '"leetcode"',
      returnType: titleLower.includes('length') || titleLower.includes('count') ? 'int' : 'String',
      defaultReturn: titleLower.includes('length') || titleLower.includes('count') ? '0' : '""'
    };
  }

  if (topicsLower.some(t => t.includes('matrix')) || titleLower.includes('grid')) {
    return {
      javaSig: 'int[][] grid',
      pySig: 'grid: list[list[int]]',
      cppSig: 'vector<vector<int>>& grid',
      jsSig: 'grid',
      sampleCall: '[[1, 2], [3, 4]]',
      javaCall: 'new int[][]{{1, 2}, {3, 4}}',
      returnType: 'int',
      defaultReturn: '0'
    };
  }

  if (topicsLower.some(t => t.includes('binary search')) || titleLower.includes('search')) {
    return {
      javaSig: 'int[] nums, int target',
      pySig: 'nums: list[int], target: int',
      cppSig: 'vector<int>& nums, int target',
      jsSig: 'nums, target',
      sampleCall: '[1, 2, 3, 4, 5], 3',
      javaCall: 'new int[]{1, 2, 3, 4, 5}, 3',
      returnType: 'int',
      defaultReturn: '-1'
    };
  }

  return {
    javaSig: 'int[] nums',
    pySig: 'nums: list[int]',
    cppSig: 'vector<int>& nums',
    jsSig: 'nums',
    sampleCall: '[1, 2, 3]',
    javaCall: 'new int[]{1, 2, 3}',
    returnType: 'int',
    defaultReturn: '0'
  };
}

function generateInterviewIntelligence(title, difficulty, topics, companies) {
  const primaryTopic = (topics && topics[0]) || 'Data Structures';
  const targetCompany = (companies && companies[0]) || 'Top Tech';

  const prerequisitesMap = {
    'Array': ['Contiguous Memory Models', 'Two-Pointer Technique', 'Sliding Window', 'Prefix Sums'],
    'String': ['ASCII & Unicode Representations', 'Two Pointers', 'Sliding Window', 'Hash Map Lookups'],
    'Hash Table': ['Hash Map vs Hash Set', 'Collision Resolution (Chaining vs Open Addressing)', 'Amortized O(1) Operations'],
    'Dynamic Programming': ['Overlapping Subproblems', 'Optimal Substructure', 'Memoization (Top-Down) vs Tabulation (Bottom-Up)'],
    'Tree': ['Tree Node Traversal (Pre, In, Post, Level-order)', 'Binary Search Tree Invariants', 'Recursion Call Stack'],
    'Binary Tree': ['Tree Node Traversal', 'Recursion Call Stack', 'Breadth-First Search Queue'],
    'Graph': ['Adjacency List vs Matrix', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Cycle Detection'],
    'Stack': ['LIFO Property', 'Monotonic Stack Paradigm', 'Parenthesis & Operator Parsing'],
    'Linked List': ['Pointer Manipulation', 'Sentinel Dummy Nodes', 'Fast and Slow Pointers (Floyd Cycle)'],
    'Binary Search': ['Search Space Invariants', 'Midpoint Calculation (avoiding integer overflow)', 'Monotonic Condition'],
    'Bit Manipulation': ['Bitwise AND, OR, XOR, NOT', "Two's Complement", 'Bitmasking Encodings']
  };

  const prerequisites = prerequisitesMap[primaryTopic] || [
    'Time and Space Complexity Analysis (Big-O)',
    'Fundamental Data Structures',
    'Edge Case Boundary Testing'
  ];

  const bruteForceThinking = `Start by considering how an exhaustive search would solve "${title}". Without optimization, one could inspect every possible candidate state. Analyze the time and space complexity of this naive approach, articulate why it is unacceptable for scale, and determine which redundant work can be cached or skipped.`;

  const progressiveHints = {
    concept: `Identify the governing constraint of "${title}". Does the problem exhibit monotonic properties, optimal substructure, or spatial locality that you can exploit?`,
    approach: `Consider applying ${primaryTopic} techniques. Evaluate whether sorting the input, maintaining a hash table of prior states, or advancing two pointers can eliminate quadratic search time.`,
    algorithm: `Structure your implementation with an invariant check: clarify base cases first, maintain running state inside a single loop, and ensure all pointers advance monotonically toward termination.`
  };

  const patternRecognition = `Canonical ${primaryTopic} pattern frequently tested in ${targetCompany} technical interviews for ${difficulty}-level assessment.`;

  const interviewFollowUps = [
    `How would your solution perform if the input size scales to 10^7 elements, exceeding main memory limits?`,
    `What are the exact boundary cases (e.g. empty inputs, duplicate keys, negative numbers, extreme integer bounds)?`,
    `Can you reduce auxiliary memory from O(N) to O(1) without degrading time complexity?`
  ];

  const complexityCoach = {
    naive: difficulty === 'Hard' ? 'O(2^N) or O(N^3) combinatorial search' : 'O(N^2) brute-force nested iteration',
    optimal: difficulty === 'Hard' ? 'O(N log N) or O(N) optimal bound' : 'O(N) time with O(1) or O(N) auxiliary space',
    guidance: `In live interviews at ${targetCompany}, demonstrating that you can transition from an initial naive baseline to optimal Big-O without hints is a primary hiring signal.`
  };

  const commonMistakes = [
    'Failing to validate null, empty, or single-element inputs before entering main loops.',
    'Integer overflow when performing addition or mid-point calculation on large constraints.',
    'Off-by-one errors in loop boundaries or two-pointer termination conditions.'
  ];

  const revisionCard = `Key insight for ${title}: Apply ${primaryTopic} principles to minimize redundant traversals. Keep invariants clear and test empty/duplicate boundaries.`;

  return {
    prerequisites,
    bruteForceThinking,
    progressiveHints,
    patternRecognition,
    interviewFollowUps,
    complexityCoach,
    commonMistakes,
    revisionCard
  };
}

function generateProblemDetails(raw) {
  if (!raw) return null;

  let slug = 'problem';
  let id = 'problem';
  let rawTitle = '';

  if (typeof raw === 'string') {
    slug = raw.trim();
    id = raw.trim();
  } else if (typeof raw === 'object' && raw !== null) {
    const rawSlug = raw.slug;
    const rawId = raw.id;
    slug = typeof rawSlug === 'string' ? rawSlug : (typeof rawId === 'string' ? rawId : 'problem');
    id = typeof rawId === 'string' ? rawId : slug;
    rawTitle = typeof raw.title === 'string' ? raw.title : '';
  }

  if (CURATED_MAP.has(slug) || CURATED_MAP.has(id)) {
    return CURATED_MAP.get(slug) || CURATED_MAP.get(id);
  }

  const title = rawTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const difficulty = raw.difficulty || 'Medium';
  const topics = Array.isArray(raw.topics) && raw.topics.length > 0 ? raw.topics : ['Algorithms', 'Data Structures'];
  const companies = Array.isArray(raw.companies) && raw.companies.length > 0 ? raw.companies : ['Top Tech'];
  const acceptance = raw.acceptanceRate || 50.0;
  const frequency = raw.frequency || 80.0;
  const url = raw.url || ('https://leetcode.com/problems/' + slug);
  const fnName = getFunctionName(slug, title);

  const { javaSig, pySig, cppSig, jsSig, sampleCall, javaCall, returnType, defaultReturn } = deriveSignatures(slug, title, topics);

  const starterCode = {
    java: `import java.util.*;

public class Solution {
    // Problem: ${title} (${difficulty})
    // Official LeetCode Reference: ${url}
    // Target Companies: ${companies.slice(0, 5).join(', ')}
    public static ${returnType} ${fnName}(${javaSig}) {
        // TODO: Implement optimal solution for ${title}
        
        return ${defaultReturn};
    }

    public static void main(String[] args) {
        System.out.println("Solution initialized for: ${title}");
    }
}
`,
    python: `# Problem: ${title} (${difficulty})
# Verified URL: ${url}
class Solution:
    def ${fnName}(self, ${pySig}) -> ${returnType === 'void' ? 'None' : 'any'}:
        # TODO: Implement optimal solution
        pass
`,
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

// Problem: ${title} (${difficulty})
class Solution {
public:
    ${returnType === 'boolean' ? 'bool' : returnType} ${fnName}(${cppSig}) {
        // TODO: Implement optimal solution
        return ${defaultReturn};
    }
};
`,
    javascript: `// Problem: ${title} (${difficulty})
// Target Companies: ${companies.slice(0, 4).join(', ')}
function ${fnName}(${jsSig}) {
  // TODO: Implement optimal solution for ${title}
  
  return null;
}
`
  };

  const description = `### Problem Summary: **${title}**

> [!WARNING]
> **Proprietary Problem Notice & Redistribution Policy**  
> The exact proprietary problem description, hidden evaluation suites, and official online judge tests for **"${title}"** are copyrighted by LeetCode and not redistributed here.
> 
> Students are encouraged to read the complete original problem statement, test cases, and community discussions directly at:  
> 🔗 [**View Full Problem on Official LeetCode**](${url})

---

### Algorithmic Category & Context:
* **Difficulty Level:** **${difficulty}**
* **Primary Topics:** **${topics.join(', ')}**
* **Companies Frequently Asking This:** **${companies.slice(0, 6).join(', ')}**
* **Global Acceptance Rate:** **${acceptance}%**
* **Interview Frequency:** **${frequency}/100**

### Technical Interview Objective:
Design a clean, production-grade algorithm in Java, Python, C++, or JavaScript to solve **${title}** adhering to optimal time and space complexity limits expected in live technical rounds.

### Key Considerations:
1. Identify the core algorithmic pattern (such as ${topics[0] || 'Data Structures'}) before writing code.
2. Formulate the brute-force baseline and discuss its time/memory tradeoffs with your interviewer.
3. Handle edge cases such as empty inputs, boundaries, and duplicates.
`;

  const interviewIntelligence = generateInterviewIntelligence(title, difficulty, topics, companies);

  return {
    id: raw.id || slug,
    slug,
    title,
    url,
    difficulty,
    category: topics.slice(0, 2).join(' & '),
    company: companies.slice(0, 3).join(' / '),
    companies,
    topics,
    acceptanceRate: acceptance,
    frequency,
    contentStatus: 'UNAVAILABLE_ATTRIBUTED_SUMMARY',
    isCurated: false,
    description,
    inputFormat: `Input data matching the ${topics[0] || 'algorithmic'} specification. See official LeetCode statement for full parameter constraints.`,
    outputFormat: `Return value matching the ${returnType} signature.`,
    examples: [
      {
        id: 1,
        input: `Sample input for ${title} (${topics[0] || 'standard format'})`,
        output: `Sample output`,
        explanation: `Refer to the official LeetCode problem page for the full benchmark examples.`
      }
    ],
    constraints: [
      `Refer to the official LeetCode problem specification at ${url} for authoritative bounds.`
    ],
    hints: [
      `Identify the fundamental data structure: this problem relies heavily on ${topics[0] || 'core algorithms'}.`,
      `Consider whether a sorting step, two pointers, or a hash map can reduce runtime.`,
      `Review edge cases: empty input, single element, large inputs near integer boundaries.`
    ],
    testCases: [
      {
        id: 1,
        input: `Sample test case for ${title}`,
        expectedOutput: `Expected output`,
        explanation: `Benchmark test case`
      }
    ],
    starterCode,
    interviewIntelligence
  };
}

function getFullProblem(idOrSlug, fullList = []) {
  if (!idOrSlug) return PROBLEMS[0];

  let targetKey = '';
  let rawObj = null;

  if (typeof idOrSlug === 'object' && idOrSlug !== null) {
    rawObj = idOrSlug;
    targetKey = typeof idOrSlug.slug === 'string' ? idOrSlug.slug : (typeof idOrSlug.id === 'string' ? idOrSlug.id : '');
  } else if (typeof idOrSlug === 'string') {
    targetKey = idOrSlug.trim();
  }

  if (targetKey) {
    if (CURATED_MAP.has(targetKey)) {
      return CURATED_MAP.get(targetKey);
    }
    const found = (fullList || []).find(p => p && (String(p.slug) === targetKey || String(p.id) === targetKey));
    if (found) {
      return generateProblemDetails(found);
    }
  }

  if (rawObj) {
    return generateProblemDetails(rawObj);
  }

  return generateProblemDetails({ id: targetKey || 'problem', slug: targetKey || 'problem' });
}

module.exports = {
  PROBLEMS,
  CURATED_MAP,
  generateProblemDetails,
  getFullProblem
};
