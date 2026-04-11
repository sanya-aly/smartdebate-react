// ============================================
// LAB 07 - React useState Hook
// VoteCounter.jsx
// Project-Relevant Counter App for SmartDebate
// Features: Increment, Decrement, Reset
// ============================================

import { useState } from "react";

const VoteCounter = () => {
  // ============================================
  // useState Hook - Lab 07 Main Requirement
  // ============================================
  const [forVotes, setForVotes] = useState(0);      // "For" votes counter
  const [againstVotes, setAgainstVotes] = useState(0); // "Against" votes counter
  const [topic, setTopic] = useState("Is AI a Threat to Humanity?"); // current debate topic

  // Total votes - derived from state
  const totalVotes = forVotes + againstVotes;

  // For percentage
  const forPercent = totalVotes === 0 ? 50 : Math.round((forVotes / totalVotes) * 100);
  // Against percentage
  const againstPercent = totalVotes === 0 ? 50 : 100 - forPercent;

  // ============================================
  // INCREMENT - Add vote
  // ============================================
  const incrementFor = () => setForVotes(forVotes + 1);
  const incrementAgainst = () => setAgainstVotes(againstVotes + 1);

  // ============================================
  // DECREMENT - Remove vote (min 0)
  // ============================================
  const decrementFor = () => {
    if (forVotes > 0) setForVotes(forVotes - 1);
  };
  const decrementAgainst = () => {
    if (againstVotes > 0) setAgainstVotes(againstVotes - 1);
  };

  // ============================================
  // RESET - Reset all counters to 0
  // ============================================
  const resetAll = () => {
    setForVotes(0);
    setAgainstVotes(againstVotes => 0);
    setAgainstVotes(0);
  };

  // Who is winning?
  const getWinner = () => {
    if (totalVotes === 0) return { text: "No votes yet", color: "text-slate-400" };
    if (forVotes > againstVotes) return { text: "🏆 FOR is winning!", color: "text-green-400" };
    if (againstVotes > forVotes) return { text: "🏆 AGAINST is winning!", color: "text-red-400" };
    return { text: "🤝 It's a TIE!", color: "text-yellow-400" };
  };

  const winner = getWinner();

  const topics = [
    "Is AI a Threat to Humanity?",
    "Climate Change Solutions",
    "Online vs Traditional Learning",
    "Cryptocurrency Future",
    "Pakistan's Economic Future",
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="glass rounded-2xl p-8 border border-purple-500/20 fade-in">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <i className="fas fa-vote-yea text-3xl gradient-text float-anim"></i>
            <h2 className="text-2xl font-bold gradient-text">
              Live Debate Vote Counter
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            Lab 07 — React useState Hook | Cast your vote on the debate below
          </p>
        </div>

        {/* Topic Selector */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-slate-300">
            <i className="fas fa-comments mr-2 text-cyan-400"></i>
            Select Debate Topic:
          </label>
          <select
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setForVotes(0);
              setAgainstVotes(0);
            }}
            className="w-full px-4 py-3 rounded-xl font-semibold"
          >
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Current Topic Display */}
        <div className="glass rounded-xl p-4 border border-cyan-500/20 text-center mb-8">
          <p className="text-xs text-slate-400 mb-1">Current Debate Topic:</p>
          <p className="font-bold text-lg text-cyan-300">"{topic}"</p>
        </div>

        {/* Vote Counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* FOR Counter */}
          <div className="glass rounded-2xl p-6 border border-green-500/30 text-center card-hover">
            <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-thumbs-up text-green-400 text-xl"></i>
            </div>
            <h3 className="font-bold text-lg text-green-400 mb-1">FOR</h3>
            <p className="text-slate-400 text-xs mb-4">Support this debate position</p>

            {/* Counter Display */}
            <div className="text-6xl font-bold gradient-text mb-4 transition-all duration-300">
              {forVotes}
            </div>

            <p className="text-slate-400 text-sm mb-5">{forPercent}% of total votes</p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={decrementFor}
                disabled={forVotes === 0}
                className={`w-12 h-12 rounded-full font-bold text-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                  forVotes === 0
                    ? "bg-slate-700/50 text-slate-600 cursor-not-allowed"
                    : "bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30"
                }`}
              >
                −
              </button>
              <button
                onClick={incrementFor}
                className="w-12 h-12 rounded-full btn-gradient text-white font-bold text-xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                +
              </button>
            </div>
          </div>

          {/* AGAINST Counter */}
          <div className="glass rounded-2xl p-6 border border-red-500/30 text-center card-hover">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-thumbs-down text-red-400 text-xl"></i>
            </div>
            <h3 className="font-bold text-lg text-red-400 mb-1">AGAINST</h3>
            <p className="text-slate-400 text-xs mb-4">Oppose this debate position</p>

            {/* Counter Display */}
            <div className="text-6xl font-bold text-red-400 mb-4 transition-all duration-300">
              {againstVotes}
            </div>

            <p className="text-slate-400 text-sm mb-5">{againstPercent}% of total votes</p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={decrementAgainst}
                disabled={againstVotes === 0}
                className={`w-12 h-12 rounded-full font-bold text-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                  againstVotes === 0
                    ? "bg-slate-700/50 text-slate-600 cursor-not-allowed"
                    : "bg-red-600/20 text-red-400 hover:bg-red-600/40 border border-red-500/30"
                }`}
              >
                −
              </button>
              <button
                onClick={incrementAgainst}
                className="w-12 h-12 rounded-full bg-red-600 text-white font-bold text-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-red-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span className="text-green-400 font-semibold">FOR {forPercent}%</span>
            <span className="text-red-400 font-semibold">AGAINST {againstPercent}%</span>
          </div>
          <div className="w-full h-4 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${forPercent}%`,
                background: "linear-gradient(135deg, #6C5CE7 0%, #00C2FF 100%)",
              }}
            ></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6 stagger-children">
          <div className="glass rounded-xl p-3 text-center border border-purple-500/20 scale-in">
            <p className="text-2xl font-bold gradient-text">{totalVotes}</p>
            <p className="text-xs text-slate-400">Total Votes</p>
          </div>
          <div className="glass rounded-xl p-3 text-center border border-green-500/20 scale-in">
            <p className="text-2xl font-bold text-green-400">{forVotes}</p>
            <p className="text-xs text-slate-400">For Votes</p>
          </div>
          <div className="glass rounded-xl p-3 text-center border border-red-500/20 scale-in">
            <p className="text-2xl font-bold text-red-400">{againstVotes}</p>
            <p className="text-xs text-slate-400">Against Votes</p>
          </div>
        </div>

        {/* Winner Banner */}
        <div className="glass rounded-xl p-4 text-center border border-yellow-500/20 mb-6">
          <p className={`font-bold text-lg ${winner.color}`}>{winner.text}</p>
          {totalVotes > 0 && (
            <p className="text-slate-400 text-xs mt-1">Based on {totalVotes} total votes</p>
          )}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetAll}
          className="w-full py-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300 font-semibold hover:scale-[1.02] active:scale-[0.98]"
        >
          <i className="fas fa-rotate-left mr-2"></i>Reset All Votes
        </button>

        {/* Lab Info */}
        <div className="mt-6 p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 text-center">
          <p className="text-xs text-slate-400">
            <i className="fas fa-code mr-1 text-purple-400"></i>
            Lab 07 | useState Hook used: <span className="text-cyan-400">forVotes</span>,{" "}
            <span className="text-cyan-400">againstVotes</span>,{" "}
            <span className="text-cyan-400">topic</span> |
            Actions: <span className="text-green-400">Increment</span>,{" "}
            <span className="text-yellow-400">Decrement</span>,{" "}
            <span className="text-red-400">Reset</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default VoteCounter;
