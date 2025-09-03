import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  return (
    <div className="h-96 overflow-y-auto pr-1">
      {(!messages || messages.length === 0) ? (
        <div className="text-center text-gray-300 mt-10">
          Boshlash uchun pastdan yozing yoki tezkor tugmalardan bosing.
        </div>
      ) : (
        messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} text={m.text} ts={m.ts} />
        ))
      )}
    </div>
  );
}
