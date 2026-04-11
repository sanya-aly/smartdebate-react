import LoginForm from "../views/authViews/LoginForm";

const LoginPage = () => {
  return (
    <div className="page-enter min-h-screen flex items-center justify-center px-4 py-12 mt-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 fade-in">
          <div className="float-anim inline-block mb-4">
            <div className="w-20 h-20 rounded-full btn-gradient flex items-center justify-center mx-auto pulse-glow">
              <i className="fas fa-comments text-white text-3xl"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome Back</h1>
          <p className="text-slate-300">Sign in to continue your debates</p>
        </div>

        <LoginForm />

        <div className="glass rounded-xl p-4 border border-blue-500/20 text-center mb-6 mt-4 fade-in scale-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-slate-300">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300 underline underline-offset-2">
              Sign up here
            </a>
          </p>
        </div>

        <div className="glass rounded-xl p-4 border border-green-500/20 scale-in" style={{ animationDelay: "0.4s" }}>
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <i className="fas fa-shield-alt text-green-400"></i> Security Tips
          </h3>
          <ul className="text-sm text-slate-400 space-y-2">
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Never share your password</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Use a strong, unique password</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Enable two-factor authentication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
