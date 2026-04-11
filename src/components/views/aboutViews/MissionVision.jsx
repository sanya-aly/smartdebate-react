const MissionVision = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-xl p-8 border border-purple-500/20 card-hover fade-in-left group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center">
              <i className="fas fa-bullseye text-white"></i>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Our Mission</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            To empower individuals from diverse backgrounds to engage in respectful, evidence-based
            debates that challenge perspectives, foster critical thinking, and build bridges across
            ideological divides.
          </p>
        </div>
        <div className="glass rounded-xl p-8 border border-cyan-500/20 card-hover fade-in-right group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center">
              <i className="fas fa-eye text-white"></i>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Our Vision</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            A world where disagreement is seen as an opportunity for growth, not conflict. Where
            intelligent discussion shapes society, and where everyone's voice can be heard and
            respected.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
