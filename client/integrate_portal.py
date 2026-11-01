import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if 'LeetCodePortal' not in content:
    content = content.replace(
        "import confetti from 'canvas-confetti';",
        "import confetti from 'canvas-confetti';\nimport { LeetCodePortal } from './LeetCodePortal';"
    )

# 2. Add mainView state
if 'mainView' not in content:
    content = content.replace(
        "  const [inRoom, setInRoom] = useState(false);",
        "  const [inRoom, setInRoom] = useState(false);\n  const [mainView, setMainView] = useState('lobby'); // 'lobby' | 'leetcode' | 'room'"
    )

# 3. Add handleSolveFromLeetCode
solve_func = """
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
"""
if 'handleSolveFromLeetCode' not in content:
    content = content.replace(
        "  // Load Problem directly from 3,392 Company Catalog into Monaco Live Room",
        solve_func + "\n  // Load Problem directly from 3,392 Company Catalog into Monaco Live Room"
    )

# 4. Add leetcode view condition
leetcode_view = """
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
"""

if "mainView === 'leetcode'" not in content:
    content = content.replace(
        "  // 1. Lobby Screen (Join Room)",
        leetcode_view + "\n  // 1. Lobby Screen (Join Room)"
    )

# 5. Connect Explore buttons to setMainView('leetcode')
content = content.replace(
    'onClick={() => setIsCatalogOpen(true)}\n              className="text-[10px] font-bold text-indigo-300 bg-indigo-600/30 hover:bg-indigo-600/50 px-2 py-1 rounded border border-indigo-500/40 transition"\n            >\n              Explore Bank →',
    """onClick={() => setMainView('leetcode')}
              className="text-[10px] font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/40 px-2 py-1 rounded border border-amber-500/40 transition cursor-pointer"
            >
              Explore Bank & Heatmap →"""
)

# 6. Add prominent LeetCode button in lobby
lobby_button = """
          <button
            type="button"
            onClick={() => setMainView('leetcode')}
            className="w-full mb-3 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Practice 470-Company LeetCode Questions & Heatmap →</span>
          </button>
"""
if 'Practice 470-Company LeetCode Questions' not in content:
    content = content.replace(
        '<form onSubmit={() => setInRoom(true)} className="space-y-4">',
        lobby_button + '\n          <form onSubmit={() => { setInRoom(true); setMainView("room"); }} className="space-y-4">'
    )

# 7. Add Header button in Live Room
header_button = """
          {/* Full LeetCode Portal & Heatmap Switcher */}
          <button
            onClick={() => setMainView('leetcode')}
            className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition font-semibold cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>LeetCode Hub & Heatmap</span>
          </button>
"""
if 'LeetCode Hub & Heatmap' not in content:
    content = content.replace(
        '          {/* 470-Company Explorer Button */}',
        header_button + '\n          {/* 470-Company Explorer Button */}'
    )

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('App.jsx successfully integrated with LeetCodePortal!')
