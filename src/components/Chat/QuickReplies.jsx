export default function QuickReplies({ options = [], onPick }) {
  if (!options.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onPick(opt)}
          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-white/10"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
