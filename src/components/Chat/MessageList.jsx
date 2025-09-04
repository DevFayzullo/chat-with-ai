import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, isLoading, endRef }) {
  return (
    <div className="h-80 overflow-y-auto border-b border-gray-600 mb-6 p-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-2xl">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          👋 Start the conversation by typing a message below.
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          content={msg.content}
          isUser={msg.isUser}
          ts={msg.ts}
        />
      ))}

      {isLoading && (
        <div className="p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-rose-500 to-purple-500 text-white">
          <div className="flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
            Thinking...
          </div>
        </div>
      )}

      <div ref={endRef}></div>
    </div>
  );
}
