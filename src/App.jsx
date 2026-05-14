// ============================================
// SMARTDEBATE - APP.JSX
// Assignment 03 - React Router DOM + Firestore
// ============================================

import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";

// Existing Pages
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PageNotFound from "./components/pages/PageNotFound";

// Assignment 03 - New Pages
import DebatesListPage from "./components/pages/DebatesListPage";
import DebateDetailPage from "./components/pages/DebateDetailPage";
import CreateDebatePage from "./components/pages/CreateDebatePage";
import EditDebatePage from "./components/pages/EditDebatePage";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ===== EXISTING ROUTES ===== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* ===== ASSIGNMENT 03 - FIRESTORE CRUD ROUTES ===== */}

        {/* View All Debates - READ ALL */}
        <Route path="/debates" element={<DebatesListPage />} />

        {/* Create New Debate - CREATE */}
        <Route path="/create" element={<CreateDebatePage />} />

        {/* View Single Debate - READ ONE (Dynamic Route) */}
        <Route path="/debates/:id" element={<DebateDetailPage />} />

        {/* Edit Debate - UPDATE (Dynamic Route) */}
        <Route path="/edit/:id" element={<EditDebatePage />} />

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
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Debates</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link to="/debates" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">
                    All Debates
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">
                    Create Debate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Auth</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link to="/auth/login" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="pt-6 text-center text-slate-400"
            style={{ borderTop: "1px solid var(--footer-border)" }}
          >
            <p>&copy; 2026 SmartDebate. All rights reserved.</p>
            <p className="text-sm mt-2">
              Assignment 03 | Web Engineering | University of Lahore | Saniya Ali (70147142)
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;