import { useState } from "react";

const LoginForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20 mb-6 scale-in" style={{ animationDelay: "0.15s" }}>
      <form action="https://formspree.io/f/mgonjvzq" method="POST" className="space-y-5">

        <div className={`transition-all duration-300 ${focused === "email" ? "scale-[1.01]" : ""}`}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-envelope mr-2 text-cyan-400"></i>Email Address
          </label>
          <input
            type="email" name="email" placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl"
            onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
            required
          />
        </div>

        <div className={`transition-all duration-300 ${focused === "pass" ? "scale-[1.01]" : ""}`}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl pr-12"
              onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="remember_me" className="w-4 h-4 rounded accent-purple-500" />
            <span className="text-sm text-slate-300">Remember me</span>
          </label>
          <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300">Forgot password?</a>
        </div>

        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <div className="flex items-center gap-2">
          <input
            type="checkbox" required className="w-4 h-4 rounded accent-purple-500"
            checked={agreed} onChange={() => setAgreed(!agreed)}
          />
          <label className="text-sm text-slate-300">I agree to the Terms & Conditions</label>
        </div>

        <button
          type="submit"
          className="w-full btn-gradient py-3 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <i className="fas fa-sign-in-alt mr-2"></i>Sign In
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-slate-700"></div>
        <span className="px-4 text-slate-400 text-sm">Or continue with</span>
        <div className="flex-1 border-t border-slate-700"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: "fa-google", label: "Google" },
          { icon: "fa-github", label: "GitHub" },
        ].map((s) => (
          <button
            key={s.label}
            className="glass rounded-xl py-3 border border-slate-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <i className={`fab ${s.icon} text-cyan-400`}></i>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
