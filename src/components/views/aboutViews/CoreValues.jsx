const values = [
  { emoji: "🤝", title: "Respect", desc: "We believe in treating all viewpoints with dignity and respect.", border: "border-purple-500/20" },
  { emoji: "💡", title: "Growth", desc: "We encourage learning and personal development through dialogue.", border: "border-cyan-500/20" },
  { emoji: "🔒", title: "Safety", desc: "User safety and privacy are our top priorities.", border: "border-blue-500/20" },
  { emoji: "🌍", title: "Inclusivity", desc: "We welcome voices from all backgrounds and cultures.", border: "border-green-500/20" },
];

const CoreValues = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {values.map((v) => (
          <div key={v.title} className={`glass rounded-lg p-6 border ${v.border} text-center`}>
            <div className="text-4xl mb-4">{v.emoji}</div>
            <h3 className="font-bold mb-2">{v.title}</h3>
            <p className="text-slate-400 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
