// ============================================
// SMARTDEBATE - CREATE DEBATE PAGE (Updated)
// src/components/pages/CreateDebatePage.jsx
// Assignment 04 - Saves createdBy field
// ============================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createDebate } from "../../firebase/firestoreService";
import { useAuth } from "../../context/AuthContext";

const CreateDebatePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", topic: "", author: "", description: "",
    status: "Active", date: "", difficulty: "Intermediate", category: "General",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.topic || !form.author || !form.description || !form.date) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }
    if (form.title.trim().length < 5) {
      alert("⚠️ Title must be at least 5 characters!");
      return;
    }
    try {
      setLoading(true);
      const newDebate = {
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
        // Save who created this debate
        createdBy: currentUser?.uid,
        createdByEmail: currentUser?.email,
        participants: Math.floor(Math.random() * 25) + 5,
        rating: parseFloat((Math.random() * 0.9 + 4.0).toFixed(1)),
        votes: Math.floor(Math.random() * 150) + 30,
        views: Math.floor(Math.random() * 3000) + 300,
        trending: Math.random() > 0.5,
      };
      await createDebate(newDebate);
      alert("✅ Debate created!");
      navigate("/debates");
    } catch (err) {
      alert("❌ Failed to create debate.");
    } finally {
      setLoading(false);
    }
  };

  const selectFields = [
    { name: "topic", label: "Topic *", icon: "fa-tag", options: ["", "Technology", "Climate", "Sports", "Education", "Politics", "Finance", "Health", "Other"] },
    { name: "difficulty", label: "Difficulty", icon: "fa-layer-group", options: ["Beginner", "Intermediate", "Advanced"] },
    { name: "category", label: "Category", icon: "fa-folder", options: ["General", "Tech & Innovation", "Environment", "Sports", "Learning", "Politics", "Finance"] },
    { name: "status", label: "Status", icon: "fa-circle-dot", options: ["Active", "Closed"] },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/debates"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group">
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to Debates
      </Link>

      <div className="glass rounded-2xl p-8 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl btn-gradient flex items-center justify-center">
            <i className="fas fa-plus text-white"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Create New Debate</h1>
            <p className="text-slate-500 text-sm">Creating as: <span className="text-cyan-400">{currentUser?.email}</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-heading mr-2 text-cyan-400"></i>Debate Title *
            </label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="Enter an engaging debate title..." className="w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-user mr-2 text-cyan-400"></i>Author Name *
            </label>
            <input type="text" name="author" value={form.author} onChange={handleChange}
              placeholder="Your name..." className="w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-calendar mr-2 text-cyan-400"></i>Date *
            </label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          {selectFields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                <i className={`fas ${f.icon} mr-2 text-cyan-400`}></i>{f.label}
              </label>
              <select name={f.name} value={form[f.name]} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm">
                {f.options.map((o) => <option key={o} value={o}>{o || "Select " + f.label}</option>)}
              </select>
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-align-left mr-2 text-cyan-400"></i>Description *
            </label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows="4" placeholder="Describe the debate topic..."
              className="w-full px-4 py-3 rounded-xl text-sm resize-none"></textarea>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" disabled={loading}
              className="flex-1 btn-gradient py-3 rounded-xl text-white font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-60">
              {loading
                ? <><i className="fas fa-spinner fa-spin mr-2"></i>Saving...</>
                : <><i className="fas fa-rocket mr-2"></i>Launch Debate</>}
            </button>
            <Link to="/debates"
              className="px-6 py-3 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-700/30 transition font-bold text-sm text-center">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDebatePage;