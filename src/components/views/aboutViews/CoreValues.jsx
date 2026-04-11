const values = [
  { emoji: "🤝", title: "Respect", desc: "We believe in treating all viewpoints with dignity and respect.", border: "border-purple-500/20", hover: "hover:border-purple-400/50" },
  { emoji: "💡", title: "Growth", desc: "We encourage learning and personal development through dialogue.", border: "border-cyan-500/20", hover: "hover:border-cyan-400/50" },
  { emoji: "🔒", title: "Safety", desc: "User safety and privacy are our top priorities.", border: "border-blue-500/20", hover: "hover:border-blue-400/50" },
  { emoji: "🌍", title: "Inclusivity", desc: "We welcome voices from all backgrounds and cultures.", border: "border-green-500/20", hover: "hover:border-green-400/50" },
];

const CoreValues = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-12 text-center gradient-text fade-in">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 stagger-children">
        {values.map((v) => (
          <div key={v.title} className={`glass rounded-xl p-6 border ${v.border} ${v.hover} text-center card-hover scale-in group cursor-default`}>
            <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{v.emoji}</div>
            <h3 className="font-bold mb-2 text-lg gradient-text">{v.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
