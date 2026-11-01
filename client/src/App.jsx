import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { LeetCodePortal } from './LeetCodePortal';
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
  LogOut,
  Award,
  BarChart2,
  Building,
  UserCheck,
  Lightbulb,
  Eye,
  Crown,
  Zap,
  Download,
  X,
  CreditCard,
  QrCode,
  Search,
  ExternalLink,
  Layers,
  Flame
} from 'lucide-react';

const SOCKET_SERVER_URL = typeof window !== 'undefined'
  ? (window.location.port === '5173' ? 'http://localhost:5000' : window.location.origin)
  : 'http://localhost:5000';

export default function App() {
  // Room & User State
  const [inRoom, setInRoom] = useState(false);
  const [mainView, setMainView] = useState('lobby'); // 'lobby' | 'leetcode' | 'room'
  const [roomId, setRoomId] = useState('trilogy-sde-round1');
  const [username, setUsername] = useState('Aman Gajbhiye');
  const [role, setRole] = useState('candidate'); // 'candidate' | 'interviewer'
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);

  // Pro Subscription State
  const [isPro, setIsPro] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('₹29 Company Drive Pass');
  const [upiId, setUpiId] = useState('aman@okaxis');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Company Catalog Modal State (3,392 LeetCode Questions Across 470 Companies)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCompany, setCatalogCompany] = useState('Trilogy');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogDifficulty, setCatalogDifficulty] = useState('All');
  const [catalogProblems, setCatalogProblems] = useState([]);
  const [catalogTotal, setCatalogTotal] = useState(0);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);

  // Filter & Problems State
  const [selectedCompany, setSelectedCompany] = useState('Trilogy Innovations');
  const [problemId, setProblemId] = useState('bitwise-xor-of-all-pairings');
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);

  // Hints & Solution View State
  const [revealedHints, setRevealedHints] = useState({});
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  // Editor & Language State
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  // Execution & Terminal State
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'chat' | 'analytics'
  const [runCount, setRunCount] = useState(0);

  // Chat State
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Interview Timer State (45 Minutes)
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Evaluation Rubric Modal State
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [rubricScores, setRubricScores] = useState({
    approach: 5,
    complexity: 4,
    cleanliness: 5,
    communication: 4
  });
  const [recommendation, setRecommendation] = useState('Strong Hire');
  const [interviewerNotes, setInterviewerNotes] = useState('Demonstrated deep mastery of bitwise properties and mathematical edge cases. Articulated O(N+M) time complexity clearly and handled parity cancellations gracefully.');
  const [scorecardSubmitted, setScorecardSubmitted] = useState(false);

  const socketRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Check saved Pro status
  useEffect(() => {
    const savedPro = localStorage.getItem('peerprep_pro_member');
    if (savedPro === 'true') setIsPro(true);
  }, []);

  // Fetch initial curated problem list
  useEffect(() => {
    fetch(`${SOCKET_SERVER_URL}/api/problems`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        if (data.length > 0) {
          const defaultProb = data.find(p => p.company === 'Trilogy Innovations') || data[0];
          setCurrentProblem(defaultProb);
          setProblemId(defaultProb.id);
          setCode(defaultProb.starterCode[language] || '');
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

  // Fetch from 470-Company Directory API
  const fetchCatalogProblems = (company = catalogCompany, search = catalogSearch, diff = catalogDifficulty) => {
    setIsCatalogLoading(true);
    const params = new URLSearchParams({
      company: company === 'All' ? '' : company,
      search,
      difficulty: diff === 'All' ? '' : diff,
      limit: '80'
    });

    fetch(`${SOCKET_SERVER_URL}/api/company-directory?${params}`)
      .then(res => res.json())
      .then(data => {
        setCatalogProblems(data.problems || []);
        setCatalogTotal(data.totalMatching || 0);
        setIsCatalogLoading(false);
      })
      .catch(err => {
        console.error('Failed to load catalog:', err);
        setIsCatalogLoading(false);
      });
  };

  useEffect(() => {
    if (isCatalogOpen) {
      fetchCatalogProblems(catalogCompany, catalogSearch, catalogDifficulty);
    }
  }, [isCatalogOpen, catalogCompany, catalogDifficulty]);

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

    socket.emit('join-room', { roomId, username, role });

    socket.on('room-state', (state) => {
      setCode(state.code);
      setLanguage(state.language);
      setProblemId(state.problemId);
      setUsers(state.users);
      setMessages(state.messages || []);
    });

    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    socket.on('language-update', ({ language: newLang, code: newCode }) => {
      setLanguage(newLang);
      setCode(newCode);
    });

    socket.on('problem-update', ({ problemId: newProbId, code: newCode }) => {
      setProblemId(newProbId);
      setCode(newCode);
    });

    socket.on('user-joined', ({ users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    socket.on('user-left', ({ users: updatedUsers }) => {
      setUsers(updatedUsers);
    });

    socket.on('receive-message', (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    socket.on('execution-result', ({ output: out, isError: err, executionTimeMs }) => {
      setOutput(out);
      setIsError(err);
      setExecutionTime(executionTimeMs);
      setIsRunning(false);
      setRunCount(prev => prev + 1);
      setActiveTab('terminal');

      if (!err && (out.toLowerCase().includes('expected: 13') || out.includes('Passed') || out.includes('[0, 1]'))) {
        confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [inRoom, roomId, username, role]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const handleEditorChange = (newVal) => {
    setCode(newVal);
    if (socketRef.current) {
      socketRef.current.emit('code-change', { roomId, code: newVal });
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (socketRef.current) {
      socketRef.current.emit('language-change', { roomId, language: newLang });
    }
  };

  const handleProblemChange = (newProbId) => {
    setProblemId(newProbId);
    setRevealedHints({});
    setShowSolutionModal(false);
    if (socketRef.current) {
      socketRef.current.emit('problem-change', { roomId, problemId: newProbId });
    }
  };


  // Launch problem from full LeetCode portal into live Monaco room
  const handleSolveFromLeetCode = (prob) => {
    const curatedMatch = problems.find(p => p.id === prob.id || p.id === prob.slug);
    if (curatedMatch) {
      setCurrentProblem(curatedMatch);
      setProblemId(curatedMatch.id);
      setCode(curatedMatch.starterCode[language] || curatedMatch.starterCode['javascript']);
    } else {
      handleLoadFromCatalog(prob);
    }
    setInRoom(true);
    setMainView('room');
  };

  // Load Problem directly from 3,392 Company Catalog into Monaco Live Room
  const handleLoadFromCatalog = (prob) => {
    const loadedProb = {
      id: prob.id || prob.slug,
      title: prob.title,
      difficulty: prob.difficulty,
      category: (prob.topics && prob.topics.slice(0, 2).join(' & ')) || 'Algorithms',
      company: (prob.companies && prob.companies.slice(0, 3).join(', ')) || 'Tier-1 Tech',
      description: `Solve "${prob.title}" (${prob.difficulty}).\n\nCompany Frequencies: ${(prob.companies || []).slice(0, 6).join(', ')}\nAlgorithmic Topics: ${(prob.topics || []).join(', ')}\nAcceptance Rate: ${prob.acceptanceRate || 50}%\nOfficial LeetCode: ${prob.url || 'https://leetcode.com/problems/' + prob.slug}`,
      examples: [
        {
          input: 'Input parameters match standard LeetCode specifications',
          output: 'Return optimal answer adhering to time and space constraints',
          explanation: `Direct official verification available on LeetCode: ${prob.url || 'https://leetcode.com'}`
        }
      ],
      hints: [
        `Hint 1: This problem tests core concepts in ${(prob.topics || ['DSA']).slice(0, 3).join(', ')}.`,
        `Hint 2: It is a high-frequency question asked by ${(prob.companies || ['top tech']).slice(0, 4).join(', ')}.`,
        "Hint 3: Think about optimal Big-O bounds before writing brute-force loops."
      ],
      starterCode: {
        javascript: `// Problem: ${prob.title} (${prob.difficulty})\n// Target Companies: ${(prob.companies || []).slice(0, 3).join(', ')}\n\nfunction solve() {\n  // TODO: Write your optimal solution here...\n  return null;\n}\n\nconsole.log('Testing solution for ${prob.title}...');`,
        python: `# Problem: ${prob.title} (${prob.difficulty})\n# Target Companies: ${(prob.companies || []).slice(0, 3).join(', ')}\n\ndef solve():\n    # TODO: Write your optimal solution here...\n    return None\n\nprint('Testing solution for ${prob.title}...')`,
        java: `public class Solution {\n    public static void main(String[] args) {\n        // TODO: Solve ${prob.title} (${prob.difficulty})\n        System.out.println("Testing solution for ${prob.title}...");\n    }\n}`,
        cpp: `#include <iostream>\nusing namespace std;\n\n// Problem: ${prob.title} (${prob.difficulty})\nint main() {\n    cout << "Testing solution for ${prob.title}..." << endl;\n    return 0;\n}`
      },
      solution: {
        timeComplexity: 'Optimal LeetCode Benchmark',
        spaceComplexity: 'O(1) / O(N)',
        explanation: `Solve directly on LeetCode: ${prob.url}`,
        code: `// Editorial and reference solution available on LeetCode: ${prob.url}`
      }
    };

    setCurrentProblem(loadedProb);
    setProblemId(loadedProb.id);
    setCode(loadedProb.starterCode[language] || loadedProb.starterCode['javascript']);
    setIsCatalogOpen(false);
    confetti({ particleCount: 80, spread: 70 });

    if (socketRef.current) {
      socketRef.current.emit('problem-change', { roomId, problemId: loadedProb.id });
    }
  };

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

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running test suite & executing code inside isolated sandbox...');
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
        setRunCount(prev => prev + 1);

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

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copySolutionToEditor = () => {
    if (currentProblem?.solution?.code) {
      setCode(currentProblem.solution.code);
      if (socketRef.current) {
        socketRef.current.emit('code-change', { roomId, code: currentProblem.solution.code });
      }
      setShowSolutionModal(false);
      confetti({ particleCount: 50, spread: 50 });
    }
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPro(true);
      localStorage.setItem('peerprep_pro_member', 'true');
      setIsPricingOpen(false);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
    }, 1200);
  };

  const submitScorecard = async () => {
    try {
      await fetch(`${SOCKET_SERVER_URL}/api/evaluations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          candidateName: role === 'candidate' ? username : (users.find(u => u.role === 'candidate')?.username || 'Candidate'),
          interviewerName: role === 'interviewer' ? username : 'Lead Evaluator',
          problemTitle: currentProblem ? currentProblem.title : 'Interview Assessment',
          scores: rubricScores,
          recommendation,
          notes: interviewerNotes,
          durationSeconds: (45 * 60) - timeLeft
        })
      });
      setScorecardSubmitted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => setScorecardSubmitted(false), 3000);
    } catch (e) {
      console.error('Failed to submit evaluation:', e);
    }
  };

  const exportScorecardText = () => {
    const total = rubricScores.approach + rubricScores.complexity + rubricScores.cleanliness + rubricScores.communication;
    const report = `=====================================================
PEERPREP OFFICIAL CANDIDATE EVALUATION REPORT
=====================================================
Room ID: ${roomId}
Timestamp: ${new Date().toLocaleString()}
Problem: ${currentProblem?.title || 'Algorithm Assessment'} (${currentProblem?.difficulty || 'N/A'})
Company Track: ${currentProblem?.company || 'General'}
Evaluator: ${username} (${role})
Time Elapsed: ${formatTimer((45 * 60) - timeLeft)}

RUBRIC SCORES (Out of 20):
1. Problem Formulation & Strategy:    ${rubricScores.approach} / 5
2. Algorithmic Complexity (Big-O):     ${rubricScores.complexity} / 5
3. Code Cleanliness & Edge Cases:     ${rubricScores.cleanliness} / 5
4. Communication & Articulation:       ${rubricScores.communication} / 5
-----------------------------------------------------
TOTAL SCORE: ${total} / 20 (${Math.round((total / 20) * 100)}%)
HIRING RECOMMENDATION: [ ${recommendation.toUpperCase()} ]
-----------------------------------------------------
EVALUATOR NOTES & FEEDBACK:
${interviewerNotes}
=====================================================`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PeerPrep_Scorecard_${roomId}.txt`;
    a.click();
  };

  const filteredProblems = selectedCompany === 'All Companies'
    ? problems
    : problems.filter(p => p.company?.toLowerCase().includes(selectedCompany.toLowerCase()) || p.company === selectedCompany);


  // Full LeetCode Company Directory & Heatmap View
  if (mainView === 'leetcode') {
    return (
      <>
        <LeetCodePortal
          serverUrl={SOCKET_SERVER_URL}
          inRoom={inRoom}
          roomId={roomId}
          onSelectProblem={handleSolveFromLeetCode}
          onSwitchToInterviewRoom={() => {
            setInRoom(true);
            setMainView('room');
          }}
          onOpenPricing={() => setIsPricingOpen(true)}
        />
        {isPricingOpen && renderPricingModal()}
      </>
    );
  }

  // 1. Lobby Screen (Join Room)
  if (!inRoom) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.18),rgba(255,255,255,0))]" />
        
        <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  PeerPrep <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">PRO</span>
                </h1>
                <p className="text-xs text-slate-400">470 Companies • 3,392 LeetCode Questions • Live Mocks</p>
              </div>
            </div>

            <button
              onClick={() => setIsPricingOpen(true)}
              className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-amber-500/20 transition"
            >
              <Crown className="w-3.5 h-3.5" /> Pass ₹29
            </button>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Catalog: <strong>3,392 LeetCode Questions</strong></span>
            </div>
            <button
              type="button"
              onClick={() => setMainView('leetcode')}
              className="text-[10px] font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/40 px-2 py-1 rounded border border-amber-500/40 transition cursor-pointer"
            >
              Explore Bank & Heatmap →
            </button>
          </div>

          
          <button
            type="button"
            onClick={() => setMainView('leetcode')}
            className="w-full mb-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Practice 470-Company LeetCode Questions & Heatmap →</span>
          </button>

          <form onSubmit={() => { setInRoom(true); setMainView("room"); }} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Name / Handle
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. Aman Gajbhiye"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Interview Room ID
                </label>
                <button
                  type="button"
                  onClick={() => setRoomId(`interview-${Math.floor(1000 + Math.random() * 9000)}`)}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono"
                >
                  Generate ID
                </button>
              </div>
              <input
                type="text"
                required
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                placeholder="e.g. trilogy-sde-round1"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Your Role (RBAC)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2 ${
                    role === 'candidate'
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-xs font-bold">Candidate</div>
                    <div className="text-[10px] text-slate-400">Solve & test code</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('interviewer')}
                  className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2 ${
                    role === 'interviewer'
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs font-bold">Interviewer</div>
                    <div className="text-[10px] text-slate-400">Score rubric & evaluate</div>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium py-3 rounded-lg text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Enter Live Technical Room <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-800/80 text-center flex items-center justify-between text-[11px] text-slate-500">
            <span>Isolated Sandboxing (JS, Python, Java, C++)</span>
            <button onClick={() => setIsPricingOpen(true)} className="text-indigo-400 hover:underline">
              {isPro ? '⭐ Pro Active' : 'Pricing Plans'}
            </button>
          </div>
        </div>

        {/* Pricing Modal */}
        {isPricingOpen && renderPricingModal()}

        {/* 470-Company LeetCode Catalog Modal */}
        {isCatalogOpen && renderCompanyCatalogModal()}
      </div>
    );
  }

  // 470-Company & 3,392 LeetCode Question Explorer Modal
  function renderCompanyCatalogModal() {
    const popularCompanies = ['Trilogy', 'Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg', 'Uber', 'Apple', 'Goldman Sachs', 'All'];

    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
        <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  Company-Wise Question Bank
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">
                    3,392 Problems • 470 Companies
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Filter by company, search topics, or load directly into the live mock interview room.</p>
              </div>
            </div>
            <button
              onClick={() => setIsCatalogOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/40 space-y-3 shrink-0">
            {/* Quick Company Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider shrink-0 mr-1">Top Tech:</span>
              {popularCompanies.map(comp => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => {
                    setCatalogCompany(comp);
                    fetchCatalogProblems(comp, catalogSearch, catalogDifficulty);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition flex items-center gap-1 ${
                    catalogCompany.toLowerCase() === comp.toLowerCase()
                      ? comp === 'Trilogy' 
                        ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                        : 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {comp === 'Trilogy' && <Flame className="w-3 h-3 text-amber-950 fill-current" />}
                  {comp}
                </button>
              ))}
            </div>

            {/* Search Input & Difficulty Selector */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={e => {
                    setCatalogSearch(e.target.value);
                    fetchCatalogProblems(catalogCompany, e.target.value, catalogDifficulty);
                  }}
                  placeholder="Search 3,392 LeetCode questions by title, keyword, or topic (e.g. XOR, Tree, DP, Graph)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-1">
                {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => {
                      setCatalogDifficulty(diff);
                      fetchCatalogProblems(catalogCompany, catalogSearch, diff);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg transition ${
                      catalogDifficulty === diff
                        ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                        : 'bg-slate-950 border border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Problem List Display */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mb-1">
              <span>Showing <strong>{catalogProblems.length}</strong> matching questions (Total: {catalogTotal})</span>
              <span className="text-indigo-400">Click "Load into Room" to start coding live</span>
            </div>

            {isCatalogLoading ? (
              <div className="text-center py-12 text-slate-500 text-xs font-mono">
                Searching 3,392 LeetCode problems...
              </div>
            ) : catalogProblems.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No problems found matching your filters. Try selecting "All" or a different keyword.
              </div>
            ) : (
              catalogProblems.map((prob, idx) => (
                <div
                  key={prob.id || idx}
                  className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl hover:border-slate-700 transition flex items-center justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition">
                        {prob.title}
                      </h4>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold border ${
                        prob.difficulty === 'Hard'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {prob.difficulty}
                      </span>
                      {prob.acceptanceRate && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          {prob.acceptanceRate}% accept
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                      {(prob.companies || []).slice(0, 3).map((c, cIdx) => (
                        <span key={cIdx} className="px-1.5 py-0.2 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-mono">
                          {c}
                        </span>
                      ))}
                      {(prob.topics || []).slice(0, 2).map((t, tIdx) => (
                        <span key={tIdx} className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {prob.url && (
                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Solve on official LeetCode"
                        className="text-[11px] text-slate-400 hover:text-white p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleLoadFromCatalog(prob)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg shadow transition flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" /> Load into Room
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Pricing Modal Render Helper
  function renderPricingModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">PeerPrep Placement Season Passes</h3>
            </div>
            <button onClick={() => setIsPricingOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Affordable sachet pricing for engineering students preparing for product company online assessments and tech interviews.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div
              onClick={() => setSelectedPlan('₹29 Company Drive Pass')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                selectedPlan === '₹29 Company Drive Pass'
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-md'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs text-indigo-400 font-semibold mb-1">Company Pass</div>
              <div className="text-2xl font-black text-white">₹29 <span className="text-[11px] text-slate-500 font-normal">/ 7 Days</span></div>
              <ul className="mt-2 text-[11px] text-slate-300 space-y-1">
                <li>✓ Trilogy & Amazon Specific Tracks</li>
                <li>✓ Hints & Optimal Solutions</li>
                <li>✓ Unlimited Real-Time Rooms</li>
              </ul>
            </div>

            <div
              onClick={() => setSelectedPlan('₹99 All-Access Pass')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                selectedPlan === '₹99 All-Access Pass'
                  ? 'bg-amber-500/20 border-amber-500 shadow-md'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs text-amber-400 font-semibold mb-1">Season All-Access</div>
              <div className="text-2xl font-black text-white">₹99 <span className="text-[11px] text-slate-500 font-normal">/ 30 Days</span></div>
              <ul className="mt-2 text-[11px] text-slate-300 space-y-1">
                <li>✓ All 470 Company Problem Sets</li>
                <li>✓ Full AI Interviewer Rubric Scorecards</li>
                <li>✓ Exportable PDF Assessment Reports</li>
              </ul>
            </div>
          </div>

          {/* UPI Checkout Section */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-indigo-400" /> Instant UPI Payment (GPay, PhonePe, Paytm)
              </span>
              <span className="font-bold text-white font-mono">{selectedPlan.split(' ')[0]}</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID (e.g. mobile@upi)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessingPayment}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? 'Verifying UPI...' : 'Pay with UPI'}
              </button>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-slate-400" /> Instant activation via Virtual UPI Gateway. Zero gateway commission for students.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Live Collaborative Interview Room
  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight hidden sm:inline">PeerPrep</span>
          </div>


          {/* Full LeetCode Portal & Heatmap Switcher */}
          <button
            onClick={() => setMainView('leetcode')}
            className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-semibold cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>LeetCode Hub & Heatmap</span>
          </button>

          {/* 470-Company Explorer Button */}
          <button
            onClick={() => setIsCatalogOpen(true)}
            className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-medium cursor-pointer"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Company Bank (3,392)</span>
          </button>

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

          {/* Connected Peers with Role Badges */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 hidden xl:flex">
            <Users className="w-3.5 h-3.5 text-slate-500 ml-1" />
            {users.map((u, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-medium text-[11px] flex items-center gap-1">
                {u.username}
                <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                  u.role === 'interviewer' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {u.role}
                </span>
              </span>
            ))}
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

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Subscription Button */}
          <button
            onClick={() => setIsPricingOpen(true)}
            className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold transition ${
              isPro 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{isPro ? 'Pro Active' : 'Pass ₹29'}</span>
          </button>

          {/* Rubric Scorecard Button */}
          <button
            onClick={() => setIsScorecardOpen(true)}
            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-medium"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scorecard</span>
          </button>

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
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main 3-Column Working Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Statement, Hints & Solutions (32% Width) */}
        <div className="w-[32%] border-r border-slate-800 bg-slate-900/60 flex flex-col overflow-y-auto">
          {/* Company Filter & Problem Switcher */}
          <div className="p-3 border-b border-slate-800 space-y-2 bg-slate-950/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Building className="w-3 h-3 text-indigo-400" /> Target Company
              </span>
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedCompany}
                  onChange={e => setSelectedCompany(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-[11px] rounded px-2 py-0.5 text-indigo-300 font-medium focus:outline-none"
                >
                  <option value="Trilogy Innovations">Trilogy Innovations</option>
                  <option value="Amazon / Google">Amazon / Google</option>
                  <option value="Meta / Microsoft">Meta / Microsoft</option>
                  <option value="All Companies">All Companies</option>
                </select>

                <button
                  type="button"
                  onClick={() => setIsCatalogOpen(true)}
                  title="Browse full 3,392 questions"
                  className="text-[10px] bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30"
                >
                  Browse 470+
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-indigo-400" /> Problem
              </span>
              <select
                value={problemId}
                onChange={e => handleProblemChange(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-[11px] rounded px-2 py-0.5 text-slate-200 focus:outline-none max-w-[210px]"
              >
                {filteredProblems.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
          </div>

          {currentProblem && (
            <div className="p-4 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">{currentProblem.title}</h2>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${
                  currentProblem.difficulty === 'Hard'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : currentProblem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {currentProblem.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                  {currentProblem.company}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {currentProblem.category}
                </span>
              </div>

              <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                {currentProblem.description}
              </div>

              {/* Examples */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Examples:</h3>
                {currentProblem.examples?.map((ex, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 space-y-1 text-xs font-mono">
                    <p className="text-slate-400"><strong className="text-indigo-400">Input:</strong> {ex.input}</p>
                    <p className="text-slate-400"><strong className="text-emerald-400">Output:</strong> {ex.output}</p>
                    {ex.explanation && (
                      <p className="text-slate-500 text-[11px]">Explanation: {ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Hints Accordion */}
              {currentProblem.hints && currentProblem.hints.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Algorithmic Hints ({currentProblem.hints.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {currentProblem.hints.map((hintText, hIdx) => (
                      <div key={hIdx} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60">
                        <button
                          type="button"
                          onClick={() => toggleHint(hIdx)}
                          className="w-full p-2 text-left text-xs font-medium text-slate-400 hover:text-white flex items-center justify-between"
                        >
                          <span>Hint {hIdx + 1}</span>
                          <span className="text-[10px] text-indigo-400 font-mono">
                            {revealedHints[hIdx] ? 'Hide' : 'Reveal'}
                          </span>
                        </button>
                        {revealedHints[hIdx] && (
                          <div className="p-2.5 bg-slate-900 border-t border-slate-800/60 text-xs text-amber-200/90 leading-relaxed">
                            {hintText}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution Button */}
              {currentProblem.solution && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSolutionModal(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>View Optimal Solution & Complexity</span>
                  </button>
                </div>
              )}
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
            <span className="text-[10px] text-slate-500">Live Dual-Cursor Sync (Sub-50ms)</span>
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

        {/* Right Panel: Terminal, Chat, Analytics (25% Width) */}
        <div className="w-[25%] flex flex-col bg-slate-950">
          {/* Tabs Navigation */}
          <div className="h-10 border-b border-slate-800 bg-slate-900/60 flex items-center px-2">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition ${
                activeTab === 'terminal' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> Output
              {executionTime && (
                <span className="text-[9px] text-indigo-400 font-mono">({executionTime}ms)</span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition ml-1 ${
                activeTab === 'chat' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chat
              {messages.length > 0 && (
                <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition ml-1 ${
                activeTab === 'analytics' 
                  ? 'bg-slate-800 text-white' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Analytics
            </button>
          </div>

          {/* Tab 1: Terminal Window */}
          {activeTab === 'terminal' && (
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span>Isolated Sandbox Output</span>
                <span className={isError ? 'text-rose-400' : output ? 'text-emerald-400' : 'text-slate-500'}>
                  {isError ? 'Exit with error' : output ? 'Passed' : 'Idle'}
                </span>
              </div>
              <pre className={`flex-1 whitespace-pre-wrap font-mono text-xs ${isError ? 'text-rose-400' : 'text-slate-200'}`}>
                {output || 'Click "Run Code" above to execute against test suite in isolated sandbox.'}
              </pre>
            </div>
          )}

          {/* Tab 2: Live Chat Room */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {messages.length === 0 ? (
                  <p className="text-slate-500 text-center text-[11px] py-4">No messages yet. Real-time peer chat active.</p>
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
                        <span>{m.time}</span>
                      </div>
                      <p className="text-xs">{m.text}</p>
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

          {/* Tab 3: Performance Analytics */}
          {activeTab === 'analytics' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Candidate Speed Metrics</div>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-500">Run Attempts</div>
                    <div className="text-base font-bold text-white">{runCount}</div>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-500">Last Latency</div>
                    <div className="text-base font-bold text-indigo-400">{executionTime ? `${executionTime}ms` : '--'}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2 font-mono">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-sans">Interview Progress</div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Elapsed Time:</span>
                  <span className="font-bold">{formatTimer((45 * 60) - timeLeft)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Language Active:</span>
                  <span className="uppercase text-emerald-400 font-bold">{language}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>Buffer Length:</span>
                  <span>{code.length} chars</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Solution Modal */}
      {showSolutionModal && currentProblem?.solution && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Optimal Solution & Complexity</h3>
              </div>
              <button onClick={() => setShowSolutionModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono">
                  <span className="text-slate-400">Time Complexity:</span>{' '}
                  <span className="text-emerald-400 font-bold">{currentProblem.solution.timeComplexity}</span>
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg font-mono">
                  <span className="text-slate-400">Space Complexity:</span>{' '}
                  <span className="text-emerald-400 font-bold">{currentProblem.solution.spaceComplexity}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-slate-300 leading-relaxed">
                <strong>Algorithmic Explanation:</strong> {currentProblem.solution.explanation}
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Optimal Reference Code:
                </div>
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-indigo-200 overflow-x-auto whitespace-pre-wrap">
                  {currentProblem.solution.code}
                </pre>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={copySolutionToEditor}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Insert Solution Into Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSolutionModal(false)}
                  className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {isPricingOpen && renderPricingModal()}

      {/* 470-Company LeetCode Catalog Modal */}
      {isCatalogOpen && renderCompanyCatalogModal()}

      {/* Structured Interviewer Evaluation Rubrics Modal */}
      {isScorecardOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Technical Interviewer Evaluation Rubric</h3>
              </div>
              <button onClick={() => setIsScorecardOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Score Breakdown (1-5) */}
              {[
                { key: 'approach', label: '1. Problem Formulation & Strategy' },
                { key: 'complexity', label: '2. Algorithmic Complexity (Big-O)' },
                { key: 'cleanliness', label: '3. Code Cleanliness & Edge Cases' },
                { key: 'communication', label: '4. Communication & Thought Process' },
              ].map(crit => (
                <div key={crit.key} className="flex items-center justify-between">
                  <span className="text-slate-300 font-medium">{crit.label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRubricScores(prev => ({ ...prev, [crit.key]: val }))}
                        className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs transition ${
                          rubricScores[crit.key] >= val
                            ? 'bg-amber-500 text-slate-950 font-bold shadow'
                            : 'bg-slate-950 border border-slate-800 text-slate-500'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Total Score Display */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Composite Score:</span>
                <span className="text-sm font-bold font-mono text-amber-400">
                  {rubricScores.approach + rubricScores.complexity + rubricScores.cleanliness + rubricScores.communication} / 20 ({Math.round(((rubricScores.approach + rubricScores.complexity + rubricScores.cleanliness + rubricScores.communication) / 20) * 100)}%)
                </span>
              </div>

              {/* Recommendation Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Hiring Recommendation
                </label>
                <div className="grid grid-cols-4 gap-1.5 font-medium">
                  {['Strong Hire', 'Hire', 'Leaning Hire', 'No Hire'].map(rec => (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => setRecommendation(rec)}
                      className={`py-1.5 rounded text-[11px] transition ${
                        recommendation === rec
                          ? rec === 'Strong Hire' ? 'bg-emerald-600 text-white font-bold'
                            : rec === 'Hire' ? 'bg-indigo-600 text-white font-bold'
                            : rec === 'Leaning Hire' ? 'bg-amber-600 text-white font-bold'
                            : 'bg-rose-600 text-white font-bold'
                          : 'bg-slate-950 border border-slate-800 text-slate-400'
                      }`}
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interviewer Notes */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Interviewer Feedback & Notes
                </label>
                <textarea
                  rows={3}
                  value={interviewerNotes}
                  onChange={e => setInterviewerNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  placeholder="Record strengths, code clarity, and areas of improvement..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={submitScorecard}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {scorecardSubmitted ? 'Scorecard Saved!' : 'Save & Persist Scorecard'}
                </button>
                <button
                  type="button"
                  onClick={exportScorecardText}
                  className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg transition flex items-center justify-center gap-1.5"
                  title="Export official assessment report"
                >
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
