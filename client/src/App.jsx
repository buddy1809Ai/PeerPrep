import React, { useState, useEffect, useRef, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import confetti from 'canvas-confetti';
import { LeetCodePortal } from './LeetCodePortal';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { getFullProblem, PROBLEMS, generateProblemDetails } from './problemUtils';
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  Minimize2,
  Save,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Building,
  Sparkles,
  Crown,
  Award,
  Terminal,
  MessageSquare,
  BarChart2,
  Code2,
  LogOut,
  Clock,
  Lightbulb,
  Eye,
  Check,
  Copy,
  Plus,
  ChevronDown,
  ChevronUp,
  Users,
  Flame,
  Zap
} from 'lucide-react';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://server-rho-nine-82.vercel.app');

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://server-rho-nine-82.vercel.app');

export default function App() {
  // Navigation & View Mode
  const [mainView, setMainView] = useState('leetcode'); // 'leetcode' | 'room'
  const [inRoom, setInRoom] = useState(false);
  const [roomId, setRoomId] = useState('interview-101');
  const [username, setUsername] = useState('Aman Gajbhiye');
  const [role, setRole] = useState('candidate');
  const [copied, setCopied] = useState(false);

  // Workspace Problem State
  const [problems, setProblems] = useState(PROBLEMS);
  const [currentProblem, setCurrentProblem] = useState(PROBLEMS[0]);
  const [problemId, setProblemId] = useState(PROBLEMS[0].id);
  const [selectedCompany, setSelectedCompany] = useState('Trilogy Innovations');
  const [revealedHints, setRevealedHints] = useState({});
  const [showSolutionModal, setShowSolutionModal] = useState(false);

  // Editor State
  const [language, setLanguage] = useState(() => localStorage.getItem('peerprep_user_language') || 'java');
  const [code, setCode] = useState(() => {
    const defLang = localStorage.getItem('peerprep_user_language') || 'java';
    const draftKey = `peerprep_draft_${PROBLEMS[0].id}_${defLang}`;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved && saved.trim().length > 0) return saved;
    } catch (_) {}
    return (PROBLEMS[0].starterCode && PROBLEMS[0].starterCode[defLang]) || PROBLEMS[0].starterCode.java || '';
  });
  const [users, setUsers] = useState([]);
  const [autosaveNotice, setAutosaveNotice] = useState('Autosaved');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pricing & Pro Pass
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Single Mock Pass (₹29)');
  const [isPro, setIsPro] = useState(false);

  // Online Judge & Test Execution State
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [runCount, setRunCount] = useState(0);
  const [judgeVerdict, setJudgeVerdict] = useState(null); // 'Accepted' | 'Wrong Answer' | 'Compilation Error' | 'Runtime Error' | 'Time Limit Exceeded' | null
  const [testResults, setTestResults] = useState([]);
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [bottomTab, setBottomTab] = useState('testcases'); // 'testcases' | 'results' | 'history' | 'terminal' | 'chat' | 'editorial'
  const [leftPanelTab, setLeftPanelTab] = useState('statement'); // 'statement' | 'intelligence' | 'editorial'
  const [submissionHistory, setSubmissionHistory] = useState([]); // 'testcases' | 'results' | 'terminal' | 'chat' | 'editorial'
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);

  // Live Chat State
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // 45-Minute Interview Timer State
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Rubric Scorecard State
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);
  const [rubricScores, setRubricScores] = useState({
    approach: 5,
    complexity: 4,
    cleanliness: 5,
    communication: 4
  });
  const [recommendation, setRecommendation] = useState('Strong Hire');
  const [interviewerNotes, setInterviewerNotes] = useState('Demonstrated clear algorithmic reasoning and optimal time complexity.');
  const [scorecardSubmitted, setScorecardSubmitted] = useState(false);

  const socketRef = useRef(null);
  const chatBottomRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const isRemoteUpdateRef = useRef(false);
  const allCatalogRef = useRef([]);
  const [remoteCursor, setRemoteCursor] = useState(null);

  // Load Pro Status
  useEffect(() => {
    const savedPro = localStorage.getItem('peerprep_pro_member');
    if (savedPro === 'true') setIsPro(true);
  }, []);

  // Universal Problem Selector with Draft Restoration
  const selectProblem = (probOrSlug, broadcast = true) => {
    const resolved = getFullProblem(probOrSlug, allCatalogRef.current);
    if (!resolved) return;

    setCurrentProblem(resolved);
    setProblemId(resolved.id);
    setRevealedHints({});
    setShowSolutionModal(false);
    setJudgeVerdict(null);
    setTestResults([]);
    setSelectedTestCaseIdx(0);
    try {
      const savedHist = localStorage.getItem(`peerprep_history_${resolved.id}`);
      if (savedHist) setSubmissionHistory(JSON.parse(savedHist));
      else setSubmissionHistory([]);
    } catch (_) { setSubmissionHistory([]); }

    // Check for saved local draft for this problem + language
    const draftKey = `peerprep_draft_${resolved.id}_${language}`;
    let starter = '';
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft && savedDraft.trim().length > 0) {
        starter = savedDraft;
        setAutosaveNotice('Draft Restored');
      }
    } catch (_) {}

    if (!starter) {
      starter = (resolved.starterCode && resolved.starterCode[language]) || 
        (resolved.starterCode && resolved.starterCode['javascript']) || '';
      setAutosaveNotice('Default Template');
    }

    setCode(starter);
    if (editorRef.current) {
      editorRef.current.setValue(starter);
    }

    try {
      const url = new URL(window.location);
      url.searchParams.set('problem', resolved.slug || resolved.id);
      window.history.pushState({ problemId: resolved.id }, '', url);
    } catch (_) {}

    if (broadcast && socketRef.current) {
      socketRef.current.emit('problem-change', { roomId, problemId: resolved.id });
    }
  };

  // Load All 3,392 LeetCode Questions from public dataset
  useEffect(() => {
    fetch('/problems.json')
      .then(res => res.json())
      .then(data => {
        allCatalogRef.current = data;
        setProblems(data);

        const urlParams = new URLSearchParams(window.location.search);
        const urlProblem = urlParams.get('problem');

        if (urlProblem) {
          selectProblem(urlProblem, false);
          setInRoom(true);
          setMainView('room');
        } else {
          const def = getFullProblem('bitwise-xor-of-all-pairings', data);
          setCurrentProblem(def);
          setProblemId(def.id);
          setCode(def.starterCode[language] || def.starterCode['javascript']);
        }
      })
      .catch(err => {
        console.warn('Loading fallback curated problems:', err);
        const def = getFullProblem('bitwise-xor-of-all-pairings', PROBLEMS);
        setCurrentProblem(def);
        setProblemId(def.id);
        setCode(def.starterCode[language] || def.starterCode['javascript']);
      });
  }, []);

  // Popstate listener for Browser Back & Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const pSlug = new URLSearchParams(window.location.search).get('problem');
      if (pSlug) {
        selectProblem(pSlug, false);
        setInRoom(true);
        setMainView('room');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [language]);

  // Keyboard Shortcuts: Ctrl+Enter (Run) & Ctrl+Shift+Enter (Submit)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        handleSubmitCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language, currentProblem, isRunning, isSubmitting]);

  // Real-Time Socket.io Connection & Room Synchronization
  useEffect(() => {
    if (!inRoom) return;

    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      timeout: 10000
    });
    socketRef.current = socket;

    socket.emit('join-room', { roomId, username, role, problemId });

    socket.on('room-state', (state) => {
      if (state.language) setLanguage(state.language);
      if (state.problemId && state.problemId !== problemId) {
        setProblemId(state.problemId);
        const p = getFullProblem(state.problemId, allCatalogRef.current);
        if (p) setCurrentProblem(p);
      }
      if (state.code) setCode(state.code);
      if (state.users) setUsers(state.users);
      if (state.messages) setMessages(state.messages);
      if (state.timerSeconds !== undefined) {
        setTimeLeft(state.timerSeconds);
        setIsTimerRunning(state.timerRunning || false);
      }
    });

    socket.on('code-update', (newCode) => {
      if (editorRef.current) {
        const currentVal = editorRef.current.getValue();
        if (currentVal !== newCode) {
          isRemoteUpdateRef.current = true;
          const pos = editorRef.current.getPosition();
          editorRef.current.setValue(newCode);
          if (pos) editorRef.current.setPosition(pos);
          isRemoteUpdateRef.current = false;
        }
      }
      setCode(prev => (prev !== newCode ? newCode : prev));
    });

    socket.on('timer-update', ({ timerSeconds, timerRunning }) => {
      setTimeLeft(timerSeconds);
      setIsTimerRunning(timerRunning);
    });

    socket.on('cursor-update', ({ username: peerName, role: peerRole, position }) => {
      setRemoteCursor({ username: peerName, role: peerRole, position });
      if (editorRef.current && monacoRef.current && position) {
        const isInterviewer = peerRole === 'interviewer';
        const styleId = 'monaco-remote-cursor-styles';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = `
            .remote-cursor-candidate { border-left: 2px solid #6366f1 !important; margin-left: -1px; }
            .remote-cursor-interviewer { border-left: 2px solid #10b981 !important; margin-left: -1px; }
          `;
          document.head.appendChild(style);
        }

        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          [
            {
              range: new monacoRef.current.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
              ),
              options: {
                className: isInterviewer ? 'remote-cursor-interviewer' : 'remote-cursor-candidate',
                hoverMessage: { value: `**${peerName}** (${peerRole.toUpperCase()})` }
              }
            }
          ]
        );
      }
    });

    socket.on('cursor-remove', () => {
      setRemoteCursor(null);
      if (editorRef.current && decorationsRef.current.length > 0) {
        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
      }
    });

    socket.on('language-update', ({ language: newLang, code: newCode }) => {
      setLanguage(newLang);
      if (newCode) {
        setCode(newCode);
        if (editorRef.current) editorRef.current.setValue(newCode);
      }
    });

    socket.on('problem-update', ({ problemId: newProbId, code: newCode, problem: receivedProb }) => {
      const resolved = receivedProb || getFullProblem(newProbId, allCatalogRef.current);
      setProblemId(newProbId);
      setCurrentProblem(resolved);
      const targetCode = newCode || (resolved.starterCode && resolved.starterCode[language]) || '';
      setCode(targetCode);
      if (editorRef.current) editorRef.current.setValue(targetCode);
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
    });

    return () => {
      socket.disconnect();
    };
  }, [inRoom, roomId, username, role]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, bottomTab]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Verify initial code matches current problem
    if (currentProblem && currentProblem.starterCode) {
      const draftKey = `peerprep_draft_${currentProblem.id}_${language}`;
      const saved = localStorage.getItem(draftKey);
      const initialCode = (saved && saved.trim().length > 0) 
        ? saved 
        : (currentProblem.starterCode[language] || currentProblem.starterCode['javascript']);
      if (initialCode && editor.getValue() !== initialCode) {
        editor.setValue(initialCode);
      }
    }

    editor.onDidChangeModelContent(() => {
      if (isRemoteUpdateRef.current) return;
      const newVal = editor.getValue();
      handleEditorChange(newVal);
    });

    editor.onDidChangeCursorPosition((e) => {
      if (socketRef.current) {
        socketRef.current.emit('cursor-move', {
          roomId,
          username,
          role,
          position: {
            lineNumber: e.position.lineNumber,
            column: e.position.column
          }
        });
      }
    });
  };

  const handleEditorChange = (newVal) => {
    setCode(newVal);
    setAutosaveNotice('Saving...');
    if (currentProblem && currentProblem.id) {
      const draftKey = `peerprep_draft_${currentProblem.id}_${language}`;
      try {
        localStorage.setItem(draftKey, newVal);
        setAutosaveNotice('Autosaved');
      } catch (_) {}
    }
    if (socketRef.current) {
      socketRef.current.emit('code-change', { roomId, code: newVal });
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('peerprep_user_language', newLang);
    if (currentProblem) {
      const draftKey = `peerprep_draft_${currentProblem.id}_${newLang}`;
      let targetCode = '';
      try {
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft && savedDraft.trim().length > 0) {
          targetCode = savedDraft;
          setAutosaveNotice('Draft Restored');
        }
      } catch (_) {}

      if (!targetCode) {
        targetCode = (currentProblem.starterCode && currentProblem.starterCode[newLang]) || 
          (currentProblem.starterCode && currentProblem.starterCode['javascript']) || '';
        setAutosaveNotice('Default Template');
      }

      setCode(targetCode);
      if (editorRef.current) {
        editorRef.current.setValue(targetCode);
      }
    }
    if (socketRef.current) {
      socketRef.current.emit('language-change', { roomId, language: newLang });
    }
  };

  const handleResetCode = () => {
    if (!currentProblem) return;
    const defaultStarter = (currentProblem.starterCode && currentProblem.starterCode[language]) ||
      (currentProblem.starterCode && currentProblem.starterCode['javascript']) || '';
    const draftKey = `peerprep_draft_${currentProblem.id}_${language}`;
    try {
      localStorage.removeItem(draftKey);
    } catch (_) {}
    setCode(defaultStarter);
    if (editorRef.current) {
      editorRef.current.setValue(defaultStarter);
    }
    setAutosaveNotice('Reset to Default');
  };

  const handleProblemChange = (newProbId) => {
    selectProblem(newProbId);
  };

  const handlePrevProblem = () => {
    const list = filteredProblems && filteredProblems.length > 0 ? filteredProblems : problems;
    const idx = list.findIndex(p => p.id === currentProblem?.id || p.slug === currentProblem?.slug);
    if (idx > 0) {
      selectProblem(list[idx - 1]);
    } else if (list.length > 0) {
      selectProblem(list[list.length - 1]);
    }
  };

  const handleNextProblem = () => {
    const list = filteredProblems && filteredProblems.length > 0 ? filteredProblems : problems;
    const idx = list.findIndex(p => p.id === currentProblem?.id || p.slug === currentProblem?.slug);
    if (idx >= 0 && idx < list.length - 1) {
      selectProblem(list[idx + 1]);
    } else if (list.length > 0) {
      selectProblem(list[0]);
    }
  };

  const handleSolveFromLeetCode = (problem) => {
    selectProblem(problem);
    setInRoom(true);
    setMainView('room');
  };

  const toggleTimer = () => {
    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);
    if (socketRef.current) {
      socketRef.current.emit('timer-toggle', { roomId, timerRunning: nextState, timerSeconds: timeLeft });
    }
  };

  const resetTimer = () => {
    const initialSeconds = 45 * 60;
    setTimeLeft(initialSeconds);
    setIsTimerRunning(false);
    if (socketRef.current) {
      socketRef.current.emit('timer-reset', { roomId, timerSeconds: initialSeconds });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      username,
      role,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (socketRef.current) {
      socketRef.current.emit('send-message', { roomId, message: newMsg });
    }
    setChatInput('');
  };

  // RUN: Executes visible sample test cases without confetti or marking solved
  const handleRunCode = async () => {
    if (!currentProblem || isRunning || isSubmitting) return;
    setIsRunning(true);
    setBottomTab('results');
    setIsConsoleExpanded(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/judge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: currentProblem.id,
          language,
          code,
          mode: 'run',
          customInput: selectedTestCaseIdx === -1 ? customInput : null
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOutput(data.rawOutput || '');
        setIsError(data.verdict !== 'Accepted');
        setExecutionTime(data.executionTimeMs);
        setTestResults(data.testResults || []);
        setJudgeVerdict(data.verdict || 'Finished');
        setRunCount(prev => prev + 1);

        if (socketRef.current) {
          socketRef.current.emit('code-executed', {
            roomId,
            output: data.rawOutput,
            isError: data.verdict !== 'Accepted',
            executionTimeMs: data.executionTimeMs
          });
        }
      } else {
        setOutput(data.error || 'Execution failed.');
        setIsError(true);
        setJudgeVerdict('Execution Error');
      }
    } catch (err) {
      setOutput('Failed to reach code execution engine: ' + err.message);
      setIsError(true);
      setJudgeVerdict('Connection Error');
    } finally {
      setIsRunning(false);
    }
  };

  // SUBMIT: Official Evaluation - Confetti & Solved status update ONLY on Accepted
  const handleSubmitCode = async () => {
    if (!currentProblem || isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setBottomTab('results');
    setIsConsoleExpanded(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/judge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: currentProblem.id,
          language,
          code,
          mode: 'submit'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOutput(data.rawOutput || '');
        setIsError(data.verdict !== 'Accepted');
        setExecutionTime(data.executionTimeMs);
        setTestResults(data.testResults || []);
        setJudgeVerdict(data.verdict);
        
        // Record into Submission History
        const newSub = {
          id: Date.now().toString(),
          problemId: currentProblem.id,
          language,
          verdict: data.verdict,
          executionTimeMs: data.executionTimeMs,
          passedTests: data.passedTests || 0,
          totalTests: data.totalTests || 0,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setSubmissionHistory(prev => [newSub, ...prev]);
        try {
          const histKey = `peerprep_history_${currentProblem.id}`;
          const existing = JSON.parse(localStorage.getItem(histKey) || '[]');
          localStorage.setItem(histKey, JSON.stringify([newSub, ...existing].slice(0, 30)));
        } catch (_) {}

        // ONLY trigger celebratory confetti on genuinely Accepted submission!
        if (data.verdict === 'Accepted') {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

          // Update user solved status in localStorage
          try {
            const stored = localStorage.getItem('peerprep_user_solved_status');
            const statusMap = stored ? JSON.parse(stored) : {};
            statusMap[currentProblem.id] = 'solved';
            localStorage.setItem('peerprep_user_solved_status', JSON.stringify(statusMap));

            // Update solved events for contribution heatmap
            const storedEv = localStorage.getItem('peerprep_user_solved_events');
            let events = storedEv ? JSON.parse(storedEv) : [];
            const today = new Date().toISOString().split('T')[0];
            if (!events.some(e => e.problemId === currentProblem.id && e.date === today)) {
              events.push({ problemId: currentProblem.id, date: today, timestamp: Date.now() });
              localStorage.setItem('peerprep_user_solved_events', JSON.stringify(events));
            }
          } catch (_) {}
        }
      } else {
        setOutput(data.error || 'Submission failed.');
        setIsError(true);
        setJudgeVerdict('Submission Failed');
      }
    } catch (err) {
      setOutput('Failed to reach judge engine: ' + err.message);
      setIsError(true);
      setJudgeVerdict('Connection Error');
    } finally {
      setIsSubmitting(false);
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
    if (currentProblem && currentProblem.solution) {
      const solCode = currentProblem.solution.code;
      setCode(solCode);
      if (editorRef.current) {
        editorRef.current.setValue(solCode);
      }
      setShowSolutionModal(false);
    }
  };

  const handleSimulatePayment = () => {
    setTimeout(() => {
      setIsPro(true);
      localStorage.setItem('peerprep_pro_member', 'true');
      setIsPricingOpen(false);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
    }, 1200);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleScorecardSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/api/evaluations`, {
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
    const total = Object.values(rubricScores).reduce((a, b) => a + b, 0);
    const report = `=====================================================
PEERPREP TECHNICAL INTERVIEW EVALUATION SCORECARD
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

  const filteredProblems = useMemo(() => {
    const source = allCatalogRef.current.length > 0 ? allCatalogRef.current : problems;
    if (selectedCompany === 'All Companies' || selectedCompany === 'All') {
      return source.slice(0, 300);
    }
    const targetComp = selectedCompany.toLowerCase().trim();
    const matches = source.filter(p => {
      if (!p.companies || !Array.isArray(p.companies)) return false;
      return p.companies.some(c => {
        const cLow = String(c).toLowerCase().trim();
        if (cLow === targetComp) return true;
        if (targetComp.includes('trilogy') && cLow.includes('trilogy')) return true;
        if (targetComp.includes('google') && cLow.includes('google')) return true;
        if (targetComp.includes('amazon') && cLow.includes('amazon')) return true;
        if (targetComp.includes('meta') && cLow.includes('meta')) return true;
        if (targetComp.includes('microsoft') && cLow.includes('microsoft')) return true;
        return false;
      });
    });
    return matches.length > 0 ? matches : source.slice(0, 100);
  }, [problems, selectedCompany]);

  // Full LeetCode Company Directory & Heatmap View
  if (mainView === 'leetcode') {
    return (
      <>
        <LeetCodePortal
          serverUrl={API_BASE_URL}
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
              className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-amber-500/20 transition cursor-pointer"
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
              Explore Question Bank →
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => setMainView('leetcode')}
            className="w-full mb-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Practice 470-Company LeetCode Questions →</span>
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
                placeholder="e.g. trilogy-mock-01"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('candidate')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                    role === 'candidate'
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setRole('interviewer')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                    role === 'interviewer'
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  Interviewer
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-indigo-600/30 transition text-sm cursor-pointer mt-2"
            >
              Enter Interview Workspace
            </button>
          </form>
        </div>
        {isPricingOpen && renderPricingModal()}
      </div>
    );
  }

  // 2. Main Live Collaborative Interview Room
  const filename = language === 'javascript' ? 'solution.js' : language === 'python' ? 'solution.py' : language === 'java' ? 'Solution.java' : 'solution.cpp';

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

          {/* Full LeetCode Portal Switcher */}
          <button
            onClick={() => setMainView('leetcode')}
            className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-semibold cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>470-Company LeetCode Bank</span>
          </button>

          {/* Room ID Badge & Copy */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md text-xs">
            <span className="text-slate-500">Room:</span>
            <span className="font-mono text-indigo-400 font-semibold">{roomId}</span>
            <button
              onClick={copyRoomId}
              title="Copy Room ID"
              className="ml-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
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
            onClick={toggleTimer}
            className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
          >
            {isTimerRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            title="Reset to 45 mins"
            className="text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Right Controls: Language, Run, Submit, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Subscription Button */}
          <button
            onClick={() => setIsPricingOpen(true)}
            className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold transition cursor-pointer ${
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
            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-medium cursor-pointer"
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
            <option value="java">Java (JDK)</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ (GCC)</option>
            <option value="javascript">JavaScript (Node.js)</option>
          </select>

          {/* Reset Code Button */}
          <button
            onClick={handleResetCode}
            title="Reset code to original starter template"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-md text-xs border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Run Code Button (Visible sample test cases) */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            title="Run visible test cases (Ctrl + Enter)"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold px-3 py-1 rounded-md text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
            <span className="text-[9px] text-slate-400 font-mono hidden md:inline">Ctrl+⏎</span>
          </button>

          {/* Submit Solution Button (Official Evaluation Suite) */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            title="Submit solution for official evaluation (Ctrl + Shift + Enter)"
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-3.5 py-1 rounded-md text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 fill-current" />
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="text-slate-400 hover:text-white p-1.5 rounded transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Leave Room Button */}
          <button
            onClick={() => setInRoom(false)}
            title="Exit Room"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Coding Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Problem Statement, Hints, Editorial (38% Width) */}
        <div className="w-[38%] border-r border-slate-800 bg-slate-900/60 flex flex-col overflow-y-auto">
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
                  onClick={() => setMainView('leetcode')}
                  title="Browse full 3,392 questions"
                  className="text-[10px] bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30 cursor-pointer"
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
                className="bg-slate-900 border border-slate-800 text-[11px] rounded px-2 py-0.5 text-slate-200 focus:outline-none max-w-[210px] truncate"
              >
                {filteredProblems.map(p => (
                  <option key={p.id || p.slug} value={p.id || p.slug}>{p.title}</option>
                ))}
              </select>
            </div>

            {/* Quick Prev / Next Question Navigation */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handlePrevProblem}
                title="Navigate to Previous Problem"
                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev Question</span>
              </button>

              <button
                type="button"
                onClick={handleNextProblem}
                title="Navigate to Next Problem"
                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center gap-1 transition cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {currentProblem && (
            <div className="p-4 space-y-4 text-sm">
              {/* Problem Title & Difficulty & Content Status Badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentProblem.url ? (
                    <a
                      href={currentProblem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-amber-400 tracking-tight transition inline-flex items-center gap-1.5 group/header"
                      title={`Open official "${currentProblem.title}" on LeetCode`}
                    >
                      <span>{currentProblem.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/header:text-amber-400 transition stroke-[2.5]" />
                    </a>
                  ) : (
                    <h2 className="text-base font-bold text-white tracking-tight">{currentProblem.title}</h2>
                  )}

                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                    currentProblem.difficulty === 'Hard'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : currentProblem.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                </div>

                {/* Content Provenance Badge */}
                {currentProblem.contentStatus === 'VERIFIED_EDITORIAL' ? (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Editorial</span>
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1" title="Proprietary full statement hosted directly on LeetCode">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>Attributed Summary</span>
                  </span>
                )}
              </div>

              {/* Company Tags, Category & Prominent Solve on LeetCode Button */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                    {currentProblem.company}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {currentProblem.category}
                  </span>
                </div>
                {currentProblem.url && (
                  <a
                    href={currentProblem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    title={`Solve "${currentProblem.title}" on LeetCode`}
                  >
                    <span>Solve on LeetCode</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                )}
              </div>

              {/* Navigation Tabs for Left Problem Panel */}
              <div className="flex items-center gap-1 border-b border-slate-800 pb-2 pt-1">
                <button
                  type="button"
                  onClick={() => setLeftPanelTab('statement')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    leftPanelTab === 'statement'
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Statement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftPanelTab('intelligence')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    leftPanelTab === 'intelligence'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interview Coach</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftPanelTab('editorial')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    leftPanelTab === 'editorial'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Complexity</span>
                </button>
              </div>

              {/* TAB 1: Statement */}
              {leftPanelTab === 'statement' && (
                <div className="space-y-4">
                  {/* Markdown Rendered Problem Description */}
                  <div className="pt-1">
                    <MarkdownRenderer content={currentProblem.description} />
                  </div>

                  {/* Input & Output Format */}
                  {(currentProblem.inputFormat || currentProblem.outputFormat) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      {currentProblem.inputFormat && (
                        <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold mb-1 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-indigo-400" /> Input Format
                          </div>
                          <div className="text-slate-300 text-[11px] font-mono">{currentProblem.inputFormat}</div>
                        </div>
                      )}
                      {currentProblem.outputFormat && (
                        <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-semibold mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Return Format
                          </div>
                          <div className="text-slate-300 text-[11px] font-mono">{currentProblem.outputFormat}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Examples */}
                  <div className="space-y-2.5 pt-1">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Examples ({currentProblem.examples?.length || 0}):</span>
                    </h3>
                    {currentProblem.examples?.map((ex, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800/90 rounded-xl p-3 space-y-1.5 text-xs font-mono shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-1 text-[11px]">
                          <span className="font-semibold text-slate-400 font-sans">Example {idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(ex.input)}
                            title="Copy input"
                            className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1 font-sans cursor-pointer transition"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                        </div>
                        <p className="text-slate-300"><strong className="text-indigo-400 font-semibold font-sans">Input: </strong>{ex.input}</p>
                        <p className="text-slate-300"><strong className="text-emerald-400 font-semibold font-sans">Output: </strong>{ex.output}</p>
                        {ex.explanation && (
                          <p className="text-slate-400 text-[11px] font-sans pt-0.5 border-t border-slate-900 leading-relaxed">
                            <strong className="text-slate-500 font-semibold">Explanation: </strong>{ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  {currentProblem.constraints && currentProblem.constraints.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Constraints:</span>
                      </h3>
                      <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3 space-y-1 text-xs font-mono text-slate-300">
                        {currentProblem.constraints.map((c, idx) => (
                          <p key={idx} className="flex items-center gap-2">
                            <span className="text-indigo-400">•</span>
                            <span>{c}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Interview Intelligence */}
              {leftPanelTab === 'intelligence' && (
                <div className="space-y-4 pt-1 font-sans">
                  {/* Provenance Header */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-slate-900 border border-amber-500/20 text-xs text-amber-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>PeerPrep Interview Intelligence</strong>: Structured technical coaching for live interview rounds.</span>
                  </div>

                  {/* Prerequisites */}
                  {currentProblem.interviewIntelligence?.prerequisites && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span>💡 Core Prerequisites:</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProblem.interviewIntelligence.prerequisites.map((req, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-indigo-300 font-mono">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brute-Force Thinking */}
                  {currentProblem.interviewIntelligence?.bruteForceThinking && (
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                        <span>🔨 Brute-Force Baseline:</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {currentProblem.interviewIntelligence.bruteForceThinking}
                      </p>
                    </div>
                  )}

                  {/* Pattern Recognition */}
                  {currentProblem.interviewIntelligence?.patternRecognition && (
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span>🎯 DSA Pattern Recognition:</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {currentProblem.interviewIntelligence.patternRecognition}
                      </p>
                    </div>
                  )}

                  {/* Progressive 3-Level Hints */}
                  {currentProblem.interviewIntelligence?.progressiveHints && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>🧠 3-Level Progressive Hints:</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                          <button
                            type="button"
                            onClick={() => toggleHint(1)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-indigo-300 flex items-center justify-between hover:bg-slate-900 transition cursor-pointer"
                          >
                            <span>Hint 1: Concept Intuition</span>
                            <span className="text-[10px] text-slate-500">{revealedHints[1] ? 'Hide' : 'Reveal'}</span>
                          </button>
                          {revealedHints[1] && (
                            <div className="px-3 pb-2.5 text-xs text-slate-300 border-t border-slate-900 pt-2 leading-relaxed">
                              {currentProblem.interviewIntelligence.progressiveHints.concept}
                            </div>
                          )}
                        </div>

                        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                          <button
                            type="button"
                            onClick={() => toggleHint(2)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-amber-300 flex items-center justify-between hover:bg-slate-900 transition cursor-pointer"
                          >
                            <span>Hint 2: Optimal Data Structure & Strategy</span>
                            <span className="text-[10px] text-slate-500">{revealedHints[2] ? 'Hide' : 'Reveal'}</span>
                          </button>
                          {revealedHints[2] && (
                            <div className="px-3 pb-2.5 text-xs text-slate-300 border-t border-slate-900 pt-2 leading-relaxed">
                              {currentProblem.interviewIntelligence.progressiveHints.approach}
                            </div>
                          )}
                        </div>

                        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
                          <button
                            type="button"
                            onClick={() => toggleHint(3)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-emerald-400 flex items-center justify-between hover:bg-slate-900 transition cursor-pointer"
                          >
                            <span>Hint 3: Step-by-Step Implementation</span>
                            <span className="text-[10px] text-slate-500">{revealedHints[3] ? 'Hide' : 'Reveal'}</span>
                          </button>
                          {revealedHints[3] && (
                            <div className="px-3 pb-2.5 text-xs text-slate-300 border-t border-slate-900 pt-2 leading-relaxed">
                              {currentProblem.interviewIntelligence.progressiveHints.algorithm}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interview Follow-Ups */}
                  {currentProblem.interviewIntelligence?.interviewFollowUps && (
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                        <span>🎙️ Live Interview Follow-Up Questions:</span>
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                        {currentProblem.interviewIntelligence.interviewFollowUps.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Complexity Coach */}
                  {currentProblem.interviewIntelligence?.complexityCoach && (
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                        <span>⚡ Complexity Coach:</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono py-1">
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Naive Bound:</span>
                          <span className="text-rose-400 font-bold">{currentProblem.interviewIntelligence.complexityCoach.naive}</span>
                        </div>
                        <div className="bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-slate-500 block text-[10px]">Optimal Target:</span>
                          <span className="text-emerald-400 font-bold">{currentProblem.interviewIntelligence.complexityCoach.optimal}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                        {currentProblem.interviewIntelligence.complexityCoach.guidance}
                      </p>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {currentProblem.interviewIntelligence?.commonMistakes && (
                    <div className="space-y-1.5 bg-slate-950 border border-slate-800/80 rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                        <span>⚠️ Common Traps & Edge Cases:</span>
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-slate-300">
                        {currentProblem.interviewIntelligence.commonMistakes.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fast Revision Card */}
                  {currentProblem.interviewIntelligence?.revisionCard && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950 border border-indigo-800/40 space-y-1">
                      <h4 className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                        <span>📑 Fast Revision Card:</span>
                      </h4>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed">
                        {currentProblem.interviewIntelligence.revisionCard}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Editorial & Complexity */}
              {leftPanelTab === 'editorial' && (
                <div className="space-y-4 pt-1 font-sans">
                  {currentProblem.solution ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Time Complexity</span>
                          <span className="text-emerald-400 font-bold text-sm">{currentProblem.solution.timeComplexity}</span>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase block font-semibold">Space Complexity</span>
                          <span className="text-indigo-400 font-bold text-sm">{currentProblem.solution.spaceComplexity}</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Core Strategy:</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{currentProblem.solution.explanation}</p>
                      </div>

                      {currentProblem.solution.code && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                            <span>Optimal Reference Implementation:</span>
                            <button
                              type="button"
                              onClick={copySolutionToEditor}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans cursor-pointer transition"
                            >
                              <Copy className="w-3 h-3" /> Load Into Editor
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                            <code>{currentProblem.solution.code}</code>
                          </pre>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                      <Sparkles className="w-6 h-6 text-amber-400 mx-auto" />
                      <p className="text-xs text-slate-300">
                        Official editorial and verified community discussions for <strong>{currentProblem.title}</strong> are hosted directly on LeetCode.
                      </p>
                      <a
                        href={currentProblem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-400 transition"
                      >
                        <span>Open LeetCode Editorial</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Area: Monaco Editor + Bottom Testcase & Online Judge Panel (62% Width) */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
          {/* Editor Header Bar with Tab & Status */}
          <div className="h-9 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 px-2.5 py-1 rounded text-slate-200 font-mono text-[11px] border border-slate-800 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {filename}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                ● {autosaveNotice}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {remoteCursor ? (
                <span className="text-[10px] flex items-center gap-1.5 text-indigo-300 bg-indigo-950/70 border border-indigo-500/40 px-2 py-0.5 rounded font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                  {remoteCursor.username} ({remoteCursor.role})
                </span>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono">Live Pair Sync Active</span>
              )}
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[220px]">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 13,
                fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 10 },
                wordWrap: 'on'
              }}
            />
          </div>

          {/* Bottom Test Cases & Online Judge Console Panel */}
          <div className={`border-t border-slate-800 bg-slate-950 flex flex-col transition-all duration-150 ${
            isConsoleExpanded ? 'h-64' : 'h-9'
          }`}>
            {/* Console Tab Header */}
            <div className="h-9 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => { setBottomTab('testcases'); setIsConsoleExpanded(true); }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    bottomTab === 'testcases' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Test Cases</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setBottomTab('results'); setIsConsoleExpanded(true); }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    bottomTab === 'results' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Test Results</span>
                  {judgeVerdict && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${
                      judgeVerdict === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {judgeVerdict}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setBottomTab('terminal'); setIsConsoleExpanded(true); }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    bottomTab === 'terminal' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Console Output</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setBottomTab('chat'); setIsConsoleExpanded(true); }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    bottomTab === 'chat' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Peer Chat</span>
                  {messages.length > 0 && (
                    <span className="text-[9px] bg-indigo-600/30 text-indigo-300 px-1 rounded-full font-mono">
                      {messages.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setBottomTab('editorial'); setIsConsoleExpanded(true); }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    bottomTab === 'editorial' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Complexity</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {executionTime && (
                  <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                    Latency: {executionTime}ms
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsConsoleExpanded(prev => !prev)}
                  title={isConsoleExpanded ? 'Collapse panel' : 'Expand panel'}
                  className="text-slate-400 hover:text-white p-1 rounded transition cursor-pointer"
                >
                  {isConsoleExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Console Tab Contents */}
            {isConsoleExpanded && (
              <div className="flex-1 overflow-y-auto p-3 text-xs font-mono text-slate-300">
                {/* 1. Test Cases Tab */}
                {bottomTab === 'testcases' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center gap-2 flex-wrap">
                      {(currentProblem?.testCases || currentProblem?.examples || []).map((tc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTestCaseIdx(idx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            selectedTestCaseIdx === idx
                              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-900'
                          }`}
                        >
                          Case {idx + 1}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedTestCaseIdx(-1)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                          selectedTestCaseIdx === -1
                            ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-900'
                        }`}
                      >
                        <Plus className="w-3 h-3" /> Custom Input
                      </button>
                    </div>

                    {selectedTestCaseIdx >= 0 ? (
                      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 space-y-2 text-xs font-mono">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-1">Input Parameters:</div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800/60 text-slate-200">
                            {(currentProblem?.testCases && currentProblem?.testCases[selectedTestCaseIdx]?.input) || 
                             (currentProblem?.examples && currentProblem?.examples[selectedTestCaseIdx]?.input) || 'sample input'}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-1">Expected Output:</div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800/60 text-emerald-400">
                            {(currentProblem?.testCases && currentProblem?.testCases[selectedTestCaseIdx]?.expectedOutput) || 
                             (currentProblem?.examples && currentProblem?.examples[selectedTestCaseIdx]?.output) || 'expected output'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-slate-400 font-semibold uppercase">Custom Test Input</label>
                        <textarea
                          value={customInput}
                          onChange={e => setCustomInput(e.target.value)}
                          placeholder="e.g. nums = [2, 7, 11, 15], target = 9"
                          className="w-full h-24 bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Submission History Tab */}
                {bottomTab === 'history' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Submission History for {currentProblem.title}
                      </span>
                      {submissionHistory.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setSubmissionHistory([]);
                            try { localStorage.removeItem(`peerprep_history_${currentProblem.id}`); } catch(_) {}
                          }}
                          className="text-[10px] text-slate-500 hover:text-rose-400 transition cursor-pointer"
                        >
                          Clear History
                        </button>
                      )}
                    </div>

                    {submissionHistory.length === 0 ? (
                      <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center text-slate-500 text-xs">
                        No submissions recorded for this question yet. Click "Submit" to run official evaluation.
                      </div>
                    ) : (
                      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden divide-y divide-slate-800/60 font-mono text-xs">
                        {submissionHistory.map((sub, sIdx) => (
                          <div key={sIdx} className="p-3 flex items-center justify-between gap-2 hover:bg-slate-900/60 transition">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                sub.verdict === 'Accepted'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}>
                                {sub.verdict}
                              </span>
                              <span className="text-slate-400 uppercase text-[10px] font-sans px-1.5 py-0.5 rounded bg-slate-800">
                                {sub.language}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                              {sub.executionTimeMs && <span>{sub.executionTimeMs}ms</span>}
                              <span>{sub.passedTests}/{sub.totalTests} passed</span>
                              <span className="text-slate-500 text-[10px] font-sans">{sub.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Test Results Tab */}
                {bottomTab === 'results' && (
                  <div className="space-y-3 font-sans">
                    {judgeVerdict ? (
                      <div className="space-y-3">
                        <div className={`p-3 rounded-xl border flex items-center justify-between ${
                          judgeVerdict === 'Accepted'
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                        }`}>
                          <div className="flex items-center gap-2">
                            {judgeVerdict === 'Accepted' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            )}
                            <div>
                              <div className="text-sm font-bold">{judgeVerdict}</div>
                              <div className="text-[11px] opacity-80 font-mono">
                                {judgeVerdict === 'Accepted' ? 'All test cases evaluated and verified.' : 'One or more cases produced mismatch or runtime error.'}
                              </div>
                            </div>
                          </div>
                          {executionTime && (
                            <div className="text-right font-mono text-xs">
                              <span className="opacity-75">Runtime:</span> <strong>{executionTime}ms</strong>
                            </div>
                          )}
                        </div>

                        {/* Test Cases Results List */}
                        {testResults.length > 0 && (
                          <div className="space-y-2">
                            {testResults.map((r, idx) => (
                              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 font-mono text-xs space-y-1">
                                <div className="flex items-center justify-between font-sans">
                                  <span className="font-semibold text-slate-300">Case {r.id || idx + 1}</span>
                                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                    r.status === 'Passed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                                  }`}>
                                    {r.status}
                                  </span>
                                </div>
                                <div className="text-slate-400"><strong className="text-slate-500 font-sans">Input: </strong>{r.input}</div>
                                <div className="text-slate-400"><strong className="text-slate-500 font-sans">Expected: </strong><span className="text-emerald-400">{r.expected}</span></div>
                                <div className="text-slate-400"><strong className="text-slate-500 font-sans">Output: </strong><span className={r.status === 'Passed' ? 'text-slate-200' : 'text-rose-400'}>{r.actual}</span></div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-slate-500 font-sans">
                        <Terminal className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                        <p className="text-xs">No execution results yet.</p>
                        <p className="text-[11px] text-slate-600 mt-1">Press <strong>Run</strong> (Ctrl+Enter) to evaluate sample test cases or <strong>Submit</strong> (Ctrl+Shift+Enter) for official evaluation.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Console Terminal Output Tab */}
                {bottomTab === 'terminal' && (
                  <pre className={`whitespace-pre-wrap font-mono text-xs leading-relaxed ${
                    isError ? 'text-rose-400' : 'text-slate-200'
                  }`}>
                    {output || 'No terminal output. Run code to view stdout/stderr output.'}
                  </pre>
                )}

                {/* 4. Live Peer Chat Tab */}
                {bottomTab === 'chat' && (
                  <div className="h-full flex flex-col font-sans">
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 pb-2">
                      {messages.length === 0 ? (
                        <p className="text-slate-500 text-center text-[11px] py-4">No chat messages yet. Pair with your peer here.</p>
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

                    <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-800 flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Type a message to peer..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-xs transition cursor-pointer"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}

                {/* 5. Editorial & Complexity Tab */}
                {bottomTab === 'editorial' && (
                  <div className="space-y-3 font-sans text-xs">
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-sans">Time Complexity</div>
                        <div className="text-sm font-bold text-emerald-400">{currentProblem?.solution?.timeComplexity || 'O(N)'}</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-sans">Space Complexity</div>
                        <div className="text-sm font-bold text-indigo-400">{currentProblem?.solution?.spaceComplexity || 'O(1)'}</div>
                      </div>
                    </div>
                    {currentProblem?.solution?.explanation && (
                      <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 leading-relaxed text-slate-300">
                        <strong className="text-slate-200 font-semibold block mb-1">Optimal Strategy:</strong>
                        {currentProblem.solution.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Solution Modal */}
      {showSolutionModal && renderSolutionModal()}

      {/* Rubric Scorecard Modal */}
      {isScorecardOpen && renderScorecardModal()}

      {/* Pricing Modal */}
      {isPricingOpen && renderPricingModal()}
    </div>
  );

  // Modal Render Helpers
  function renderSolutionModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Optimal Solution: {currentProblem.title}</span>
            </h3>
            <button
              onClick={() => setShowSolutionModal(false)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Time Complexity</span>
              <span className="text-emerald-400 font-bold">{currentProblem.solution?.timeComplexity}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Space Complexity</span>
              <span className="text-indigo-400 font-bold">{currentProblem.solution?.spaceComplexity}</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
            {currentProblem.solution?.explanation}
          </div>

          <div className="relative">
            <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-48">
              {currentProblem.solution?.code}
            </pre>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={() => setShowSolutionModal(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={copySolutionToEditor}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition cursor-pointer"
            >
              Load Solution into Editor
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderScorecardModal() {
    const total = Object.values(rubricScores).reduce((a, b) => a + b, 0);

    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Interviewer Evaluation Scorecard</span>
              </h3>
              <p className="text-xs text-slate-400">Structured evaluation framework</p>
            </div>
            <button
              onClick={() => setIsScorecardOpen(false)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleScorecardSubmit} className="space-y-3 text-xs">
            {Object.entries({
              approach: '1. Problem Formulation & Strategy',
              complexity: '2. Algorithmic Complexity (Big-O)',
              cleanliness: '3. Code Cleanliness & Edge Cases',
              communication: '4. Communication & Thought Articulation'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-300 font-medium">{label}</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(score => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setRubricScores(prev => ({ ...prev, [key]: score }))}
                      className={`w-6 h-6 rounded text-xs font-bold transition cursor-pointer ${
                        rubricScores[key] === score
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg font-bold">
              <span className="text-amber-300">Composite Score:</span>
              <span className="text-sm text-amber-300 font-mono">{total} / 20 ({Math.round((total / 20) * 100)}%)</span>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-semibold uppercase">Hiring Recommendation</label>
              <select
                value={recommendation}
                onChange={e => setRecommendation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              >
                <option value="Strong Hire">Strong Hire (Top 5%)</option>
                <option value="Hire">Hire (Meets Expectations)</option>
                <option value="Weak Hire">Weak Hire (Borderline)</option>
                <option value="No Hire">No Hire (Below Threshold)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-semibold uppercase">Evaluator Feedback</label>
              <textarea
                value={interviewerNotes}
                onChange={e => setInterviewerNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={exportScorecardText}
                className="text-slate-400 hover:text-white text-xs underline cursor-pointer"
              >
                Export Report (.txt)
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsScorecardOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow cursor-pointer"
                >
                  {scorecardSubmitted ? 'Submitted!' : 'Submit Evaluation'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function renderPricingModal() {
    const amount = selectedPlan.includes('29') ? '29' : '99';
    const upiLink = `upi://pay?pa=9730949538@axl&pn=Aman%20Gajbhiye&am=${amount}&cu=INR&tn=PeerPrep%20${encodeURIComponent(selectedPlan)}`;

    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-6 text-slate-200 my-auto">
          <button
            onClick={() => setIsPricingOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition cursor-pointer p-1"
          >
            ✕
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Unlock PeerPrep Placement Pass
              </h3>
              <p className="text-xs text-slate-400">Access Trilogy & 470 Company Questions</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { id: 'Single Mock Pass (₹29)', title: '1 Mock Interview', price: '₹29', desc: 'Valid for 24 hours' },
              { id: 'Full Placement Season Pass (₹99)', title: 'Season Pass', price: '₹99', desc: 'Unlimited Mock Interviews' }
            ].map(plan => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  selectedPlan === plan.id
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md ring-1 ring-amber-500/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">{plan.title}</span>
                    <span className="text-xs font-mono font-bold text-amber-400">{plan.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{plan.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
            <div className="w-32 h-32 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
              <img
                src="/upi_qr.png"
                alt="Scan to pay Aman Gajbhiye"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div class="text-[9px] text-slate-900 font-mono text-center font-bold">UPI: 9730949538@axl<br/>Aman Gajbhiye</div>';
                }}
              />
            </div>

            <div className="space-y-2 text-xs flex-1">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">UPI ID:</span>
                <div className="font-mono text-amber-300 font-bold flex items-center gap-1.5">
                  <span>9730949538@axl</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText('9730949538@axl')}
                    className="text-[10px] text-indigo-400 hover:text-indigo-200 underline cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Account Holder:</span>
                <div className="text-white font-medium">Aman Gajbhiye</div>
              </div>

              <div className="pt-1">
                <a
                  href={upiLink}
                  className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition shadow cursor-pointer"
                >
                  Pay via UPI App (₹{amount})
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulatePayment}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md cursor-pointer"
          >
            I Have Paid • Activate Pro Pass
          </button>
        </div>
      </div>
    );
  }
}
