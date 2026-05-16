// ============================================
// SMARTDEBATE - LOGIN FORM
// src/components/views/authViews/LoginForm.jsx
// Real Firebase Authentication
// ============================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail, signInWithGoogle, forgotPassword } from "../../../firebase/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // ============================================
  // 2. SIGN IN with Email & Password
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await loginWithEmail(form.email, form.password);

    if (result.success) {
      setSuccess("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/debates"), 1200);
    } else {
      // Firebase error messages ko readable banao
      if (result.error.includes("user-not-found") || result.error.includes("wrong-password") || result.error.includes("invalid-credential")) {
        setError("❌ Invalid email or password!");
      } else if (result.error.includes("too-many-requests")) {
        setError("❌ Too many attempts. Try again later.");
      } else {
        setError("❌ " + result.error);
      }
    }
    setLoading(false);
  };

  // ============================================
  // 4. FORGOT PASSWORD
  // ============================================
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError("Please enter your email address!");
      return;
    }
    setForgotLoading(true);
    const result = await forgotPassword(forgotEmail);
    if (result.success) {
      setSuccess("✅ Password reset email sent! Check your inbox.");
      setShowForgot(false);
    } else {
      setError("❌ " + result.error);
    }
    setForgotLoading(false);
  };

  // ============================================
  // 8. GOOGLE SIGN IN
  // ============================================
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    const result = await signInWithGoogle();
    if (result.success) {
      setSuccess("✅ Google login successful!");
      setTimeout(() => navigate("/debates"), 1200);
    } else {
      setError("❌ Google sign-in failed. Try again.");
    }
    setGoogleLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20 mb-6 scale-in" style={{ animationDelay: "0.15s" }}>

      {/* Error / Success Messages */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-medium">
          {success}
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="mb-5 p-4 rounded-xl bg-purple-600/10 border border-purple-500/30">
          <p className="text-sm font-semibold mb-3 gradient-text">
            <i className="fas fa-key mr-2"></i>Reset Password
          </p>
          <input
            type="email"
            placeholder="Enter your email..."
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleForgotPassword}
              disabled={forgotLoading}
              className="flex-1 btn-gradient py-2 rounded-xl text-white font-semibold text-sm"
            >
              {forgotLoading ? <i className="fas fa-spinner fa-spin mr-1"></i> : <i className="fas fa-paper-plane mr-1"></i>}
              Send Reset Email
            </button>
            <button
              onClick={() => setShowForgot(false)}
              className="px-4 py-2 rounded-xl border border-slate-600 text-slate-400 text-sm hover:bg-slate-700/30 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className={`transition-all duration-300 ${focused === "email" ? "scale-[1.01]" : ""}`}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-envelope mr-2 text-cyan-400"></i>Email Address
          </label>
          <input
            type="email" name="email" value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl"
            onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
            required
          />
        </div>

        {/* Password */}
        <div className={`transition-all duration-300 ${focused === "pass" ? "scale-[1.01]" : ""}`}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} name="password"
              value={form.password} onChange={handleChange}
              placeholder="Enter your password"
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

        {/* Remember me + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded accent-purple-500" />
            <span className="text-sm text-slate-300">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setShowForgot(!showForgot)}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="w-full btn-gradient py-3 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-60"
        >
          {loading
            ? <><i className="fas fa-spinner fa-spin mr-2"></i>Signing in...</>
            : <><i className="fas fa-sign-in-alt mr-2"></i>Sign In</>
          }
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-slate-700"></div>
        <span className="px-4 text-slate-400 text-sm">Or continue with</span>
        <div className="flex-1 border-t border-slate-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* Google */}
        <button
          onClick={handleGoogleSignIn} disabled={googleLoading}
          className="glass rounded-xl py-3 border border-slate-600 hover:border-red-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          {googleLoading
            ? <i className="fas fa-spinner fa-spin text-red-400"></i>
            : <i className="fab fa-google text-red-400"></i>
          }
          <span className="text-sm font-medium">Google</span>
        </button>

        {/* GitHub (UI only) */}
        <button className="glass rounded-xl py-3 border border-slate-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
          <i className="fab fa-github text-cyan-400"></i>
          <span className="text-sm font-medium">GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;