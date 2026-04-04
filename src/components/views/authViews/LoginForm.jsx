import { useState } from "react";

const LoginForm = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20 mb-6">
      <form action="https://formspree.io/f/mgonjvzq" method="POST" className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Password</label>
          <input type="password" name="password" placeholder="Enter your password" className="w-full px-4 py-3 rounded-lg pr-10" required />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember_me" className="w-4 h-4 rounded" />
            <span className="text-sm text-slate-300">Remember me</span>
          </label>
          <a href="#" className="text-sm text-cyan-400">Forgot password?</a>
        </div>
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <p className="text-sm text-gray-400">
          By signing in, you agree to our{" "}
          <a href="#" className="text-cyan-400 underline">Privacy Policy</a>.
        </p>
        <div className="flex items-center">
          <input type="checkbox" required className="mr-2" checked={agreed} onChange={() => setAgreed(!agreed)} />
          <label className="text-sm">I agree to the Terms & Conditions</label>
        </div>
        <button type="submit" className="w-full btn-gradient py-3 rounded-lg text-white font-semibold text-lg">
          Sign In
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-slate-700"></div>
        <span className="px-4 text-slate-400">Or continue with</span>
        <div className="flex-1 border-t border-slate-700"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="glass rounded-lg py-3 border border-slate-600 hover:border-cyan-400 transition flex items-center justify-center gap-2">
          <i className="fab fa-google text-cyan-400"></i>
          <span className="text-sm">Google</span>
        </button>
        <button className="glass rounded-lg py-3 border border-slate-600 hover:border-cyan-400 transition flex items-center justify-center gap-2">
          <i className="fab fa-github text-cyan-400"></i>
          <span className="text-sm">GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
