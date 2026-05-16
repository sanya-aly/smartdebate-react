// ============================================
// SMARTDEBATE - PROFILE PAGE
// src/components/pages/ProfilePage.jsx
// Update Profile + Reset Password + Delete Account
// ============================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  updateUserProfile,
  resetPassword,
  deleteUserAccount,
  logout,
} from "../../firebase/authService";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");

  const [passForm, setPassForm] = useState({ current: "", new: "", confirm: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState("");

  const [deletePass, setDeletePass] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ============================================
  // 7. UPDATE PROFILE
  // ============================================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (displayName.trim().length < 2) {
      setUpdateMsg("❌ Name must be at least 2 characters!");
      return;
    }
    setUpdateLoading(true);
    const result = await updateUserProfile(displayName.trim());
    setUpdateMsg(result.success ? "✅ Profile updated successfully!" : "❌ " + result.error);
    setUpdateLoading(false);
  };

  // ============================================
  // 3. RESET PASSWORD (Update)
  // ============================================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPassMsg("");

    if (passForm.new.length < 6) {
      setPassMsg("❌ New password must be at least 6 characters!");
      return;
    }
    if (passForm.new !== passForm.confirm) {
      setPassMsg("❌ Passwords do not match!");
      return;
    }

    setPassLoading(true);
    const result = await resetPassword(passForm.current, passForm.new);
    if (result.success) {
      setPassMsg("✅ Password updated successfully!");
      setPassForm({ current: "", new: "", confirm: "" });
    } else {
      if (result.error.includes("wrong-password") || result.error.includes("invalid-credential")) {
        setPassMsg("❌ Current password is incorrect!");
      } else {
        setPassMsg("❌ " + result.error);
      }
    }
    setPassLoading(false);
  };

  // ============================================
  // 6. DELETE USER
  // ============================================
  const handleDeleteAccount = async () => {
    if (!deletePass) {
      setDeleteMsg("❌ Please enter your password to confirm!");
      return;
    }
    setDeleteLoading(true);
    const result = await deleteUserAccount(deletePass);
    if (result.success) {
      alert("✅ Account deleted successfully!");
      navigate("/auth/register");
    } else {
      if (result.error.includes("wrong-password") || result.error.includes("invalid-credential")) {
        setDeleteMsg("❌ Incorrect password!");
      } else {
        setDeleteMsg("❌ " + result.error);
      }
    }
    setDeleteLoading(false);
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Back */}
      <Link to="/debates"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group">
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to Debates
      </Link>

      {/* Header */}
      <div className="glass rounded-2xl p-6 border border-purple-500/20 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center text-white text-2xl font-bold">
            {currentUser?.displayName?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{currentUser?.displayName || "User"}</h1>
            <p className="text-slate-400 text-sm">{currentUser?.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              <i className="fas fa-calendar mr-1"></i>
              Joined: {currentUser?.metadata?.creationTime
                ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto px-4 py-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition font-semibold text-sm"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        </div>
      </div>

      {/* ============================================
          7. UPDATE PROFILE
      ============================================ */}
      <div className="glass rounded-2xl p-6 border border-cyan-500/20 mb-6">
        <h2 className="text-lg font-bold gradient-text mb-5 flex items-center gap-2">
          <i className="fas fa-user-edit text-cyan-400"></i> Update Profile
        </h2>

        {updateMsg && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
            updateMsg.includes("✅")
              ? "bg-green-600/20 border border-green-500/30 text-green-400"
              : "bg-red-600/20 border border-red-500/30 text-red-400"
          }`}>{updateMsg}</div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-user mr-2 text-cyan-400"></i>Display Name
            </label>
            <input
              type="text" value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-envelope mr-2 text-cyan-400"></i>Email Address
            </label>
            <input
              type="email" value={currentUser?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl text-sm opacity-50 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
          </div>
          <button
            type="submit" disabled={updateLoading}
            className="btn-gradient px-6 py-3 rounded-xl text-white font-bold text-sm hover:scale-105 transition-transform disabled:opacity-60"
          >
            {updateLoading
              ? <><i className="fas fa-spinner fa-spin mr-2"></i>Updating...</>
              : <><i className="fas fa-save mr-2"></i>Save Changes</>
            }
          </button>
        </form>
      </div>

      {/* ============================================
          3. RESET PASSWORD
      ============================================ */}
      <div className="glass rounded-2xl p-6 border border-yellow-500/20 mb-6">
        <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "#f59e0b" }}>
          <i className="fas fa-key" style={{ color: "#f59e0b" }}></i> Reset Password
        </h2>

        {passMsg && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
            passMsg.includes("✅")
              ? "bg-green-600/20 border border-green-500/30 text-green-400"
              : "bg-red-600/20 border border-red-500/30 text-red-400"
          }`}>{passMsg}</div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          {[
            { label: "Current Password", key: "current", placeholder: "Enter current password" },
            { label: "New Password", key: "new", placeholder: "Min 6 characters" },
            { label: "Confirm New Password", key: "confirm", placeholder: "Repeat new password" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                <i className="fas fa-lock mr-2 text-yellow-400"></i>{f.label}
              </label>
              <input
                type="password" value={passForm[f.key]}
                onChange={(e) => setPassForm({ ...passForm, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 rounded-xl text-sm"
              />
            </div>
          ))}
          <button
            type="submit" disabled={passLoading}
            className="px-6 py-3 rounded-xl text-white font-bold text-sm hover:scale-105 transition-transform disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
          >
            {passLoading
              ? <><i className="fas fa-spinner fa-spin mr-2"></i>Updating...</>
              : <><i className="fas fa-key mr-2"></i>Update Password</>
            }
          </button>
        </form>
      </div>

      {/* ============================================
          5 & 6. REMOVE / DELETE USER
      ============================================ */}
      <div className="glass rounded-2xl p-6 border border-red-500/20">
        <h2 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
          <i className="fas fa-user-times"></i> Delete Account
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          This action is permanent and cannot be undone. All your data will be lost.
        </p>

        {deleteMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium">
            {deleteMsg}
          </div>
        )}

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition font-bold text-sm"
          >
            <i className="fas fa-trash mr-2"></i>Delete My Account
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="password" value={deletePass}
              onChange={(e) => setDeletePass(e.target.value)}
              placeholder="Enter your password to confirm..."
              className="w-full px-4 py-3 rounded-xl text-sm border border-red-500/30"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount} disabled={deleteLoading}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition disabled:opacity-60"
              >
                {deleteLoading
                  ? <><i className="fas fa-spinner fa-spin mr-2"></i>Deleting...</>
                  : <><i className="fas fa-trash mr-2"></i>Confirm Delete</>
                }
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeletePass(""); setDeleteMsg(""); }}
                className="px-6 py-3 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-700/30 transition font-bold text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;