// ============================================
// SMARTDEBATE - DEBATES LIST PAGE
// src/components/pages/DebatesListPage.jsx
// READ ALL - Fetch all debates from Firestore
// ============================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllDebates, deleteDebate } from "../../firebase/firestoreService";
import { formatTopic, shortTitle, formatId, getFirstName } from "./HomePage";

const DebatesListPage = () => {
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  // ============================================
  // FETCH ALL DEBATES FROM FIRESTORE
  // ============================================
  const fetchDebates = async () => {
    try {
      setLoading(true);
      const data = await getAllDebates();
      setDebates(data);
    } catch (err) {
      setError("Failed to load debates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebates();
  }, []);

  // ============================================
  // DELETE DEBATE
  // ============================================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this debate?")) return;
    try {
      await deleteDebate(id);
      setDebates((prev) => prev.filter((d) => d.id !== id));
      alert("✅ Debate deleted successfully!");
    } catch {
      alert("❌ Failed to delete debate.");
    }
  };

  // ============================================
  // FILTER & SEARCH (Client side)
  // ============================================
  const filtered = debates
    .filter((d) => {
      const matchSearch =
        !searchTerm ||
        d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTopic = !filterTopic || d.topic === filterTopic;
      const matchStatus = !filterStatus || d.status === filterStatus;
      return matchSearch && matchTopic && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "date") return new Date(b.date || 0) - new Date(a.date || 0);
      if (sortBy === "participants") return (b.participants || 0) - (a.participants || 0);
      return 0;
    });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg">Loading debates...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-8 text-center border border-red-500/30 max-w-md">
        <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4 block"></i>
        <p className="text-red-400 text-lg font-semibold">{error}</p>
        <button onClick={fetchDebates} className="btn-gradient px-6 py-2 rounded-xl text-white font-semibold mt-4">
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">🗣️ All Debates</h1>
          <p className="text-slate-400 mt-1">{filtered.length} debates found</p>
        </div>
        <Link
          to="/create"
          className="btn-gradient px-6 py-3 rounded-xl text-white font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <i className="fas fa-plus"></i> Add New Debate
        </Link>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-5 border border-purple-500/20 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="🔍 Search debates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm"
          />
          <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm">
            <option value="">All Topics</option>
            {["Technology","Climate","Sports","Education","Politics","Finance","Health"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm">
            <option value="">Sort By</option>
            <option value="rating">⭐ Top Rated</option>
            <option value="date">📅 Latest</option>
            <option value="participants">👥 Most Participants</option>
          </select>
        </div>
        <button
          onClick={() => { setSearchTerm(""); setFilterTopic(""); setFilterStatus(""); setSortBy(""); }}
          className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          <i className="fas fa-times mr-1"></i>Reset Filters
        </button>
      </div>

      {/* Debates Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <i className="fas fa-search text-5xl text-slate-600 mb-4 block"></i>
          <p className="text-slate-400 text-xl font-semibold">No debates found!</p>
          <p className="text-slate-500 text-sm mt-2">Try different filters or add a new debate.</p>
          <Link to="/create" className="btn-gradient px-6 py-2 rounded-xl text-white font-semibold mt-4 inline-block">
            Add Debate
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((debate) => (
            <div key={debate.id} className="glass rounded-xl p-6 border border-purple-500/20 card-hover relative overflow-hidden group">

              {/* Trending badge */}
              {debate.trending && (
                <div className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom left, #f97316, transparent)" }}></div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-xs text-slate-500 mb-1">#{String(debate.id).slice(0,6)}</p>
                  <h3 className="font-bold text-base text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors">
                    {debate.title?.length > 40 ? debate.title.slice(0, 40) + "..." : debate.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-600/20 text-purple-400 rounded-full">
                      {debate.topic?.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      debate.difficulty === "Beginner" ? "bg-green-600/20 text-green-400" :
                      debate.difficulty === "Advanced" ? "bg-red-600/20 text-red-400" :
                      "bg-blue-600/20 text-blue-400"
                    }`}>{debate.difficulty}</span>
                    {debate.trending && (
                      <span className="text-xs px-2 py-0.5 bg-orange-600/30 text-orange-400 rounded-full animate-pulse">🔥</span>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ml-2 ${
                  debate.status === "Active"
                    ? "bg-green-600/20 text-green-400 border border-green-500/30"
                    : "bg-red-600/20 text-red-400 border border-red-500/30"
                }`}>{debate.status}</span>
              </div>

              <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">{debate.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-700/50">
                <div className="flex items-center gap-1"><i className="fas fa-user text-cyan-400"></i>{debate.author?.split(" ")[0]}</div>
                <div className="flex items-center gap-1"><i className="fas fa-calendar text-cyan-400"></i>{debate.date}</div>
                <div className="flex items-center gap-1"><i className="fas fa-users text-cyan-400"></i>{debate.participants} people</div>
                <div className="flex items-center gap-1"><i className="fas fa-star text-yellow-400"></i>{debate.rating}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  to={`/debates/${debate.id}`}
                  className="flex-1 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-center"
                >
                  <i className="fas fa-eye mr-1"></i>View
                </Link>
                <Link
                  to={`/edit/${debate.id}`}
                  className="flex-1 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-center"
                >
                  <i className="fas fa-edit mr-1"></i>Edit
                </Link>
                <button
                  onClick={() => handleDelete(debate.id)}
                  className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600/40 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                >
                  <i className="fas fa-trash mr-1"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebatesListPage;