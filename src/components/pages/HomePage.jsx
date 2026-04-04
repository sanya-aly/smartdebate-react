import { useState, useEffect } from "react";
import { debatesArray as initialDebates } from "../../database/debateData";
import DebateCard from "../views/homeViews/DebateCard";
import AddDebateForm from "../views/homeViews/AddDebateForm";
import FilterSection from "../views/homeViews/FilterSection";
import AnalyticsDashboard from "../views/homeViews/AnalyticsDashboard";
import EditModal from "../views/homeViews/EditModal";
import HeroSection from "../views/homeViews/HeroSection";

// ============================================
// STRING UTILITY FUNCTIONS (10 String Methods)
// ============================================
export const formatTopic = (topic) => topic.toUpperCase();                                           // 1. toUpperCase()
export const searchLower = (text) => text.toLowerCase();                                             // 2. toLowerCase()
export const cleanInput = (input) => input.trim();                                                   // 3. trim()
export const containsKeyword = (text, kw) => text.toLowerCase().includes(kw.toLowerCase());         // 4. includes()
export const cleanDescription = (text) => text.replace(/[^a-zA-Z0-9 .,!?'-]/g, "");                // 5. replace()
export const shortTitle = (title, len = 40) => title.length > len ? title.slice(0, len) + "..." : title; // 6. slice()
export const getFirstName = (name) => name.trim().split(" ")[0];                                    // 7. split()
export const startsWithLetter = (title, letter) => title.toUpperCase().startsWith(letter.toUpperCase()); // 8. startsWith()
export const formatId = (id) => String(id).padStart(3, "0");                                        // 9. padStart()
export const keywordPosition = (text, kw) => text.toLowerCase().indexOf(kw.toLowerCase());          // 10. indexOf()

const HomePage = () => {
  const [debates, setDebates] = useState([...initialDebates]);
  const [filtered, setFiltered] = useState([...initialDebates]);
  const [nextId, setNextId] = useState(9);
  const [editDebate, setEditDebate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ============================================
  // ANALYTICS - uses filter(), reduce(), find()
  // ============================================
  const getAnalytics = () => {
    const total = debates.length;
    const active = debates.filter((d) => d.status === "Active").length;
    const avgRating = total > 0
      ? (debates.reduce((sum, d) => sum + d.rating, 0) / total).toFixed(1)
      : "0.0";
    const trending = debates.filter((d) => d.trending).length;
    return { total, active, avgRating, trending };
  };

  // ============================================
  // CREATE - Array.push()
  // ============================================
  const addDebate = (formData) => {
    if (!formData.title || !formData.topic || !formData.author || !formData.description || !formData.date) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }
    if (cleanInput(formData.title).length < 5) {
      alert("⚠️ Title must be at least 5 characters!");
      return;
    }
    if (cleanInput(formData.author).length < 3) {
      alert("⚠️ Author name must be at least 3 characters!");
      return;
    }

    const newDebate = {
      id: nextId,
      title: cleanInput(formData.title),
      topic: formData.topic,
      author: cleanInput(formData.author),
      description: cleanDescription(cleanInput(formData.description)),
      status: formData.status,
      date: formData.date,
      difficulty: formData.difficulty,
      category: formData.category,
      participants: Math.floor(Math.random() * 25) + 5,
      rating: parseFloat((Math.random() * 0.9 + 4.0).toFixed(1)),
      votes: Math.floor(Math.random() * 150) + 30,
      views: Math.floor(Math.random() * 3000) + 300,
      trending: Math.random() > 0.5,
    };

    const updated = [...debates, newDebate];
    setDebates(updated);
    setFiltered(updated);
    setNextId(nextId + 1);
    alert("✅ Debate added successfully!");
  };

  // ============================================
  // DELETE - Array.filter()
  // ============================================
  const deleteDebate = (id) => {
    if (!confirm("Are you sure you want to delete this debate?")) return;
    const updated = debates.filter((d) => d.id !== id);
    setDebates(updated);
    setFiltered(updated);
    alert("✅ Debate deleted!");
  };

  // ============================================
  // EDIT - Array.find()
  // ============================================
  const openEditModal = (id) => {
    const debate = debates.find((d) => d.id === id);
    if (!debate) return;
    setEditDebate({ ...debate });
    setShowModal(true);
  };

  // ============================================
  // UPDATE - Object.assign()
  // ============================================
  const updateDebate = (formData) => {
    if (!formData.title || !formData.topic || !formData.author || !formData.description || !formData.date) {
      alert("⚠️ Please fill in all fields!");
      return;
    }
    const idx = debates.findIndex((d) => d.id === editDebate.id);
    if (idx === -1) return;
    const updatedDebates = [...debates];
    updatedDebates[idx] = Object.assign({}, updatedDebates[idx], {
      title: cleanInput(formData.title),
      topic: formData.topic,
      author: cleanInput(formData.author),
      description: cleanInput(formData.description),
      status: formData.status,
      date: formData.date,
      difficulty: formData.difficulty,
    });
    setDebates(updatedDebates);
    setFiltered(updatedDebates);
    setShowModal(false);
    setEditDebate(null);
    alert("✅ Debate updated!");
  };

  // ============================================
  // SEARCH & FILTER - filter(), sort(), some(), every(), reduce()
  // ============================================
  const applyFilters = (filters) => {
    let result = debates.filter((d) => {
      const matchKeyword =
        !filters.keyword ||
        containsKeyword(d.title, filters.keyword) ||
        containsKeyword(d.description, filters.keyword);
      const matchTopic = !filters.topic || d.topic === filters.topic;
      const matchStatus = !filters.status || d.status === filters.status;
      const matchDifficulty = !filters.difficulty || d.difficulty === filters.difficulty;
      const matchRating = !filters.rating || d.rating >= parseFloat(filters.rating);
      const matchTrending = !filters.trending || (filters.trending === "yes" && d.trending === true);
      return matchKeyword && matchTopic && matchStatus && matchDifficulty && matchRating && matchTrending;
    });

    // sort()
    if (filters.sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    else if (filters.sortBy === "date") result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (filters.sortBy === "participants") result = [...result].sort((a, b) => b.participants - a.participants);
    else if (filters.sortBy === "views") result = [...result].sort((a, b) => b.views - a.views);

    setFiltered(result);
  };

  const analytics = getAnalytics();

  // some() - koi trending hai?
  const hasTrending = filtered.some((d) => d.trending);
  // every() - sab active hain?
  const allActive = filtered.every((d) => d.status === "Active");
  // reduce() - total participants
  const totalParticipants = filtered.reduce((sum, d) => sum + d.participants, 0);

  return (
    <>
      <HeroSection />

      {/* Analytics */}
      <AnalyticsDashboard analytics={analytics} />

      {/* Add Form */}
      <AddDebateForm onAdd={addDebate} />

      {/* Filter Section */}
      <FilterSection
        onFilter={applyFilters}
        hasTrending={hasTrending}
        allActive={allActive}
        totalParticipants={totalParticipants}
        filteredCount={filtered.length}
      />

      {/* Debates Grid */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">
            🗣️ All Debates{" "}
            <span className="text-lg text-slate-400 font-normal">({filtered.length} results)</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-search text-5xl text-slate-600 mb-4 block"></i>
            <p className="text-slate-400 text-xl">No debates found!</p>
            <p className="text-slate-500 text-sm mt-2">Try changing your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((debate) => (
              <DebateCard
                key={debate.id}
                debate={debate}
                onDelete={deleteDebate}
                onEdit={openEditModal}
                formatTopic={formatTopic}
                shortTitle={shortTitle}
                getFirstName={getFirstName}
                formatId={formatId}
              />
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center gradient-text">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "1", title: "Enter Topic", desc: "Choose a topic you are passionate about." },
            { num: "2", title: "Get Matched", desc: "Our system matches you with other debaters." },
            { num: "3", title: "Start Debate", desc: "Engage in respectful and meaningful discussion." },
          ].map((step) => (
            <div key={step.num} className="glass rounded-xl p-8 text-center border border-purple-500/20">
              <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">{step.num}</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Modal */}
      {showModal && editDebate && (
        <EditModal
          debate={editDebate}
          onUpdate={updateDebate}
          onClose={() => { setShowModal(false); setEditDebate(null); }}
        />
      )}
    </>
  );
};

export default HomePage;
