import LoginForm from "../views/authViews/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 mt-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 btn-gradient">
            <i className="fas fa-comments text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome Back</h1>
          <p className="text-slate-300">Sign in to continue your debates</p>
        </div>
        <LoginForm />
        <div className="glass rounded-lg p-4 border border-blue-500/20 text-center mb-6 mt-4">
          <p className="text-slate-300">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-cyan-400 font-semibold hover:text-cyan-300">
              Sign up here
            </a>
          </p>
        </div>
        <div className="glass rounded-lg p-4 border border-green-500/20">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-shield-alt text-green-400"></i> Security Tips
          </h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>✓ Never share your password</li>
            <li>✓ Use a strong, unique password</li>
            <li>✓ Enable two-factor authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
