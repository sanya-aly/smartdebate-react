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
      <footer className="border-t border-slate-700 mt-8 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-comments text-xl" style={{ background: "linear-gradient(135deg, #6C5CE7 0%, #00C2FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}></i>
                <span className="font-bold gradient-text">SmartDebate</span>
              </div>
              <p className="text-slate-400 text-sm">Empowering people to engage in meaningful discussions worldwide.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
                <li><a href="/about" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Auth</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/auth/login" className="hover:text-cyan-400 transition">Sign In</a></li>
                <li><a href="/auth/register" className="hover:text-cyan-400 transition">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-cyan-400 text-xl transition"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 text-xl transition"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-slate-400 hover:text-cyan-400 text-xl transition"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-slate-400">
            <p>&copy; 2026 SmartDebate. All rights reserved.</p>
            <p className="text-sm mt-2">Lab 06 | Web Engineering | University of Lahore | Saniya Ali (70147142)</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
