import { useState } from "react";

const RegisterForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState("");

  const inputClass = (field) =>
    `transition-all duration-300 ${focused === field ? "scale-[1.01]" : ""}`;

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20 scale-in" style={{ animationDelay: "0.15s" }}>
      <form className="space-y-5">

        <div className={inputClass("name")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-user mr-2 text-cyan-400"></i>Full Name
          </label>
          <input
            type="text" name="full_name" placeholder="Saniya Ali"
            className="w-full px-4 py-3 rounded-xl"
            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
            required
          />
        </div>

        <div className={inputClass("email")}>
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

        <div className={inputClass("pass")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} name="password"
              placeholder="Create a strong password"
              className="w-full px-4 py-3 rounded-xl pr-12"
              onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-300">
              <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        <div className={inputClass("confirm")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"} name="confirm_password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl pr-12"
              onFocus={() => setFocused("confirm")} onBlur={() => setFocused("")}
              required
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-300">
              <i className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        <p className="text-xs text-yellow-400 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle"></i>
          Note: This is a demo form. Do not use your real password.
        </p>

        <div className="glass rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <input
              type="checkbox" required className="mt-1 w-4 h-4 accent-purple-500"
              checked={agreed} onChange={() => setAgreed(!agreed)}
            />
            <label className="text-sm text-slate-300">
              I agree to the{" "}
              <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">Privacy Policy</a>
            </label>
          </div>
        </div>

        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <button
          type="submit"
          className="w-full btn-gradient py-3 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <i className="fas fa-user-plus mr-2"></i>Create Account
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
          <button key={s.label}
            className="glass rounded-xl py-3 border border-slate-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
            <i className={`fab ${s.icon} text-cyan-400`}></i>
            <span className="font-medium">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 glass rounded-xl border border-blue-500/20 text-center">
        <p className="text-slate-300">
          Already have an account?{" "}
          <a href="/auth/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors duration-300">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
