// ============================================
// SMARTDEBATE - DEBATE DETAIL PAGE
// src/components/pages/DebateDetailPage.jsx
// READ ONE - Dynamic Route /debates/:id
// ============================================

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDebateById, deleteDebate } from "../../firebase/firestoreService";

const DebateDetailPage = () => {
  const { id } = useParams(); // Dynamic route parameter
  const navigate = useNavigate();
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // FETCH SINGLE DEBATE BY ID (Dynamic Route)
  // ============================================
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        setLoading(true);
        const data = await getDebateById(id);
        if (!data) {
          setError("Debate not found!");
        } else {
          setDebate(data);
        }
      } catch (err) {
        setError("Failed to load debate.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDebate();
  }, [id]);

  // ============================================
  // DELETE HANDLER
  // ============================================
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this debate?")) return;
    try {
      await deleteDebate(id);
      alert("✅ Debate deleted!");
      navigate("/debates");
    } catch {
      alert("❌ Failed to delete debate.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 text-lg">Loading debate...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-10 text-center border border-red-500/30 max-w-md mx-4">
        <i className="fas fa-exclamation-circle text-red-400 text-5xl mb-4 block"></i>
        <p className="text-red-400 text-xl font-bold mb-2">{error}</p>
        <p className="text-slate-500 text-sm mb-5">The debate you are looking for does not exist.</p>
        <Link to="/debates" className="btn-gradient px-6 py-2 rounded-xl text-white font-semibold">
          Back to Debates
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Back Button */}
      <Link
        to="/debates"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
      >
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to All Debates
      </Link>

      {/* Main Card */}
      <div className="glass rounded-2xl p-8 border border-purple-500/20 mb-6">

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full font-semibold">
            {debate.topic?.toUpperCase()}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            debate.difficulty === "Beginner" ? "bg-green-600/20 text-green-400" :
            debate.difficulty === "Advanced" ? "bg-red-600/20 text-red-400" :
            "bg-blue-600/20 text-blue-400"
          }`}>{debate.difficulty}</span>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
            debate.status === "Active"
              ? "bg-green-600/20 text-green-400 border-green-500/30"
              : "bg-red-600/20 text-red-400 border-red-500/30"
          }`}>{debate.status}</span>
          {debate.trending && (
            <span className="text-xs px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full font-semibold animate-pulse">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black gradient-text mb-4 leading-tight">
          {debate.title}
        </h1>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-xl" style={{ background: "rgba(108,92,231,0.05)" }}>
          <div className="text-center">
            <i className="fas fa-user text-cyan-400 text-lg block mb-1"></i>
            <p className="text-xs text-slate-500">Author</p>
            <p className="font-semibold text-sm">{debate.author}</p>
          </div>
          <div className="text-center">
            <i className="fas fa-calendar text-cyan-400 text-lg block mb-1"></i>
            <p className="text-xs text-slate-500">Date</p>
            <p className="font-semibold text-sm">{debate.date}</p>
          </div>
          <div className="text-center">
            <i className="fas fa-users text-cyan-400 text-lg block mb-1"></i>
            <p className="text-xs text-slate-500">Participants</p>
            <p className="font-semibold text-sm">{debate.participants}</p>
          </div>
          <div className="text-center">
            <i className="fas fa-star text-yellow-400 text-lg block mb-1"></i>
            <p className="text-xs text-slate-500">Rating</p>
            <p className="font-semibold text-sm">{debate.rating}/5.0</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 gradient-text">About this Debate</h2>
          <p className="text-slate-300 leading-relaxed text-base">{debate.description}</p>
        </div>

        {/* More Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass rounded-xl p-4 text-center border border-purple-500/10">
            <p className="text-2xl font-black text-purple-400">{debate.votes}</p>
            <p className="text-xs text-slate-500 mt-1">Total Votes</p>
          </div>
          <div className="glass rounded-xl p-4 text-center border border-cyan-500/10">
            <p className="text-2xl font-black text-cyan-400">{debate.views}</p>
            <p className="text-xs text-slate-500 mt-1">Total Views</p>
          </div>
          <div className="glass rounded-xl p-4 text-center border border-green-500/10">
            <p className="text-2xl font-black text-green-400">{debate.category}</p>
            <p className="text-xs text-slate-500 mt-1">Category</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/edit/${debate.id}`}
            className="flex-1 btn-gradient py-3 rounded-xl text-white font-bold text-center hover:scale-105 transition-transform"
          >
            <i className="fas fa-edit mr-2"></i>Edit Debate
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 font-bold transition-all hover:scale-105"
          >
            <i className="fas fa-trash mr-2"></i>Delete Debate
          </button>
        </div>
      </div>

      {/* Document ID Info (for assignment requirement) */}
      <div className="glass rounded-xl p-4 border border-slate-700/50">
        <p className="text-xs text-slate-500">
          <i className="fas fa-database mr-2 text-cyan-400"></i>
          Firestore Document ID: <span className="text-cyan-400 font-mono">{id}</span>
        </p>
        <p className="text-xs text-slate-500 mt-1">
          <i className="fas fa-link mr-2 text-purple-400"></i>
          Dynamic Route: <span className="text-purple-400 font-mono">/debates/{id}</span>
        </p>
      </div>
    </div>
  );
};

export default DebateDetailPage;