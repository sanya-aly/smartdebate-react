import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold gradient-text mb-4">404</div>
        <i className="fas fa-comments text-6xl text-slate-600 mb-6 block"></i>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-gradient px-8 py-3 rounded-lg text-white font-semibold inline-block">
          <i className="fas fa-home mr-2"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
