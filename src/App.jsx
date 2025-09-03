import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (
        window.puter &&
        window.puter.ai &&
        typeof window.puter.ai.chat === "function"
      ) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(scrollToBottom, [messages]);

  const addMessages = (msg, isUser) => {
    setMessages((prev) => [
      ...prev,
      { content: msg, isUser, id: Date.now() + Math.random() },
    ]);
  };

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    if (!aiReady) {
      addMessages("⏳ AI service is still loading. Please wait...", false);
      return;
    }

    addMessages(message, true);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await window.puter.ai.chat(message);
      const reply =
        typeof response === "string"
          ? response
          : response.message?.content || "🩻 No reply received";

      addMessages(reply, false);
    } catch (err) {
      addMessages(`❌ Error: ${err.message || "Something went wrong."}`, false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 flex flex-col items-center justify-center p-4 gap-8">
      <h1 className="text-6xl sm:text-7xl font-light bg-gradient-to-r from-purple-300 via-pink-300 to-rose-400 bg-clip-text text-transparent text-center h-20">
        AI Chat App
      </h1>

      <div
        className={`px-4 py-2 rounded-full text-sm ${
          aiReady
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"
        }`}>
        {aiReady ? "🟢AI ready" : "🟡 Waiting for AI..."}
      </div>

      <div className="w-full max-w-2xl bg-gradient-to-r from-slate-800 to-slate-600 rounded-3xl p-6 shadow-2xl">
        <div className="h-80 overflow-y-auto border-b border-gray-600 mb-6 p-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-2xl">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              👋 Start the conversation by typing a message below.
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 m-2 rounded-2xl max-w-xs text-wrap ${
                msg.isUser
                  ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white ml-auto text-right"
                  : "bg-gradient-to-r from-rose-500 to-purple-500 text-white"
              }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className="p-3 m-2 rounded-2xl max-w-xs bg-gradient-to-r from-rose-500 to-purple-500 text-white">
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              aiReady ? "Type your message..." : "Waiting for AI to be ready..."
            }
            disabled={!aiReady || isLoading}
            className="flex-1 px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:shadow-xl focus:shadow-pink-400/80 focus:ring-pink-500 transition duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={sendMessage}
            disabled={!aiReady || isLoading || !inputValue.trim()}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 hover:opacity-80 text-white font-semibold rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Sending
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
