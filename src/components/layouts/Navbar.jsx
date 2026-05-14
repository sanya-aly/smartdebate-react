// ============================================
// SMARTDEBATE - NAVBAR
// src/components/layouts/Navbar.jsx
// Updated for Assignment 03 routes
// ============================================

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/debates", label: "Debates" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

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
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                  isActive(item.path)
                    ? "bg-purple-600/20 text-cyan-400 border border-purple-500/30"
                    : "hover:text-cyan-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Create Debate Button */}
            <Link
              to="/create"
              className="px-4 py-2 rounded-lg btn-gradient text-white font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <i className="fas fa-plus text-xs"></i> New Debate
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="theme-toggle-thumb">
                {isDark ? "🌙" : "☀️"}
              </div>
            </button>

            <Link
              to="/auth/register"
              className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              <div className="theme-toggle-thumb">{isDark ? "🌙" : "☀️"}</div>
            </button>
            <button
              className="text-cyan-400 text-2xl hover:text-cyan-300 transition-all duration-300 hover:scale-110 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} transition-transform duration-300`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu-enter md:hidden border-t py-4"
            style={{ borderColor: "var(--border-color)", background: "var(--bg-nav)" }}
          >
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-purple-600/20 text-cyan-400"
                      : "hover:text-cyan-400 hover:bg-white/5"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div
                className="pt-3 flex flex-col space-y-2"
                style={{ borderTop: "1px solid var(--border-color)" }}
              >
                <Link
                  to="/create"
                  className="px-4 py-2 rounded-lg btn-gradient text-white text-center font-semibold flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fas fa-plus text-xs"></i> New Debate
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 text-center font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth/login"
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-all font-semibold text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;