import { useState, useEffect } from "react";

const EditModal = ({ debate, onUpdate, onClose }) => {
  const [form, setForm] = useState({ ...debate });

  useEffect(() => {
    setForm({ ...debate });
  }, [debate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div id="editModal" onClick={(e) => { if (e.target.id === "editModal") onClose(); }}>
      <div className="glass rounded-2xl p-8 border border-cyan-500/30 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">✏️ Edit Debate</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-3 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Topic *</label>
            <select name="topic" value={form.topic} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="Technology">Technology</option>
              <option value="Climate">Climate</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Politics">Politics</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Author *</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} className="w-full px-4 py-3 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Date *</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-lg resize-none"></textarea>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => onUpdate(form)} className="flex-1 btn-gradient py-3 rounded-lg text-white font-bold">
            <i className="fas fa-save mr-2"></i> Update Debate
          </button>
          <button onClick={onClose} className="flex-1 py-3 rounded-lg border border-slate-500 text-slate-400 hover:bg-slate-700 transition font-bold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
