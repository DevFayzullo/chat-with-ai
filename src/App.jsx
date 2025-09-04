import { useState, useEffect, useRef } from "react";
import Title from "./components/Title";
import StatusBadge from "./components/StatusBadge";
import MessageList from "./components/Chat/MessageList";
import ChatInput from "./components/Chat/ChatInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Check Puter AI readiness
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

  // Auto-scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Add a message to the list
  const addMessages = (msg, isUser) => {
    setMessages((prev) => [
      ...prev,
      { content: msg, isUser, id: Date.now() + Math.random(), ts: Date.now() },
    ]);
  };

  // Send message via Puter AI
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
          : response?.message?.content || "🩻 No reply received";

      addMessages(reply, false);
    } catch (err) {
      addMessages(`❌ Error: ${err.message || "Something went wrong."}`, false);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter (without Shift) to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 flex flex-col items-center justify-center p-4 gap-8">
      <Title />
      <StatusBadge aiReady={aiReady} />

      <div className="w-full max-w-2xl bg-gradient-to-r from-slate-800 to-slate-600 rounded-3xl p-6 shadow-2xl">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          endRef={messagesEndRef}
        />
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          aiReady={aiReady}
          isLoading={isLoading}
          onKeyDown={handleKeyPress}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
