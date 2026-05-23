// ============================================
// SMARTDEBATE - ADMIN DASHBOARD
// src/components/pages/AdminDashboard.jsx
// ============================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers, updateUserRole } from "../../firebase/userService";
import { getAllDebates } from "../../firebase/firestoreService";

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, debatesData] = await Promise.all([
        getAllUsers(),
        getAllDebates(),
      ]);
      setUsers(usersData);
      setDebates(debatesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    const result = await updateUserRole(uid, newRole);
    if (result.success) {
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
      );
      setMsg(`✅ Role updated to ${newRole}!`);
      setTimeout(() => setMsg(""), 2500);
    }
  };

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;
  const activeDebates = debates.filter((d) => d.status === "Active").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black gradient-text">
            🛡️ Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Welcome, <span className="text-cyan-400 font-semibold">{currentUser?.displayName || currentUser?.email}</span>
          </p>
        </div>
        <Link to="/debates"
          className="btn-gradient px-5 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
          <i className="fas fa-comments"></i> Manage Debates
        </Link>
      </div>

      {msg && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-medium">
          {msg}
        </div>
      )}

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Users", value: users.length, icon: "fa-users", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
          { label: "Admins", value: adminCount, icon: "fa-user-shield", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
          { label: "Normal Users", value: userCount, icon: "fa-user", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
          { label: "Total Debates", value: debates.length, icon: "fa-comments", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
          { label: "Active Debates", value: activeDebates, icon: "fa-circle", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
          { label: "Closed Debates", value: debates.length - activeDebates, icon: "fa-times-circle", color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
          { label: "Topics", value: [...new Set(debates.map(d => d.topic))].length, icon: "fa-tag", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
          { label: "Chat Rooms", value: "Live", icon: "fa-comments", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        ].map((stat) => (
          <div key={stat.label} className={`glass rounded-2xl p-4 border ${stat.border} relative overflow-hidden`}>
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <i className={`fas ${stat.icon} ${stat.color} text-xs`}></i>
            </div>
            <p className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-slate-500 text-xs font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/debates"
          className="glass rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/50 transition group card-hover">
          <i className="fas fa-list text-2xl text-purple-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Manage All Debates</h3>
          <p className="text-slate-500 text-sm">Edit or delete any debate</p>
        </Link>
        <Link to="/chat"
          className="glass rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-500/50 transition group card-hover">
          <i className="fas fa-comments text-2xl text-cyan-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Chat with Users</h3>
          <p className="text-slate-500 text-sm">Real-time messaging</p>
        </Link>
        <Link to="/create"
          className="glass rounded-2xl p-5 border border-green-500/20 hover:border-green-500/50 transition group card-hover">
          <i className="fas fa-plus text-2xl text-green-400 mb-3 block group-hover:scale-110 transition-transform"></i>
          <h3 className="font-bold mb-1">Create Debate</h3>
          <p className="text-slate-500 text-sm">Add new debate topic</p>
        </Link>
      </div>

      {/* Users Table */}
      <div className="glass rounded-2xl p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold gradient-text mb-5 flex items-center gap-2">
          <i className="fas fa-users text-purple-400"></i> All Users Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-3 text-slate-400 font-semibold">#</th>
                <th className="text-left py-3 px-3 text-slate-400 font-semibold">Name</th>
                <th className="text-left py-3 px-3 text-slate-400 font-semibold">Email</th>
                <th className="text-left py-3 px-3 text-slate-400 font-semibold">Role</th>
                <th className="text-left py-3 px-3 text-slate-400 font-semibold">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.uid} className="border-b border-slate-800/50 hover:bg-white/3 transition">
                  <td className="py-3 px-3 text-slate-500">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="font-medium text-slate-200">{user.name}</span>
                      {user.uid === currentUser?.uid && (
                        <span className="text-xs px-2 py-0.5 bg-cyan-600/20 text-cyan-400 rounded-full">You</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{user.email}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      user.role === "admin"
                        ? "bg-red-600/20 text-red-400 border border-red-500/30"
                        : "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      {user.role === "admin" ? "🛡️ Admin" : "👤 User"}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {user.uid !== currentUser?.uid ? (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                        className="px-3 py-1.5 rounded-lg text-xs border border-purple-500/30 bg-transparent cursor-pointer"
                      >
                        <option value="user">👤 User</option>
                        <option value="admin">🛡️ Admin</option>
                      </select>
                    ) : (
                      <span className="text-xs text-slate-600">Cannot change own role</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;