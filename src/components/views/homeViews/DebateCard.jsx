const DebateCard = ({ debate, onDelete, onEdit, formatTopic, shortTitle, getFirstName, formatId }) => {
  const statusColor =
    debate.status === "Active"
      ? "bg-green-600/20 text-green-400 border border-green-500/30"
      : "bg-red-600/20 text-red-400 border border-red-500/30";

  const diffColor =
    debate.difficulty === "Beginner"
      ? "bg-green-600/20 text-green-400"
      : debate.difficulty === "Advanced"
      ? "bg-red-600/20 text-red-400"
      : "bg-blue-600/20 text-blue-400";

  return (
    <div className="glass rounded-xl p-6 border border-purple-500/20 card-hover relative overflow-hidden">
      {debate.trending && (
        <div
          className="absolute top-0 right-0 w-12 h-12 opacity-20"
          style={{ background: "linear-gradient(to bottom right, #f97316, transparent)" }}
        ></div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-xs text-slate-500 mb-1">#{formatId(debate.id)}</p>
          <h3 className="font-bold text-lg text-cyan-300 mb-2">{shortTitle(debate.title)}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full">
              {formatTopic(debate.topic)}
            </span>
            <span className={`text-xs px-2 py-1 ${diffColor} rounded-full`}>{debate.difficulty}</span>
            {debate.trending && (
              <span className="text-xs px-2 py-1 bg-orange-600/30 text-orange-400 rounded-full">
                🔥 Trending
              </span>
            )}
          </div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ml-2 ${statusColor}`}>
          {debate.status}
        </span>
      </div>

      <p className="text-slate-400 text-sm mb-4">{debate.description}</p>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-700/50">
        <div><i className="fas fa-user text-cyan-400 mr-1"></i>{getFirstName(debate.author)}</div>
        <div><i className="fas fa-calendar text-cyan-400 mr-1"></i>{debate.date}</div>
        <div><i className="fas fa-users text-cyan-400 mr-1"></i>{debate.participants} participants</div>
        <div><i className="fas fa-star text-yellow-400 mr-1"></i>{debate.rating} rating</div>
        <div><i className="fas fa-eye text-cyan-400 mr-1"></i>{debate.views} views</div>
        <div><i className="fas fa-tag text-cyan-400 mr-1"></i>{debate.category}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(debate.id)}
          className="flex-1 bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/40 px-3 py-2 rounded-lg text-sm font-semibold transition"
        >
          <i className="fas fa-edit mr-1"></i> Edit
        </button>
        <button
          onClick={() => onDelete(debate.id)}
          className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600/40 px-3 py-2 rounded-lg text-sm font-semibold transition"
        >
          <i className="fas fa-trash mr-1"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default DebateCard;
