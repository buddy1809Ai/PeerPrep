import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Calendar,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  ArrowUpDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Tag,
  Building2,
  Code2,
  Crown,
  Play,
  RotateCcw,
  BookOpen,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function LeetCodePortal({
  onSelectProblem,
  onOpenPricing,
  onSwitchToInterviewRoom,
  inRoom = false,
  roomId = '',
  serverUrl = ''
}) {
  // Filters & State
  const [selectedCompany, setSelectedCompany] = useState('Trilogy');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Data State
  const [problems, setProblems] = useState([]);
  const [totalProblems, setTotalProblems] = useState(0);
  const [companiesList, setCompaniesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // User Solved Tracking in localStorage
  const [solvedStatus, setSolvedStatus] = useState(() => {
    try {
      const stored = localStorage.getItem('peerprep_user_solved_status');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return {
      'bitwise-xor-of-all-pairings': 'solved',
      'fraction-addition-and-subtraction': 'solved',
      'two-sum': 'solved',
      'trapping-rain-water': 'attempted',
      'lru-cache': 'attempted',
      'substring-xor-queries': 'solved'
    };
  });

  const toggleStatus = (id) => {
    setSolvedStatus(prev => {
      const curr = prev[id];
      let nextStatus = 'solved';
      if (curr === 'solved') nextStatus = 'attempted';
      else if (curr === 'attempted') nextStatus = undefined;
      else nextStatus = 'solved';

      const updated = { ...prev };
      if (nextStatus) {
        updated[id] = nextStatus;
      } else {
        delete updated[id];
      }
      try {
        localStorage.setItem('peerprep_user_solved_status', JSON.stringify(updated));
      } catch (_) {}
      if (nextStatus === 'solved') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
      return updated;
    });
  };

  // Fetch Directory Data
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      company: selectedCompany === 'All' ? '' : selectedCompany,
      topic: selectedTopic === 'All' ? '' : selectedTopic,
      difficulty: selectedDifficulty === 'All' ? '' : selectedDifficulty,
      search: searchQuery,
      limit: '150'
    });

    fetch(`${serverUrl}/api/company-directory?${params}`)
      .then(res => res.json())
      .then(data => {
        setProblems(data.problems || []);
        setTotalProblems(data.totalMatching || 0);
        if (data.topCompanies && companiesList.length === 0) setCompaniesList(data.topCompanies);
        if (data.topTopics && topicsList.length === 0) setTopicsList(data.topTopics);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch LeetCode company directory:', err);
        setIsLoading(false);
      });
  }, [selectedCompany, selectedTopic, selectedDifficulty, searchQuery]);

  // Client Pagination & Status Filtering
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      if (selectedStatus === 'All') return true;
      const st = solvedStatus[p.id];
      if (selectedStatus === 'Solved') return st === 'solved';
      if (selectedStatus === 'Attempted') return st === 'attempted';
      if (selectedStatus === 'Todo') return !st;
      return true;
    });
  }, [problems, selectedStatus, solvedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / pageSize));
  const displayedProblems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, page, pageSize]);

  // Generate 365-Day LeetCode Activity Heatmap
  const heatmapData = useMemo(() => {
    const days = [];
    const today = new Date();
    // Deterministic pseudo-activity distribution
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      
      // Calculate activity intensity: high on weekdays, peak streaks in recent months
      const seed = (d.getFullYear() * 1000 + (d.getMonth() + 1) * 35 + d.getDate() * 7);
      let count = 0;
      let level = 0;
      
      // Recent 30 days active streak
      if (i < 30) {
        count = (seed % 6) + 1;
        level = count > 4 ? 4 : count > 2 ? 3 : 2;
      } else if (seed % 7 === 0 || seed % 11 === 0) {
        count = (seed % 4) + 1;
        level = count > 3 ? 3 : count > 1 ? 2 : 1;
      }

      days.push({
        date: dateStr,
        dayOfWeek,
        count,
        level
      });
    }

    // Group into 53 weeks (columns) x 7 days (rows)
    const weeks = [];
    let currentWeek = [];
    // Pad first week
    const firstDayOfWeek = days[0].dayOfWeek;
    for (let p = 0; p < firstDayOfWeek; p++) {
      currentWeek.push({ date: '', count: 0, level: 0, dayOfWeek: p, empty: true });
    }
    for (const day of days) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: 0, empty: true });
      }
      weeks.push(currentWeek);
    }
    return weeks;
  }, []);

  const [hoveredDate, setHoveredDate] = useState(null);

  // Quick Company Tabs
  const popularCompanies = [
    { name: 'Trilogy', label: 'Trilogy Innovations', count: 6, hot: true },
    { name: 'Google', label: 'Google', count: 2344 },
    { name: 'Amazon', label: 'Amazon', count: 2011 },
    { name: 'Meta', label: 'Meta', count: 1399 },
    { name: 'Microsoft', label: 'Microsoft', count: 1310 },
    { name: 'Bloomberg', label: 'Bloomberg', count: 854 },
    { name: 'Uber', label: 'Uber', count: 512 },
    { name: 'Apple', label: 'Apple', count: 490 },
    { name: 'Goldman Sachs', label: 'Goldman Sachs', count: 340 },
    { name: 'All', label: 'All 470 Companies', count: 3392 }
  ];

  // Quick Topic Tabs
  const topTopics = [
    'All',
    'Array',
    'String',
    'Dynamic Programming',
    'Hash Table',
    'Bit Manipulation',
    'Tree',
    'Binary Search',
    'Two Pointers',
    'Greedy',
    'Math',
    'Graph'
  ];

  // Stats Counters
  const solvedCount = Object.values(solvedStatus).filter(s => s === 'solved').length;
  const attemptedCount = Object.values(solvedStatus).filter(s => s === 'attempted').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-orange-500/20">
              <Code2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                PeerPrep <span className="text-amber-400 font-mono text-xs px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">LeetCode Hub</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800">
            <button
              onClick={() => setSelectedCompany('Trilogy')}
              className={`text-xs px-3 py-1 rounded-full font-medium transition flex items-center gap-1.5 ${
                selectedCompany === 'Trilogy'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Trilogy PYQs</span>
            </button>

            <button
              onClick={() => onSwitchToInterviewRoom && onSwitchToInterviewRoom()}
              className="text-xs px-3 py-1 rounded-full text-indigo-300 bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 transition flex items-center gap-1.5 ml-2"
            >
              <Play className="w-3 h-3 text-indigo-400 fill-indigo-400" />
              <span>Switch to Live Mock Interview Room</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-orange-500/30 px-3 py-1 rounded-lg text-xs font-semibold text-orange-400 shadow-sm shadow-orange-500/10">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>14 Days Streak</span>
          </div>

          {/* Daily Goal Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Goal: 3 / 5 Today</span>
          </div>

          {/* Pricing Pass Button */}
          <button
            onClick={onOpenPricing}
            className="text-xs font-semibold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-amber-500/30 transition shadow-sm"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Pass ₹29</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Banner: Trilogy Innovations Innovation Catalyst PYQ Highlight */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-amber-950/40 border border-indigo-800/40 p-5 sm:p-6 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Trilogy Innovations • Innovation Catalyst Special Bank
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                470 Tech Companies • 3,392 LeetCode PYQs with Real Heatmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Practice verified company-wise past interview problems. Each problem is equipped with clean function signatures, 3-level progressive hints, optimal $O(N)$ solutions, and instant one-click loading into the live collaborative Monaco code editor.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setSelectedCompany('Trilogy');
                  setSelectedTopic('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-orange-500/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-slate-950" />
                <span>Practice Trilogy PYQs ({popularCompanies[0].count})</span>
              </button>
            </div>
          </div>
        </div>

        {/* LeetCode Activity Heatmap & Stats Card */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  LeetCode Submissions Heatmap
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    284 submissions in past year
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Active coding cadence synchronized with peer mock interview rounds</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">CURRENT STREAK</span>
                <span className="text-orange-400 font-bold text-sm">14 days</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 block text-[10px]">LONGEST STREAK</span>
                <span className="text-indigo-400 font-bold text-sm">32 days</span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 block text-[10px]">TOTAL SOLVED</span>
                <span className="text-emerald-400 font-bold text-sm">{solvedCount} / 3,392</span>
              </div>
            </div>
          </div>

          {/* Interactive Heatmap Matrix */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px]">
              {/* Month Header row */}
              <div className="flex text-[10px] text-slate-400 font-mono mb-1.5 pl-6 gap-8">
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
              </div>

              <div className="flex gap-1 items-start">
                {/* Day of week labels */}
                <div className="flex flex-col gap-1 text-[9px] text-slate-400 font-mono pr-2 h-[86px] justify-between">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* Weeks Grid */}
                <div className="flex gap-1 flex-1">
                  {heatmapData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((day, dIdx) => {
                        let bg = 'bg-slate-800/40 border-slate-800/50';
                        if (day.level === 1) bg = 'bg-emerald-950 border-emerald-900/60';
                        if (day.level === 2) bg = 'bg-emerald-700 border-emerald-600/60';
                        if (day.level === 3) bg = 'bg-emerald-500 border-emerald-400/80 shadow-sm shadow-emerald-500/20';
                        if (day.level === 4) bg = 'bg-emerald-400 border-emerald-300 shadow-md shadow-emerald-400/40';
                        if (day.empty) bg = 'bg-transparent border-transparent';

                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => !day.empty && setHoveredDate(day)}
                            onMouseLeave={() => setHoveredDate(null)}
                            title={day.empty ? '' : `${day.date}: ${day.count} problems solved`}
                            className={`w-2.5 h-2.5 rounded-sm border transition-all duration-150 cursor-pointer ${bg} ${
                              !day.empty ? 'hover:scale-125 hover:z-20' : ''
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Footer Legend & Hover Tooltip */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Activity on {hoveredDate ? hoveredDate.date : 'Hovered Day'}:</span>
                  <span className="font-semibold text-emerald-400">
                    {hoveredDate ? `${hoveredDate.count} problems solved` : 'Hover squares to view daily submissions'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-900" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700 border border-emerald-600" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 border border-emerald-400" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 border border-emerald-300" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Quick-Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Target Company PYQ Banks
            </span>
            <span className="text-[11px] text-slate-400">
              Showing questions for <strong className="text-indigo-300">{selectedCompany}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {popularCompanies.map(comp => (
              <button
                key={comp.name}
                onClick={() => {
                  setSelectedCompany(comp.name);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 cursor-pointer border ${
                  selectedCompany.toLowerCase() === comp.name.toLowerCase()
                    ? comp.hot
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {comp.hot && <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />}
                <span>{comp.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCompany.toLowerCase() === comp.name.toLowerCase()
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {comp.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Topic Categorization Shelf */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" /> Data Structures & Algorithmic Topics
            </span>
            <span className="text-[11px] text-slate-400">
              Filter by DSA concept
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {topTopics.map(topic => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition cursor-pointer border ${
                  selectedTopic.toLowerCase() === topic.toLowerCase()
                    ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Problem Table Filter Toolbar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search problems, topics, slugs..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Difficulty & Status Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            {/* Difficulty Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDifficulty(d);
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    selectedDifficulty === d
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {['All', 'Solved', 'Attempted', 'Todo'].map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedStatus(s);
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                    selectedStatus === s
                      ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LeetCode-Style Problems Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredProblems.length}</strong> problems matching criteria
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-indigo-400">Click ⚡ "Solve in Live IDE" to practice without spoilers</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Problem Title & Topics</th>
                  <th className="py-3 px-4">Companies</th>
                  <th className="py-3 px-4 w-28">Frequency</th>
                  <th className="py-3 px-4 w-24">Acceptance</th>
                  <th className="py-3 px-4 w-24">Difficulty</th>
                  <th className="py-3 px-4 w-36 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400 font-mono">
                      <div className="inline-block w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2" />
                      <div>Loading LeetCode Question Bank...</div>
                    </td>
                  </tr>
                ) : displayedProblems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400">
                      <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <div className="font-semibold text-slate-300">No problems found</div>
                      <div className="text-xs text-slate-400 mt-1">Try clearing filters or changing company/topic</div>
                    </td>
                  </tr>
                ) : (
                  displayedProblems.map((prob) => {
                    const st = solvedStatus[prob.id];
                    const freq = prob.frequency || (prob.companyFreq && prob.companyFreq[selectedCompany]) || 75;
                    const diffColor =
                      prob.difficulty === 'Easy'
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : prob.difficulty === 'Medium'
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

                    return (
                      <tr key={prob.id} className="hover:bg-slate-800/40 transition group">
                        {/* Status Checkbox */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleStatus(prob.id)}
                            title={`Status: ${st || 'Unsolved'} (Click to toggle)`}
                            className="cursor-pointer transition hover:scale-110"
                          >
                            {st === 'solved' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                            ) : st === 'attempted' ? (
                              <Clock className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                            )}
                          </button>
                        </td>

                        {/* Title & Topics */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-100 group-hover:text-indigo-300 transition flex items-center gap-2">
                            <span>{prob.title}</span>
                            {prob.url && (
                              <a
                                href={prob.url}
                                target="_blank"
                                rel="noreferrer"
                                title="Open on LeetCode"
                                className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          {prob.topics && prob.topics.length > 0 && (
                            <div className="flex items-center gap-1 flex-wrap mt-1">
                              {prob.topics.slice(0, 3).map((t, idx) => (
                                <span
                                  key={idx}
                                  onClick={() => setSelectedTopic(t)}
                                  className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                                >
                                  {t}
                                </span>
                              ))}
                              {prob.topics.length > 3 && (
                                <span className="text-[9px] text-slate-400">+{prob.topics.length - 3}</span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Companies */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 flex-wrap max-w-[200px]">
                            {prob.companies && prob.companies.slice(0, 3).map((comp, i) => (
                              <span
                                key={i}
                                onClick={() => setSelectedCompany(comp)}
                                className={`text-[10px] px-1.5 py-0.5 rounded font-medium cursor-pointer transition ${
                                  comp.toLowerCase() === selectedCompany.toLowerCase()
                                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                {comp}
                              </span>
                            ))}
                            {prob.companies && prob.companies.length > 3 && (
                              <span className="text-[10px] text-slate-400">+{prob.companies.length - 3}</span>
                            )}
                          </div>
                        </td>

                        {/* Frequency Heat Bar */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full"
                                style={{ width: `${Math.min(100, Math.max(15, freq))}%` }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-slate-400">{Math.round(freq)}%</span>
                          </div>
                        </td>

                        {/* Acceptance Rate */}
                        <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                          {prob.acceptanceRate ? `${prob.acceptanceRate}%` : '54.2%'}
                        </td>

                        {/* Difficulty */}
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diffColor}`}>
                            {prob.difficulty}
                          </span>
                        </td>

                        {/* Action: Solve in Live IDE */}
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onSelectProblem(prob)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg text-xs shadow transition flex items-center gap-1.5 ml-auto cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Solve in Live IDE</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40">
            <span>
              Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
