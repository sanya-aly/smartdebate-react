import { useState } from "react";

const RegisterForm = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20">
      <form className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Full Name</label>
          <input type="text" name="full_name" placeholder="Saniya Ali" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Email Address</label>
          <input type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Password</label>
          <input type="password" name="password" placeholder="Create a strong password" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <div>
          <label className="block font-semibold mb-2">Confirm Password</label>
          <input type="password" name="confirm_password" placeholder="Confirm your password" className="w-full px-4 py-3 rounded-lg" required />
        </div>
        <p className="text-xs text-yellow-400">
          Note: This is a demo form. Do not use your real password.
        </p>
        <div className="glass rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <input type="checkbox" required className="mt-1" checked={agreed} onChange={() => setAgreed(!agreed)} />
            <label className="text-sm text-slate-300">
              I agree to the{" "}
              <a href="#" className="text-cyan-400 underline">Terms of Service</a> and{" "}
              <a href="#" className="text-cyan-400 underline">Privacy Policy</a>
            </label>
          </div>
        </div>
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        <button type="submit" className="w-full btn-gradient py-3 rounded-lg text-white font-semibold text-lg">
          Create Account
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
          <span>Google</span>
        </button>
        <button className="glass rounded-lg py-3 border border-slate-600 hover:border-cyan-400 transition flex items-center justify-center gap-2">
          <i className="fab fa-github text-cyan-400"></i>
          <span>GitHub</span>
        </button>
      </div>

      <div className="mt-8 p-4 glass rounded-lg border border-blue-500/20 text-center">
        <p className="text-slate-300">
          Already have an account?{" "}
          <a href="/auth/login" className="text-cyan-400 font-semibold hover:text-cyan-300">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
