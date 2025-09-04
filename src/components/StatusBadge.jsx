export default function StatusBadge({ aiReady }) {
  return (
    <div
      className={`px-4 py-2 rounded-full text-sm ${
        aiReady
          ? "bg-green-500/20 text-green-300 border border-green-500/30"
          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"
      }`}>
      {aiReady ? "🟢AI ready" : "🟡 Waiting for AI..."}
    </div>
  );
}
