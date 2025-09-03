export default function ChatLayout({ header, children, footer }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl shadow-xl bg-white/5 backdrop-blur p-4 sm:p-6">
        {header}
        <div className="mt-4">{children}</div>
        {footer}
      </div>
    </div>
  );
}
