export default function MessageBubble({ content, isUser, ts }) {
  return (
    <div
      className={`p-3 m-2 rounded-2xl max-w-xs text-wrap ${
        isUser
          ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white ml-auto text-right"
          : "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
      }`}>
      <div className="whitespace-pre-wrap">{content}</div>
      {ts ? (
        <div className="text-[10px] opacity-80 mt-1 text-right">
          {new Date(ts).toLocaleTimeString()}
        </div>
      ) : null}
    </div>
  );
}
