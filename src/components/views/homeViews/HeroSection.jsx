const HeroSection = () => {
  return (
    <section className="hero-gradient mx-4 md:mx-auto max-w-6xl mt-8 px-8 py-16 text-center fade-in">
      <div className="float-anim inline-block mb-6">
        <div className="relative">
          <i className="fas fa-comments text-7xl gradient-text"></i>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text fade-in" style={{ animationDelay: "0.1s" }}>
        SmartDebate
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-3 fade-in" style={{ animationDelay: "0.2s" }}>
        Connect. Discuss. Debate.
      </p>
      <p className="text-slate-400 mb-10 max-w-2xl mx-auto fade-in" style={{ animationDelay: "0.3s" }}>
        Find people discussing the same topics in real time. Share your thoughts, challenge ideas, and grow together.
      </p>
      <div className="flex justify-center gap-4 flex-wrap fade-in" style={{ animationDelay: "0.4s" }}>
        <a
          href="#crud-section"
          className="btn-gradient px-8 py-3 rounded-xl text-white font-semibold pulse-glow"
        >
          <i className="fas fa-plus mr-2"></i> Start Debate
        </a>
        <a
          href="#filter-section"
          className="px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-semibold hover:scale-105"
        >
          <i className="fas fa-search mr-2"></i> Explore Topics
        </a>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto stagger-children">
        {[
          { num: "50K+", label: "Users" },
          { num: "100K+", label: "Debates" },
          { num: "180+", label: "Countries" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-3 scale-in hover:scale-105 transition-transform duration-300">
            <p className="text-xl font-bold gradient-text">{s.num}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
