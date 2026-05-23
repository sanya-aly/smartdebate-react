// ============================================
// SMARTDEBATE - APP.JSX (Assignment 04)
// Role-Based Routing + Chat + Dashboards
// ============================================

import { Routes, Route, Link, Navigate } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Existing Pages
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PageNotFound from "./components/pages/PageNotFound";
import ProfilePage from "./components/pages/ProfilePage";

// Assignment 03 Pages
import DebatesListPage from "./components/pages/DebatesListPage";
import DebateDetailPage from "./components/pages/DebateDetailPage";
import CreateDebatePage from "./components/pages/CreateDebatePage";
import EditDebatePage from "./components/pages/EditDebatePage";

// Assignment 04 New Pages
import AdminDashboard from "./components/pages/AdminDashboard";
import UserDashboard from "./components/pages/UserDashboard";
import ChatPage from "./components/pages/ChatPage";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* ===== PROTECTED ROUTES ===== */}
        <Route path="/debates" element={<ProtectedRoute><DebatesListPage /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateDebatePage /></ProtectedRoute>} />
        <Route path="/debates/:id" element={<ProtectedRoute><DebateDetailPage /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditDebatePage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

        {/* ===== ROLE-BASED ROUTES ===== */}
        {/* Admin only */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        {/* Any logged in user */}
        <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Footer */}
      <footer className="mt-8 py-12 px-4" style={{ borderTop: "1px solid var(--footer-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-comments text-xl gradient-text"></i>
                <span className="font-bold gradient-text">SmartDebate</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering people to engage in meaningful discussions worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(l => (
                  <li key={l.href}><Link to={l.href} className="hover:text-cyan-400 transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Debates</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/debates" className="hover:text-cyan-400 transition-colors">All Debates</Link></li>
                <li><Link to="/create" className="hover:text-cyan-400 transition-colors">Create Debate</Link></li>
                <li><Link to="/chat" className="hover:text-cyan-400 transition-colors">Chat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/auth/login" className="hover:text-cyan-400 transition-colors">Sign In</Link></li>
                <li><Link to="/auth/register" className="hover:text-cyan-400 transition-colors">Sign Up</Link></li>
                <li><Link to="/profile" className="hover:text-cyan-400 transition-colors">Profile</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 text-center text-slate-400" style={{ borderTop: "1px solid var(--footer-border)" }}>
            <p>&copy; 2026 SmartDebate. All rights reserved.</p>
            <p className="text-sm mt-2">Assignment 04 | Web Engineering | University of Lahore | Saniya Ali (70147142)</p>
          </div>
        </div>
      </footer>
    </AuthProvider>
  );
};

export default App;