import { useState } from "react";

const AddDebateForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "", topic: "", author: "", description: "",
    status: "Active", date: "", difficulty: "Intermediate", category: "General",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onAdd(form);
    setForm({ title: "", topic: "", author: "", description: "", status: "Active", date: "", difficulty: "Intermediate", category: "General" });
  };

  const fields = [
    { name: "topic", label: "Topic *", type: "select", icon: "fa-tag", options: ["","Technology","Climate","Sports","Education","Politics","Finance","Health","Other"], placeholder: "Select Topic" },
    { name: "author", label: "Author Name *", type: "text", icon: "fa-user", placeholder: "Your name..." },
    { name: "difficulty", label: "Difficulty", type: "select", icon: "fa-layer-group", options: ["Beginner","Intermediate","Advanced"] },
    { name: "category", label: "Category", type: "select", icon: "fa-folder", options: ["General","Tech & Innovation","Environment","Sports","Learning","Politics","Finance"] },
    { name: "status", label: "Status", type: "select", icon: "fa-circle-dot", options: ["Active","Closed"] },
    { name: "date", label: "Date *", type: "date", icon: "fa-calendar" },
  ];

  return (
    <section id="crud-section" className="max-w-6xl mx-auto px-4 py-6">
      <div className="glass rounded-2xl p-8 border border-purple-500/20 fade-in">
        <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center gap-2">
          <i className="fas fa-circle-plus"></i> Add New Debate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Title - full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              <i className="fas fa-heading mr-2 text-cyan-400"></i>Debate Title *
            </label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="Enter debate title..." className="w-full px-4 py-3 rounded-xl" />
          </div>

          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold mb-2">
                <i className={`fas ${f.icon} mr-2 text-cyan-400`}></i>{f.label}
              </label>
              {f.type === "select" ? (
                <select name={f.name} value={form[f.name]} onChange={handleChange} className="w-full px-4 py-3 rounded-xl">
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o || f.placeholder}</option>
                  ))}
                </select>
              ) : (
                <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                  placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl" />
              )}
            </div>
          ))}

          {/* Description - full width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">
              <i className="fas fa-align-left mr-2 text-cyan-400"></i>Description *
            </label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows="3" placeholder="Describe the debate topic..."
              className="w-full px-4 py-3 rounded-xl resize-none"></textarea>
          </div>

          <div className="md:col-span-2">
            <button type="button" onClick={handleSubmit}
              className="btn-gradient w-full py-3 rounded-xl text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 pulse-glow">
              <i className="fas fa-plus mr-2"></i>Add Debate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDebateForm;
