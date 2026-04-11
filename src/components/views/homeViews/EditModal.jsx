import { useState, useEffect } from "react";

const EditModal = ({ debate, onUpdate, onClose }) => {
  const [form, setForm] = useState({ ...debate });

  useEffect(() => { setForm({ ...debate }); }, [debate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div
      id="editModal"
      onClick={(e) => { if (e.target.id === "editModal") onClose(); }}
    >
      <div className="glass rounded-2xl p-8 border border-cyan-500/30 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
            <i className="fas fa-pen-to-square"></i> Edit Debate
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-heading mr-2 text-cyan-400"></i>Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-tag mr-2 text-cyan-400"></i>Topic *</label>
            <select name="topic" value={form.topic} onChange={handleChange} className="w-full px-4 py-3 rounded-xl">
              {["Technology","Climate","Sports","Education","Politics","Finance","Health","Other"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-user mr-2 text-cyan-400"></i>Author *</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} className="w-full px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-layer-group mr-2 text-cyan-400"></i>Difficulty</label>
            <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full px-4 py-3 rounded-xl">
              {["Beginner","Intermediate","Advanced"].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-circle-dot mr-2 text-cyan-400"></i>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl">
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-calendar mr-2 text-cyan-400"></i>Date *</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-align-left mr-2 text-cyan-400"></i>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl resize-none"></textarea>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onUpdate(form)}
            className="flex-1 btn-gradient py-3 rounded-xl text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            <i className="fas fa-save mr-2"></i>Update Debate
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-slate-500 text-slate-400 hover:bg-red-500/10 hover:border-red-400 hover:text-red-400 transition-all duration-300 font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
