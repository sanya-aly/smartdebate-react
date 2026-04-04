const AnalyticsDashboard = ({ analytics }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 gradient-text">📊 Live Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-5 text-center border border-purple-500/20">
          <p className="text-3xl font-bold gradient-text">{analytics.total}</p>
          <p className="text-slate-400 text-sm mt-1">Total Debates</p>
        </div>
        <div className="glass rounded-xl p-5 text-center border border-cyan-500/20">
          <p className="text-3xl font-bold text-green-400">{analytics.active}</p>
          <p className="text-slate-400 text-sm mt-1">Active</p>
        </div>
        <div className="glass rounded-xl p-5 text-center border border-yellow-500/20">
          <p className="text-3xl font-bold text-yellow-400">{analytics.avgRating}</p>
          <p className="text-slate-400 text-sm mt-1">Avg Rating</p>
        </div>
        <div className="glass rounded-xl p-5 text-center border border-orange-500/20">
          <p className="text-3xl font-bold text-orange-400">{analytics.trending}</p>
          <p className="text-slate-400 text-sm mt-1">Trending</p>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
