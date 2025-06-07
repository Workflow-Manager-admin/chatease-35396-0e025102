import React, { useContext, useRef, useEffect, useState } from "react";
import "./ChatPage.css";
import Navbar from "./Navbar";
import { ThemeContext } from "./App";

// PUBLIC_INTERFACE
// Fake ModelClient logic for demo - replace with @azure-rest/ai-inference or relevant API for production
// In real usage, install @azure-rest/ai-inference and import as below:
// import { ModelClient, AzureKeyCredential } from "@azure-rest/ai-inference";

// Demo fallback function for OpenAI/DeepSeek API (for reference; see fetchChatResponse below)
async function fetchChatResponse({ endpointUrl, apiKey, history }) {
  // This function should be replaced by the actual usage of ModelClient, like:
  // const client = new ModelClient(endpointUrl, new AzureKeyCredential(apiKey));
  // const result = await client.invoke({ model: ..., messages: history, ... });
  // However, for compatibility and testing, we'll use OpenAI's API as an example, or you can easily swap in Azure/DeepSeek below.
  let url = endpointUrl;
  // For OpenAI/DeepSeek REST, basic POST request:
  const model = "gpt-3.5-turbo"; // Allow user selection/model in future
  const messages = history.map((m) =>
    m.role === "system"
      ? { role: "system", content: m.text }
      : m.role === "user"
      ? { role: "user", content: m.text }
      : { role: "assistant", content: m.text }
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  // Basic OpenAI-like schema:
  const body = JSON.stringify({
    model,
    messages,
    temperature: 0.8,
    stream: false,
  });
  const resp = await fetch(url, {
    method: "POST",
    headers,
    body,
  });
  if (!resp.ok) {
    throw new Error(`APIError: ${resp.status} (${resp.statusText})`);
  }
  const data = await resp.json();
  // schema: { choices: [{ message: { content: "..."} }, ... ]}
  if (
    !data.choices ||
    !data.choices.length ||
    !data.choices[0].message?.content
  ) {
    throw new Error("No valid AI reply.");
  }
  return data.choices[0].message.content.trim();
}

// Example chat icon
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
   * The themed chat page for TalkBuddy (ChatEase),
   * refactored to use API for all chat/AI interactions.
   * User is prompted for their API key, which is held only in local state (never sent to a server!).
   * The endpoint (e.g., OpenAI, Azure, DeepSeek) and key are set by the user.
   */
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      role: "ai",
      text: "Hi there! 👋 I’m TalkBuddy. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false); // API call in flight
  const [typingMsg, setTypingMsg] = useState(""); // AI typing animation
  const [error, setError] = useState(""); // Display error as a bubble
  const [apiKey, setApiKey] = useState(""); // User's API key input
  const [endpointUrl, setEndpointUrl] = useState(
    "https://api.openai.com/v1/chat/completions"
  ); // API endpoint (OpenAI default; editable)
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);

  const chatEndRef = useRef(null);

  // Preserve API key ONLY for session (not to storage for privacy!)
  // Optionally, could use sessionStorage, but avoid for stricter privacy

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMsg, sending]);

  // Prompt UI for entering API key & endpoint
  function renderKeyForm() {
    return (
      <div
        className="chat-main-area"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 110,
          minHeight: "75vh",
        }}
      >
        <form
          style={{
            background: theme === "dark" ? "#232943ee" : "#eef5ffef",
            borderRadius: 16,
            boxShadow: "0 2px 19px #4f8cff19",
            padding: 32,
            minWidth: 330,
            maxWidth: 430,
            width: "88vw",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            border: "1.3px solid #4f8cff55",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!apiKey.trim()) return;
            setIsKeyConfigured(true);
            setError("");
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20, color: "#4F8CFF", marginBottom: 2 }}>
            <BotIcon theme={theme} /> Connect Your AI: API Key Required
          </div>
          <div style={{ fontSize: 15, color: theme === "dark" ? "#c5e5ff" : "#253f61", marginBottom: 2 }}>
            For privacy and security, your API key is only held in memory and never stored or transmitted.
            <br />
            <b>To chat, enter your OpenAI/compatible API key below.</b>
            <br />
            <span style={{ fontSize: 13, color: theme === "dark" ? "#ef8" : "#083d6a" }}>
              Find your API key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI dashboard</a>.
              <br />
              Do <b>not</b> share your key; always treat it as secret.
            </span>
          </div>
          <label htmlFor="apikey-input" style={{ fontWeight: 500, fontSize: 15 }}>
            API Key:
          </label>
          <input
            id="apikey-input"
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 7,
              border: "1px solid #aaa",
              fontSize: 16,
              background: "#fff",
              color: "#2a3b53",
            }}
            placeholder="sk-..."
            autoFocus
            required
            autoComplete="off"
          />
          <label htmlFor="endpoint-input" style={{ fontWeight: 500, fontSize: 15, marginTop: 7 }}>
            API Endpoint:
            <span style={{ fontWeight: 400, fontSize: 13, color: "#6d8eb2" }}><br/>(optional, for advanced use)</span>
          </label>
          <input
            id="endpoint-input"
            type="text"
            value={endpointUrl}
            onChange={e => setEndpointUrl(e.target.value)}
            style={{
              padding: 8,
              borderRadius: 5,
              border: "1px solid #bcc6e3",
              fontSize: 14,
              background: "#fff",
              color: "#162433",
            }}
            placeholder="https://api.openai.com/v1/chat/completions"
            autoComplete="off"
          />
          <button
            type="submit"
            style={{
              fontWeight: 700,
              background: "#4F8CFF",
              color: "white",
              padding: "11px 19px",
              borderRadius: 8,
              border: "none",
              fontSize: 16,
              marginTop: 7,
              cursor: "pointer",
              boxShadow: "0 1px 10px #4F8CFF33",
              transition: "background .18s",
            }}
            disabled={!apiKey.trim()}
          >
            Connect & Start Chatting
          </button>
          <div style={{ color: "#ef3c3c", minHeight: 19, marginTop: 3, fontSize: 15 }}>
            {error}
          </div>
        </form>
      </div>
    );
  }

  // Send user message and request AI reply via API
  const handleSend = async (event) => {
    event.preventDefault();
    if (!input.trim() || sending || !isKeyConfigured) return;
    const msg = input.trim();
    const myId = "msg-" + (messages.length + 1);
    setMessages((prev) => [
      ...prev,
      {
        id: myId,
        role: "user",
        text: msg,
      },
    ]);
    setInput("");
    setSending(true);
    setError("");
    setTypingMsg(""); // Clear typing anim before fetching

    // Compose conversation history suitable for API call
    const history = [...messages, { role: "user", text: msg }]
      .filter(m => m.text && m.text.trim());

    // Fetch AI reply from real API
    try {
      // Replace with real ModelClient logic if installed
      // Example for Azure SDK:
      // const client = new ModelClient(endpointUrl, new AzureKeyCredential(apiKey));
      // const result = await client.invoke(...);
      // setMessages(prev => [...prev, {id: ..., role: "ai", text: result.choices[0].message.content }]);
      setTypingMsg(""); // To show loading dots
      const aiReply = await fetchChatResponse({
        endpointUrl,
        apiKey,
        history,
      });
      // Simulate typing animation before showing full reply
      animateAiTyping(aiReply);
    } catch (err) {
      setTypingMsg("");
      setSending(false);
      setError(
        (err && err.message) ||
          "Sorry, something went wrong connecting to the AI. Please try again."
      );
    }
  };

  // Animate AI reply so that it types out text (like before)
  function animateAiTyping(reply) {
    setTypingMsg("");
    let i = 0;
    setSending(true);
    const charsPerStep = 2 + Math.floor(Math.random() * 2);
    function typeStep() {
      setTypingMsg(reply.slice(0, i));
      if (i < reply.length) {
        i += charsPerStep;
        setTimeout(typeStep, 19 + Math.random() * 21);
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
  }

  // Regenerate last AI message for last user prompt
  // For now, just resend last user message to API
  const handleRegenerate = async () => {
    if (sending || !isKeyConfigured) return;
    // Find last user message
    const lastMsg = messages
      .slice()
      .reverse()
      .find((m) => m.role === "user");
    if (!lastMsg) return;
    setError("");
    setTypingMsg("");
    setSending(true);
    // Compose preceding chat history up to last user message
    const idx = messages.map(m => m.id).lastIndexOf(lastMsg.id);
    const history = messages.slice(0, idx + 1);
    try {
      const aiReply = await fetchChatResponse({
        endpointUrl,
        apiKey,
        history,
      });
      animateAiTyping(aiReply);
    } catch (err) {
      setTypingMsg("");
      setSending(false);
      setError(
        (err && err.message) ||
          "Sorry, something went wrong connecting to the AI. Please try again."
      );
    }
  };

  // Copy last AI message to clipboard
  const handleCopy = () => {
    const lastAI = [...messages]
      .reverse()
      .find((m) => m.role === "ai");
    if (lastAI) {
      navigator.clipboard.writeText(lastAI.text || "");
    }
  };

  // Keyboard shortcuts
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };

  // Compose chat bubbles for all messages (unchanged)
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

  // Animated AI "typing..." bubble
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

  // Error bubble (shows at bottom)
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
      <Navbar />
      {!isKeyConfigured ? (
        renderKeyForm()
      ) : (
        <main className="chat-main-area">
          <div className="chat-scrollback" aria-live="polite" aria-label="Chat messages">
            {bubbles}
            {aiTypingBubble}
            {errorBubble}
            <div ref={chatEndRef} tabIndex={-1} />
          </div>
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
        </main>
      )}
    </div>
  );
}

export default ChatPage;
