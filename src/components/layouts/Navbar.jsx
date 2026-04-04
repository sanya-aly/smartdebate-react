import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-comments text-2xl gradient-text"></i>
            <span className="font-bold text-xl gradient-text">SmartDebate</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-cyan-400 transition font-semibold">Home</Link>
            <Link to="/about" className="hover:text-cyan-400 transition font-semibold">About</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition font-semibold">Contact</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/auth/register"
              className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition font-semibold"
            >
              Sign Up
            </Link>
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg btn-gradient text-white font-semibold"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400 text-2xl hover:text-cyan-300 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-slate-700 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/" className="hover:text-cyan-400 transition font-semibold text-lg py-2" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className="hover:text-cyan-400 transition font-semibold text-lg py-2" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition font-semibold text-lg py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
              <div className="border-t border-slate-700 pt-4 flex flex-col space-y-2">
                <Link to="/auth/register" className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 text-center font-semibold" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                <Link to="/auth/login" className="px-4 py-2 rounded-lg btn-gradient text-white font-semibold text-center" onClick={() => setMenuOpen(false)}>Sign In</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
