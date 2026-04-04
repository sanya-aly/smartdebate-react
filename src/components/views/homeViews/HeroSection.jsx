const HeroSection = () => {
  return (
    <section
      className="mx-4 md:mx-auto max-w-6xl mt-8 px-8 py-14 text-center fade-in rounded-2xl"
      style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.1) 0%, rgba(0,194,255,0.1) 100%)" }}
    >
      <div className="float-anim inline-block mb-4">
        <i className="fas fa-comments text-6xl gradient-text"></i>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">SmartDebate</h1>
      <p className="text-lg md:text-xl text-slate-300 mb-3">Connect. Discuss. Debate.</p>
      <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
        Find people discussing the same topics in real time. Share your thoughts, challenge ideas, and grow together.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <a href="#crud-section" className="btn-gradient px-8 py-3 rounded-lg text-white font-semibold">
          Start Debate
        </a>
        <a
          href="#filter-section"
          className="px-8 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition font-semibold"
        >
          Explore Topics
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
