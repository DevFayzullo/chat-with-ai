import ChatLayout from "./components/Layout/ChatLayout";
import MessageList from "./components/Chat/MessageList";
import TypingIndicator from "./components/Chat/TypingIndicator";
import QuickReplies from "./components/Chat/QuickReplies";
import ChatInput from "./components/Chat/ChatInput";
import { ChatProvider, useChat } from "./context/ChatContext";
import { getBotReply, quickReplyOptions } from "./lib/bot";

function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">Chat with AI</h1>
      {/* ThemeToggle / LanguageToggle joyi (ixtiyoriy) */}
    </div>
  );
}

function Footer() {
  return <div className="mt-4 text-xs text-white/60">© 2025</div>;
}

function ChatScreen() {
  const { messages, typing, sendUserMessage, setTyping, sendBotMessage } = useChat();

  const handleSend = async (text) => {
    sendUserMessage(text);
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      sendBotMessage(reply);
      setTyping(false);
    }, 600);
  };

  return (
    <ChatLayout header={<Header />} footer={<Footer />}>
      <MessageList messages={messages} />
      <TypingIndicator show={typing} />
      <QuickReplies options={quickReplyOptions} onPick={handleSend} />
      <ChatInput onSend={handleSend} />
    </ChatLayout>
  );
}

export default function App() {
  return (
    <ChatProvider>
      <ChatScreen />
    </ChatProvider>
  );
}
