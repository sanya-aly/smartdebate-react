const MissionVision = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h2>
          <p className="text-slate-300 leading-relaxed">
            To empower individuals from diverse backgrounds to engage in respectful, evidence-based
            debates that challenge perspectives, foster critical thinking, and build bridges across
            ideological divides.
          </p>
        </div>
        <div className="glass rounded-xl p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h2>
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
