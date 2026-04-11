import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-enter min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="float-anim inline-block mb-6">
          <div className="text-9xl font-bold gradient-text">404</div>
        </div>
        <i className="fas fa-compass text-6xl text-slate-600 mb-6 block animate-spin" style={{ animationDuration: "6s" }}></i>
        <h1 className="text-3xl font-bold mb-4 fade-in">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto fade-in" style={{ animationDelay: "0.1s" }}>
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-gradient px-8 py-3 rounded-xl text-white font-semibold inline-block hover:scale-105 active:scale-95 transition-transform duration-200 pulse-glow"
        >
          <i className="fas fa-home mr-2"></i>Back to Home
        </Link>

        <div className="mt-12 flex justify-center gap-6 text-slate-600 stagger-children">
          <Link to="/about" className="hover:text-cyan-400 transition-colors duration-300 scale-in text-sm">About</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors duration-300 scale-in text-sm">Contact</Link>
          <Link to="/auth/login" className="hover:text-cyan-400 transition-colors duration-300 scale-in text-sm">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
