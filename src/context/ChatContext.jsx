import { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]); // {id, role, text, ts}
  const [typing, setTyping] = useState(false);

  const sendUserMessage = (text) => {
    const msg = { id: crypto.randomUUID(), role: "user", text, ts: Date.now() };
    setMessages((prev) => [...prev, msg]);
  };

  const sendBotMessage = (text) => {
    const msg = { id: crypto.randomUUID(), role: "bot", text, ts: Date.now() };
    setMessages((prev) => [...prev, msg]);
  };

  const value = useMemo(
    () => ({ messages, typing, setTyping, sendUserMessage, sendBotMessage, setMessages }),
    [messages, typing]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => useContext(ChatContext);
