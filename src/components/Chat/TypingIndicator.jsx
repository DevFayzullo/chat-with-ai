export default function TypingIndicator({ show }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
      <span className="animate-pulse">Bot yozmoqda...</span>
    </div>
  );
}
