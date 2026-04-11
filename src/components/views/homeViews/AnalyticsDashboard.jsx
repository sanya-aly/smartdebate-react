const AnalyticsDashboard = ({ analytics }) => {
  const stats = [
    { value: analytics.total, label: "Total Debates", color: "gradient-text", border: "border-purple-500/20", icon: "fa-comments" },
    { value: analytics.active, label: "Active", color: "text-green-400", border: "border-green-500/20", icon: "fa-circle-dot" },
    { value: analytics.avgRating, label: "Avg Rating", color: "text-yellow-400", border: "border-yellow-500/20", icon: "fa-star" },
    { value: analytics.trending, label: "Trending", color: "text-orange-400", border: "border-orange-500/20", icon: "fa-fire" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 gradient-text fade-in-left">
        <i className="fas fa-chart-line mr-2"></i>Live Analytics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
        {stats.map((s) => (
          <div key={s.label} className={`glass rounded-xl p-5 text-center border ${s.border} card-hover scale-in`}>
            <i className={`fas ${s.icon} text-2xl mb-2 ${s.color} block`}></i>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
