import React, { useContext, useRef, useEffect, useState } from "react";
import "./ChatPage.css";
import Navbar from "./Navbar";
import { ThemeContext } from "./App";

// Example chat icon - can be replaced with a proper SVG or bot avatar if desired
const BotIcon = ({ theme }) => (
  <span
    className="bot-icon"
    aria-label="AI"
    role="img"
    style={{
      filter:
        theme === "dark"
          ? "drop-shadow(0 0 6px #4F8CFF88)"
          : "drop-shadow(0 0 6px #FFD16666)",
    }}
  >
    🤖
  </span>
);

// PUBLIC_INTERFACE
function ChatPage() {
  /**
   * The themed chat page for TalkBuddy (ChatEase): 
   * - Responsive, sticky navbar at top.
   * - Scrollable chat content area, bottom-fixing input bar.
   * - User/AI bubbles aligned right/left, themed, w/ animation.
   * - Glowing send button, loading dots, error bubble overlays.
   * - Theme context driven styling.
   * - Placeholders for regenerate/copy actions.
   */
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    // Example initial messages for empty chat
    {
      id: "msg-1",
      role: "ai",
      text:
        "Hi there! 👋 I’m TalkBuddy. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false); // Message sending (API "loading")
  const [typingMsg, setTypingMsg] = useState(""); // AI typing animation
  const [error, setError] = useState(""); // Display error with a bubble

  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMsg, sending]);

  // Simulate AI typing (typing dots → full message reveal)
  const simulateTypingResponse = (reply) => {
    setTypingMsg("");
    setSending(true);
    let i = 0;
    const charsPerStep = 2 + Math.floor(Math.random() * 2); // Speed varies slightly
    function typeStep() {
      setTypingMsg(reply.slice(0, i));
      if (i < reply.length) {
        i += charsPerStep;
        setTimeout(typeStep, 32 + Math.random() * 40);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-" + (prev.length + 1),
            role: "ai",
            text: reply,
          },
        ]);
        setTypingMsg("");
        setSending(false);
      }
    }
    typeStep();
  };

  // Simple local 'send' (simulate API, errors)
  const handleSend = async (event) => {
    event.preventDefault();
    if (!input.trim() || sending) return;
    const msg = input.trim();
    setMessages((prev) => [
      ...prev,
      {
        id: "msg-" + (prev.length + 1),
        role: "user",
        text: msg,
      },
    ]);
    setInput("");
    setSending(true);
    setError(""); // Reset existing error

    // Simulate API call (use placeholder after delay)
    setTimeout(() => {
      // Simulate random error (1 in 12)
      if (Math.random() < 1 / 12) {
        setError(
          "Sorry, something went wrong connecting to the AI. Please try again."
        );
        setSending(false);
      } else {
        // Simulated AI response
        const reply =
          "This is a placeholder AI reply for: \"" +
          msg.slice(0, 80) +
          "\". (Integration-ready)";
        simulateTypingResponse(reply);
      }
    }, 620 + Math.random() * 1100);
  };

  // Regenerate AI response for last user message (placeholder)
  const handleRegenerate = () => {
    const lastMsg = messages
      .slice()
      .reverse()
      .find((m) => m.role === "user");
    if (lastMsg) {
      setError("");
      simulateTypingResponse(
        "Here's a regenerated answer for: \"" +
          lastMsg.text.slice(0, 80) +
          "\". (Try again for different phrasing!)"
      );
      setSending(true);
    }
  };

  // Copy last AI message to clipboard (placeholder)
  const handleCopy = () => {
    const lastAI = [...messages]
      .reverse()
      .find((m) => m.role === "ai");
    if (lastAI) {
      navigator.clipboard.writeText(lastAI.text || "");
    }
  };

  // Keyboard shortcuts: enter to send, up arrow to edit previous (placeholder)
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
    // Optional: up-arrow to recall previous input
    // else if (e.key === "ArrowUp" && messages.length) { ...}
  };

  // Compose chat bubbles for all messages
  const bubbles = messages.map((msg, idx) => (
    <div
      key={msg.id}
      className={[
        "bubble",
        msg.role === "user" ? "bubble--user" : "bubble--ai",
        "bubble-anim",
      ].join(" ")}
      tabIndex={0}
    >
      {msg.role === "ai" ? (
        <span className="bubble__avatar">
          <BotIcon theme={theme} />
        </span>
      ) : null}
      <span className="bubble__text">{msg.text}</span>
      {/* Placeholders for regenerate/copy on AI bubbles (last AI only) */}
      {msg.role === "ai" && idx === messages.length - 1 && (
        <span className="bubble__toolbar">
          <button
            className="bubble__tool-btn"
            title="Regenerate response"
            onClick={handleRegenerate}
            aria-label="Regenerate response"
            tabIndex={0}
            disabled={!!typingMsg || sending}
          >
            ⟳
          </button>
          <button
            className="bubble__tool-btn"
            onClick={handleCopy}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
            tabIndex={0}
          >
            📋
          </button>
        </span>
      )}
    </div>
  ));

  // Animated AI "typing..." bubble (shown while AI types)
  const aiTypingBubble =
    typingMsg || sending
      ? (
        <div className="bubble bubble--ai bubble-anim bubble--typing" tabIndex={-1}>
          <span className="bubble__avatar">
            <BotIcon theme={theme} />
          </span>
          <span className="bubble__text">
            <span className="typing-animation">
              {typingMsg ? (
                <span className="chat-typein" aria-live="polite">{typingMsg}</span>
              ) : (
                <span className="chat-loader" aria-label="AI typing dots">
                  <span className="dot dot1"></span>
                  <span className="dot dot2"></span>
                  <span className="dot dot3"></span>
                </span>
              )}
            </span>
          </span>
        </div>
      ) : null;

  // Error bubble (shows as a red/orange bubble at bottom)
  const errorBubble = error ? (
    <div className="bubble bubble--error bubble-anim" tabIndex={0}>
      <span className="bubble__avatar" role="img" aria-label="Error">
        ⚠️
      </span>
      <span className="bubble__text">{error}</span>
    </div>
  ) : null;

  return (
    <div className={`chat-page-root chat-page-root--${theme}`}>
      {/* Sticky Navbar on top */}
      <Navbar />

      {/* Main container for chat */}
      <main className="chat-main-area">
        {/* Chat scrollback */}
        <div className="chat-scrollback" aria-live="polite" aria-label="Chat messages">
          {bubbles}
          {aiTypingBubble}
          {errorBubble}
          <div ref={chatEndRef} tabIndex={-1} />
        </div>
        {/* Input area, fixed to bottom */}
        <form
          className={`chat-input-bar${sending ? " input-disabled" : ""}`}
          onSubmit={handleSend}
        >
          <textarea
            className="chat-input"
            rows={1}
            maxLength={1200}
            placeholder={
              sending
                ? "Awaiting AI response..."
                : "Type a message and press enter..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
            autoFocus
            onKeyDown={handleInputKeyDown}
            aria-label="Message input"
          />
          <button
            type="submit"
            className={`send-btn${sending || !input.trim() ? " disabled" : ""}`}
            disabled={sending || !input.trim()}
            aria-label="Send message"
            tabIndex={0}
          >
            <span className="send-btn__icon">➤</span>
          </button>
        </form>
        {/* (Optionally: show regenerate/copy buttons above input bar, on last bubble, for accessibility) */}
      </main>
    </div>
  );
}

export default ChatPage;
