// ============================================
// SMARTDEBATE - REGISTER FORM
// src/components/views/authViews/RegisterForm.jsx
// Real Firebase Authentication - Create User
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail, signInWithGoogle } from "../../../firebase/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const inputClass = (field) =>
    `transition-all duration-300 ${focused === field ? "scale-[1.01]" : ""}`;

  // ============================================
  // 1. CREATE USER - Email & Password
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validations
    if (form.fullName.trim().length < 3) {
      setError("❌ Full name must be at least 3 characters!");
      return;
    }
    if (form.password.length < 6) {
      setError("❌ Password must be at least 6 characters!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }
    if (!agreed) {
      setError("❌ Please agree to Terms & Privacy Policy!");
      return;
    }

    setLoading(true);
    const result = await registerWithEmail(form.email, form.password, form.fullName);

    if (result.success) {
      setSuccess("✅ Account created successfully! Redirecting...");
      setTimeout(() => navigate("/debates"), 1500);
    } else {
      if (result.error.includes("email-already-in-use")) {
        setError("❌ This email is already registered!");
      } else if (result.error.includes("weak-password")) {
        setError("❌ Password is too weak!");
      } else {
        setError("❌ " + result.error);
      }
    }
    setLoading(false);
  };

  // ============================================
  // 8. GOOGLE SIGN IN
  // ============================================
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    const result = await signInWithGoogle();
    if (result.success) {
      setSuccess("✅ Google sign-in successful!");
      setTimeout(() => navigate("/debates"), 1200);
    } else {
      setError("❌ Google sign-in failed. Try again.");
    }
    setGoogleLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20 scale-in" style={{ animationDelay: "0.15s" }}>

      {/* Error / Success */}
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

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div className={inputClass("name")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-user mr-2 text-cyan-400"></i>Full Name
          </label>
          <input
            type="text" name="fullName" value={form.fullName}
            onChange={handleChange} placeholder="Saniya Ali"
            className="w-full px-4 py-3 rounded-xl"
            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
            required
          />
        </div>

        {/* Email */}
        <div className={inputClass("email")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-envelope mr-2 text-cyan-400"></i>Email Address
          </label>
          <input
            type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl"
            onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
            required
          />
        </div>

        {/* Password */}
        <div className={inputClass("pass")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"} name="password"
              value={form.password} onChange={handleChange}
              placeholder="Min 6 characters"
              className="w-full px-4 py-3 rounded-xl pr-12"
              onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
              required
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors">
              <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className={inputClass("confirm")}>
          <label className="block font-semibold mb-2 text-sm">
            <i className="fas fa-lock mr-2 text-cyan-400"></i>Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"} name="confirmPassword"
              value={form.confirmPassword} onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl pr-12"
              onFocus={() => setFocused("confirm")} onBlur={() => setFocused("")}
              required
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors">
              <i className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {/* Password match indicator */}
          {form.confirmPassword && (
            <p className={`text-xs mt-1 ${form.password === form.confirmPassword ? "text-green-400" : "text-red-400"}`}>
              {form.password === form.confirmPassword ? "✓ Passwords match!" : "✗ Passwords do not match!"}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="glass rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-start gap-3">
            <input
              type="checkbox" className="mt-1 w-4 h-4 accent-purple-500"
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

        {/* Submit */}
        <button
          type="submit" disabled={loading}
          className="w-full btn-gradient py-3 rounded-xl text-white font-semibold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-60"
        >
          {loading
            ? <><i className="fas fa-spinner fa-spin mr-2"></i>Creating Account...</>
            : <><i className="fas fa-user-plus mr-2"></i>Create Account</>
          }
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-slate-700"></div>
        <span className="px-4 text-slate-400 text-sm">Or continue with</span>
        <div className="flex-1 border-t border-slate-700"></div>
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoogleSignIn} disabled={googleLoading}
          className="glass rounded-xl py-3 border border-slate-600 hover:border-red-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          {googleLoading
            ? <i className="fas fa-spinner fa-spin text-red-400"></i>
            : <i className="fab fa-google text-red-400"></i>
          }
          <span className="font-medium">Google</span>
        </button>
        <button className="glass rounded-xl py-3 border border-slate-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
          <i className="fab fa-github text-cyan-400"></i>
          <span className="font-medium">GitHub</span>
        </button>
      </div>

      <div className="mt-6 p-4 glass rounded-xl border border-blue-500/20 text-center">
        <p className="text-slate-300">
          Already have an account?{" "}
          <a href="/auth/login" className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;