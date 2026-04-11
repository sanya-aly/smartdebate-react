import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import PageNotFound from "./components/pages/PageNotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
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
                  <li key={l.href}><a href={l.href} className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Auth</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/auth/login" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">Sign In</a></li>
                <li><a href="/auth/register" className="hover:text-cyan-400 transition-colors duration-300 hover:pl-1">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: "fa-twitter", color: "hover:text-sky-400" },
                  { icon: "fa-linkedin", color: "hover:text-blue-400" },
                  { icon: "fa-github", color: "hover:text-white" },
                ].map(s => (
                  <a key={s.icon} href="#"
                    className={`w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 ${s.color} transition-all duration-300 hover:scale-110 hover:-translate-y-1`}>
                    <i className={`fab ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 text-center text-slate-400" style={{ borderTop: "1px solid var(--footer-border)" }}>
            <p>&copy; 2026 SmartDebate. All rights reserved.</p>
            <p className="text-sm mt-2">Lab 06 | Web Engineering | University of Lahore | Saniya Ali (70147142)</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
