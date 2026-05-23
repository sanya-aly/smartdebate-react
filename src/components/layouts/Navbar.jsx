// ============================================
// SMARTDEBATE - NAVBAR (Assignment 04)
// src/components/layouts/Navbar.jsx
// ============================================

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../firebase/authService";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/debates", label: "Debates" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate("/auth/login");
  };

  const avatarLetter = currentUser?.displayName?.charAt(0)?.toUpperCase()
    || currentUser?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <i className="fas fa-comments text-2xl gradient-text transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"></i>
            <span className="font-bold text-xl gradient-text">SmartDebate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((item) => (
              <Link key={item.path} to={item.path}
                className={`nav-link px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                  isActive(item.path)
                    ? "bg-purple-600/20 text-cyan-400 border border-purple-500/30"
                    : "hover:text-cyan-400 hover:bg-white/5"
                }`}>
                {item.label}
              </Link>
            ))}
            {/* Chat link — only when logged in */}
            {currentUser && (
              <Link to="/chat"
                className={`nav-link px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                  isActive("/chat")
                    ? "bg-purple-600/20 text-cyan-400 border border-purple-500/30"
                    : "hover:text-cyan-400 hover:bg-white/5"
                }`}>
                <i className="fas fa-comments mr-1 text-xs"></i>Chat
              </Link>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/create"
              className="px-4 py-2 rounded-lg btn-gradient text-white font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
              <i className="fas fa-plus text-xs"></i> New Debate
            </Link>

            <button onClick={toggleTheme} className="theme-toggle-btn">
              <div className="theme-toggle-thumb">{isDark ? "🌙" : "☀️"}</div>
            </button>

            {currentUser ? (
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-purple-500/30 hover:border-cyan-400/50 transition-all">
                  <div className="w-7 h-7 rounded-full btn-gradient flex items-center justify-center text-white text-xs font-bold">
                    {avatarLetter}
                  </div>
                  <span className="text-sm font-semibold text-slate-300 max-w-24 truncate">
                    {currentUser.displayName || currentUser.email?.split("@")[0]}
                  </span>
                  {isAdmin && <span className="text-xs text-red-400">🛡️</span>}
                  <i className={`fas fa-chevron-down text-xs text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`}></i>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 glass rounded-2xl border border-purple-500/20 shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-700/50">
                      <p className="text-sm font-bold text-slate-200 truncate">
                        {currentUser.displayName || "User"}
                        {isAdmin && <span className="ml-2 text-xs text-red-400">🛡️ Admin</span>}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    {/* Dashboard link */}
                    <Link to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                      <i className={`fas ${isAdmin ? "fa-tachometer-alt" : "fa-th-large"} w-4 ${isAdmin ? "text-red-400" : "text-cyan-400"}`}></i>
                      {isAdmin ? "Admin Dashboard" : "My Dashboard"}
                    </Link>

                    <Link to="/chat"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                      <i className="fas fa-comments w-4 text-purple-400"></i> Chat
                    </Link>

                    <Link to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                      <i className="fas fa-user-edit w-4 text-cyan-400"></i> Edit Profile
                    </Link>

                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-600/10 transition-colors">
                      <i className="fas fa-sign-out-alt w-4"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth/register"
                  className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-semibold text-sm hover:scale-105">
                  Sign Up
                </Link>
                <Link to="/auth/login"
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-300 font-semibold text-sm hover:scale-105">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              <div className="theme-toggle-thumb">{isDark ? "🌙" : "☀️"}</div>
            </button>
            <button className="text-cyan-400 text-2xl hover:text-cyan-300 transition ml-1"
              onClick={() => setMenuOpen(!menuOpen)}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} transition-transform duration-300`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu-enter md:hidden border-t py-4"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-nav)" }}>
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((item) => (
                <Link key={item.path} to={item.path}
                  className={`nav-link px-4 py-3 rounded-lg font-semibold text-base transition-all ${
                    isActive(item.path) ? "bg-purple-600/20 text-cyan-400" : "hover:text-cyan-400 hover:bg-white/5"
                  }`}
                  onClick={() => setMenuOpen(false)}>{item.label}</Link>
              ))}
              {currentUser && (
                <Link to="/chat"
                  className="nav-link px-4 py-3 rounded-lg font-semibold text-base hover:text-cyan-400 hover:bg-white/5 transition"
                  onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-comments mr-2 text-purple-400"></i>Chat
                </Link>
              )}
              <div className="pt-3 flex flex-col space-y-2" style={{ borderTop: "1px solid var(--border-color)" }}>
                <Link to="/create"
                  className="px-4 py-2 rounded-lg btn-gradient text-white text-center font-semibold"
                  onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-plus mr-1 text-xs"></i> New Debate
                </Link>
                {currentUser ? (
                  <>
                    <Link to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
                      className="px-4 py-2 rounded-lg glass border border-purple-500/20 text-center font-semibold text-slate-300"
                      onClick={() => setMenuOpen(false)}>
                      {isAdmin ? "🛡️ Admin Dashboard" : "📊 My Dashboard"}
                    </Link>
                    <Link to="/chat"
                      className="px-4 py-2 rounded-lg glass border border-cyan-500/20 text-center font-semibold text-cyan-400"
                      onClick={() => setMenuOpen(false)}>
                      💬 Chat
                    </Link>
                    <Link to="/profile"
                      className="px-4 py-2 rounded-lg glass border border-slate-700 text-center font-semibold text-slate-300"
                      onClick={() => setMenuOpen(false)}>
                      👤 Profile
                    </Link>
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                      className="px-4 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 font-semibold text-center">
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/register"
                      className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 text-center font-semibold"
                      onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    <Link to="/auth/login"
                      className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 text-center font-semibold"
                      onClick={() => setMenuOpen(false)}>Sign In</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {profileOpen && <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;