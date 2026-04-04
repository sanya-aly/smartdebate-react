import { useState } from "react";

const FilterSection = ({ onFilter, hasTrending, allActive, totalParticipants, filteredCount }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    topic: "",
    status: "",
    difficulty: "",
    rating: "",
    trending: "",
    sortBy: "",
  });

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
      <div className="glass rounded-xl p-6 border border-cyan-500/20">
        <h2 className="text-2xl font-bold mb-5 gradient-text">🔍 Search & Filter Debates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Search Keyword</label>
            <input type="text" name="keyword" value={filters.keyword} onChange={handleChange} placeholder="Search title or description..." className="w-full px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Topic</label>
            <select name="topic" value={filters.topic} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">All Topics</option>
              <option value="Technology">Technology</option>
              <option value="Climate">Climate</option>
              <option value="Sports">Sports</option>
              <option value="Education">Education</option>
              <option value="Politics">Politics</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Status</label>
            <select name="status" value={filters.status} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Difficulty</label>
            <select name="difficulty" value={filters.difficulty} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Min Rating</label>
            <select name="rating" value={filters.rating} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">Any Rating</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Trending Only</label>
            <select name="trending" value={filters.trending} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">All</option>
              <option value="yes">🔥 Trending Only</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-semibold mb-2">Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="w-full px-4 py-2 rounded-lg">
              <option value="">Default</option>
              <option value="rating">⭐ Top Rated</option>
              <option value="date">📅 Latest First</option>
              <option value="participants">👥 Most Participants</option>
              <option value="views">👁️ Most Views</option>
            </select>
          </div>
          <button onClick={resetFilters} className="px-6 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition font-semibold">
            <i className="fas fa-times mr-1"></i> Reset
          </button>
        </div>
        <div className="mt-4 space-y-1 text-sm">
          {filteredCount > 0 && hasTrending && <p className="text-orange-400">🔥 Trending debates found!</p>}
          {filteredCount > 0 && allActive && <p className="text-green-400">✅ All results are Active debates.</p>}
          {filteredCount > 0 && <p className="text-cyan-400">👥 Total participants in results: {totalParticipants}</p>}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
