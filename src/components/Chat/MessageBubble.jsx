export default function MessageBubble({ role, text, ts }) {
  const isUser = role === "user";
  return (
    <div className={\`flex \${isUser ? "justify-end" : "justify-start"} mb-3\`}>
      <div
        className={\`max-w-[80%] rounded-2xl px-4 py-2 text-sm \${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}\`}
      >
        <p>{text}</p>
        {ts ? <div className="text-[10px] opacity-70 mt-1">{new Date(ts).toLocaleTimeString()}</div> : null}
      </div>
    </div>
  );
}
