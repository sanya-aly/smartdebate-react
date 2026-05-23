// ============================================
// SMARTDEBATE - USER DASHBOARD
// src/components/pages/UserDashboard.jsx
// ============================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllDebates } from "../../firebase/firestoreService";

const UserDashboard = () => {
  const { currentUser, userRole } = useAuth();
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebates = async () => {
      const data = await getAllDebates();
      setDebates(data);
      setLoading(false);
    };
    fetchDebates();
  }, []);

  // Only this user's debates
  const myDebates = debates.filter(
    (d) => d.createdBy === currentUser?.uid
  );

  const myActive = myDebates.filter((d) => d.status === "Active").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-purple-500/20 mb-7">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center text-white text-2xl font-black">
            {currentUser?.displayName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-black gradient-text">
              👋 Welcome, {currentUser?.displayName || "User"}!
            </h1>
            <p className="text-slate-400 text-sm mt-1">{currentUser?.email}</p>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/30 font-semibold">
              👤 {userRole}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: "My Debates", value: myDebates.length, icon: "fa-comments", color: "text-purple-400", border: "border-purple-500/20" },
          { label: "Active", value: myActive, icon: "fa-circle", color: "text-green-400", border: "border-green-500/20" },
          { label: "Closed", value: myDebates.length - myActive, icon: "fa-times-circle", color: "text-red-400", border: "border-red-500/20" },
          { label: "Total Debates", value: debates.length, icon: "fa-globe", color: "text-cyan-400", border: "border-cyan-500/20" },
        ].map((s) => (
          <div key={s.label} className={`glass rounded-2xl p-5 border ${s.border} text-center`}>
            <i className={`fas ${s.icon} ${s.color} text-xl mb-2 block`}></i>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
        <Link to="/debates"
          className="glass rounded-2xl p-5 border border-purple-500/20 hover:border-purple-400/50 transition card-hover group">
          <i className="fas fa-list text-2xl text-purple-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Browse All Debates</h3>
          <p className="text-slate-500 text-sm">Explore all debate topics</p>
        </Link>
        <Link to="/create"
          className="glass rounded-2xl p-5 border border-green-500/20 hover:border-green-400/50 transition card-hover group">
          <i className="fas fa-plus text-2xl text-green-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Create Debate</h3>
          <p className="text-slate-500 text-sm">Start a new discussion</p>
        </Link>
        <Link to="/chat"
          className="glass rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-400/50 transition card-hover group">
          <i className="fas fa-comments text-2xl text-cyan-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Chat</h3>
          <p className="text-slate-500 text-sm">Message other users</p>
        </Link>
      </div>

      {/* My Debates */}
      <div className="glass rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold gradient-text flex items-center gap-2">
            <i className="fas fa-user-edit text-cyan-400"></i> My Debates
          </h2>
          <Link to="/create"
            className="btn-gradient px-4 py-2 rounded-xl text-white font-semibold text-xs">
            <i className="fas fa-plus mr-1"></i> New
          </Link>
        </div>

        {myDebates.length === 0 ? (
          <div className="text-center py-10">
            <i className="fas fa-comments text-4xl text-slate-600 mb-3 block"></i>
            <p className="text-slate-400 font-semibold">No debates yet!</p>
            <p className="text-slate-600 text-sm mt-1">Create your first debate to get started.</p>
            <Link to="/create"
              className="btn-gradient px-5 py-2 rounded-xl text-white font-semibold text-sm mt-4 inline-block">
              Create Debate
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myDebates.slice(0, 6).map((debate) => (
              <div key={debate.id}
                className="glass rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm text-cyan-300 flex-1 pr-2">
                    {debate.title?.length > 40 ? debate.title.slice(0, 40) + "..." : debate.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                    debate.status === "Active"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}>{debate.status}</span>
                </div>
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">{debate.description}</p>
                <div className="flex gap-2">
                  <Link to={`/debates/${debate.id}`}
                    className="flex-1 text-center py-1.5 rounded-lg bg-purple-600/20 text-purple-400 text-xs font-semibold hover:bg-purple-600/30 transition">
                    View
                  </Link>
                  <Link to={`/edit/${debate.id}`}
                    className="flex-1 text-center py-1.5 rounded-lg bg-cyan-600/20 text-cyan-400 text-xs font-semibold hover:bg-cyan-600/30 transition">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;