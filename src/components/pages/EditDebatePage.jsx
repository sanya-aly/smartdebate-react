// ============================================
// SMARTDEBATE - EDIT DEBATE PAGE
// src/components/pages/EditDebatePage.jsx
// UPDATE - Edit existing Firestore document
// Dynamic Route: /edit/:id
// ============================================

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDebateById, updateDebate } from "../../firebase/firestoreService";

const EditDebatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "", topic: "", author: "", description: "",
    status: "Active", date: "", difficulty: "Intermediate", category: "General",
  });

  // ============================================
  // FETCH EXISTING DATA TO PRE-FILL FORM
  // ============================================
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const data = await getDebateById(id);
        if (!data) {
          setError("Debate not found!");
        } else {
          setForm({
            title: data.title || "",
            topic: data.topic || "",
            author: data.author || "",
            description: data.description || "",
            status: data.status || "Active",
            date: data.date || "",
            difficulty: data.difficulty || "Intermediate",
            category: data.category || "General",
          });
        }
      } catch (err) {
        setError("Failed to load debate.");
      } finally {
        setLoading(false);
      }
    };
    fetchDebate();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ============================================
  // SUBMIT - Update Firestore document
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.topic || !form.author || !form.description || !form.date) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }
    try {
      setSaving(true);
      await updateDebate(id, {
        ...form,
        title: form.title.trim(),
        author: form.author.trim(),
        description: form.description.trim(),
      });
      alert("✅ Debate updated successfully!");
      navigate(`/debates/${id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update debate.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Loading debate data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass rounded-2xl p-10 text-center border border-red-500/30 max-w-md mx-4">
        <i className="fas fa-exclamation-circle text-red-400 text-5xl mb-4 block"></i>
        <p className="text-red-400 text-xl font-bold">{error}</p>
        <Link to="/debates" className="btn-gradient px-6 py-2 rounded-xl text-white font-semibold mt-4 inline-block">
          Back to Debates
        </Link>
      </div>
    </div>
  );

  const selectFields = [
    { name: "topic", label: "Topic *", icon: "fa-tag", options: ["", "Technology", "Climate", "Sports", "Education", "Politics", "Finance", "Health", "Other"] },
    { name: "difficulty", label: "Difficulty", icon: "fa-layer-group", options: ["Beginner", "Intermediate", "Advanced"] },
    { name: "category", label: "Category", icon: "fa-folder", options: ["General", "Tech & Innovation", "Environment", "Sports", "Learning", "Politics", "Finance"] },
    { name: "status", label: "Status", icon: "fa-circle-dot", options: ["Active", "Closed"] },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Back */}
      <Link
        to={`/debates/${id}`}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-6 group"
      >
        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
        Back to Debate
      </Link>

      {/* Form Card */}
      <div className="glass rounded-2xl p-8 border border-cyan-500/20">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <i className="fas fa-edit text-cyan-400"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Edit Debate</h1>
            <p className="text-slate-500 text-sm">Update the debate details below</p>
          </div>
        </div>

        {/* Firestore ID display */}
        <div className="mb-5 px-4 py-2 rounded-lg bg-purple-600/10 border border-purple-500/20">
          <p className="text-xs text-slate-500">
            <i className="fas fa-database mr-2 text-purple-400"></i>
            Editing Firestore Document: <span className="text-purple-400 font-mono">{id}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-heading mr-2 text-cyan-400"></i>Debate Title *
            </label>
            <input
              type="text" name="title" value={form.title}
              onChange={handleChange}
              placeholder="Enter debate title..."
              className="w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-user mr-2 text-cyan-400"></i>Author Name *
            </label>
            <input
              type="text" name="author" value={form.author}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-calendar mr-2 text-cyan-400"></i>Date *
            </label>
            <input
              type="date" name="date" value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>

          {/* Select fields */}
          {selectFields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                <i className={`fas ${f.icon} mr-2 text-cyan-400`}></i>{f.label}
              </label>
              <select
                name={f.name} value={form[f.name]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-sm"
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>{o || "Select " + f.label}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-slate-300">
              <i className="fas fa-align-left mr-2 text-cyan-400"></i>Description *
            </label>
            <textarea
              name="description" value={form.description}
              onChange={handleChange} rows="4"
              className="w-full px-4 py-3 rounded-xl text-sm resize-none"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 btn-gradient py-3 rounded-xl text-white font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60"
            >
              {saving ? (
                <span><i className="fas fa-spinner fa-spin mr-2"></i>Updating...</span>
              ) : (
                <span><i className="fas fa-save mr-2"></i>Save Changes</span>
              )}
            </button>
            <Link
              to={`/debates/${id}`}
              className="px-6 py-3 rounded-xl border border-slate-600 text-slate-400 hover:bg-slate-700/30 transition font-bold text-sm text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDebatePage;