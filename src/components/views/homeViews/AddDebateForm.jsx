import { useState } from "react";

const AddDebateForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    author: "",
    description: "",
    status: "Active",
    date: "",
    difficulty: "Intermediate",
    category: "General",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({
      title: "",
      topic: "",
      author: "",
      description: "",
      status: "Active",
      date: "",
      difficulty: "Intermediate",
      category: "General",
    });
  };

  return (
    <section id="crud-section" className="max-w-6xl mx-auto px-4 py-6">
      <div className="glass rounded-xl p-8 border border-purple-500/20">
        <h2 className="text-2xl font-bold mb-6 gradient-text">➕ Add New Debate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Debate Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Enter debate title..." className="w-full px-4 py-3 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Topic *</label>
            <select name="topic" value={form.topic} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="">Select Topic</option>
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
            <label className="block text-sm font-semibold mb-2">Author Name *</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Your name..." className="w-full px-4 py-3 rounded-lg" />
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
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="General">General</option>
              <option value="Tech & Innovation">Tech & Innovation</option>
              <option value="Environment">Environment</option>
              <option value="Sports">Sports</option>
              <option value="Learning">Learning</option>
              <option value="Politics">Politics</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-3 rounded-lg">
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date *</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Describe the debate topic..." className="w-full px-4 py-3 rounded-lg resize-none"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="button" onClick={handleSubmit} className="btn-gradient w-full py-3 rounded-lg text-white font-bold text-lg">
              <i className="fas fa-plus mr-2"></i> Add Debate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDebateForm;
