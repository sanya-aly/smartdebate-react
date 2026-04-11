import { useState } from "react";

const FilterSection = ({ onFilter, hasTrending, allActive, totalParticipants, filteredCount }) => {
  const [filters, setFilters] = useState({ keyword: "", topic: "", status: "", difficulty: "", rating: "", trending: "", sortBy: "" });

  const handleChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    onFilter(updated);
  };

  const resetFilters = () => {
    const empty = { keyword: "", topic: "", status: "", difficulty: "", rating: "", trending: "", sortBy: "" };
    setFilters(empty);
    onFilter(empty);
  };

  return (
    <section id="filter-section" className="max-w-6xl mx-auto px-4 py-6">
      <div className="glass rounded-2xl p-6 border border-cyan-500/20 fade-in">
        <h2 className="text-2xl font-bold mb-5 gradient-text flex items-center gap-2">
          <i className="fas fa-sliders"></i> Search & Filter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-search mr-2 text-cyan-400"></i>Keyword</label>
            <input type="text" name="keyword" value={filters.keyword} onChange={handleChange} placeholder="Search title or description..." className="w-full px-4 py-2 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-tag mr-2 text-cyan-400"></i>Topic</label>
            <select name="topic" value={filters.topic} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">All Topics</option>
              {["Technology","Climate","Sports","Education","Politics","Finance"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-circle-dot mr-2 text-cyan-400"></i>Status</label>
            <select name="status" value={filters.status} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-layer-group mr-2 text-cyan-400"></i>Difficulty</label>
            <select name="difficulty" value={filters.difficulty} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">All Levels</option>
              {["Beginner","Intermediate","Advanced"].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-star mr-2 text-yellow-400"></i>Min Rating</label>
            <select name="rating" value={filters.rating} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">Any Rating</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-fire mr-2 text-orange-400"></i>Trending</label>
            <select name="trending" value={filters.trending} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">All</option>
              <option value="yes">🔥 Trending Only</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-semibold mb-2"><i className="fas fa-sort mr-2 text-cyan-400"></i>Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="w-full px-4 py-2 rounded-xl">
              <option value="">Default</option>
              <option value="rating">⭐ Top Rated</option>
              <option value="date">📅 Latest First</option>
              <option value="participants">👥 Most Participants</option>
              <option value="views">👁️ Most Views</option>
            </select>
          </div>
          <button onClick={resetFilters}
            className="px-6 py-2 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300 font-semibold hover:scale-105 active:scale-95">
            <i className="fas fa-rotate-left mr-1"></i> Reset
          </button>
        </div>

        {filteredCount > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 text-sm slide-down">
            {hasTrending && <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full border border-orange-500/20">🔥 Trending debates found!</span>}
            {allActive && <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full border border-green-500/20">✅ All results are Active</span>}
            <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full border border-cyan-500/20">👥 Total participants: {totalParticipants}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterSection;
