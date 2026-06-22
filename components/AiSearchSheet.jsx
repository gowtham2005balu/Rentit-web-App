"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const BASE_URL = "https://ai-backend-phgm.onrender.com";
const USER_ID = 1;

const LANGUAGES = [
  { code: "en", locale: "en-IN", label: "English" },
  { code: "ta", locale: "ta-IN", label: "Tamil" },
  { code: "hi", locale: "hi-IN", label: "Hindi" },
  { code: "te", locale: "te-IN", label: "Telugu" },
  { code: "kn", locale: "kn-IN", label: "Kannada" },
];

// ── Particle system ─────────────────────────────────────────────────────────
function createParticle(w = 800, h = 600) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  };
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: 70 }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,215,120,0.45)";
      for (const p of particlesRef.current) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0;
        if (p.y < 0) p.y = h;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Typing dots ─────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 0 14px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FFD76F",
            display: "inline-block",
            animation: `typingBounce 0.9s ease-in-out ${i * 0.15}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.isUser;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 14,
      }}
    >
      <div
        style={{
          maxWidth: "72%",
          padding: "12px 16px",
          borderRadius: isUser
            ? "16px 16px 4px 16px"
            : "16px 16px 16px 4px",
          background: isUser
            ? "linear-gradient(135deg, #FFD76F, #FFB347)"
            : "rgba(255,255,255,0.08)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
          color: isUser ? "#111111" : "#ffffff",
          fontSize: 14.5,
          lineHeight: 1.45,
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}

// ── Pulsing mic icon ────────────────────────────────────────────────────────
function PulsingMic() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#FFD76F"
      style={{ animation: "micPulse 0.7s ease-in-out infinite alternate" }}
    >
      <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
  );
}

function MicIcon({ color = "white" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V6zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
  );
}

// ── Icon button wrapper ──────────────────────────────────────────────────────
function IconBtn({ onClick, active, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 14,
        borderRadius: 14,
        border: `1px solid ${active ? "rgba(255,215,111,0.4)" : "rgba(255,255,255,0.1)"}`,
        background: active ? "rgba(255,215,111,0.15)" : "rgba(255,255,255,0.06)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function AiSearchSheet({ onClose }) {
  const [messages, setMessages] = useState([
    { text: "Welcome to Real Estate AI Assistant", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [speechAvailable, setSpeechAvailable] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // ── Init speech ──────────────────────────────────────────────────────────
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechAvailable(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
    }
  }, []);

  // ── Scroll to bottom ─────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  // ── Send message ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (customText) => {
      const text = (customText ?? input).trim();
      if (!text) return;

      setMessages((prev) => [...prev, { text, isUser: true }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(`/api/ai-proxy`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, userId: USER_ID, language: selectedLang }),
        });

        if (!res.ok) throw new Error(`Backend error: ${res.status}`);
        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { text: data.reply?.toString() ?? "No response", isUser: false },
        ]);
      } catch (e) {
        console.error("Chat error:", e);
        setMessages((prev) => [
          ...prev,
          { text: `Error: ${e.message}`, isUser: false },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, selectedLang]
  );

  // ── Voice toggle ─────────────────────────────────────────────────────────
  const toggleVoice = useCallback(() => {
    if (!speechAvailable) {
      alert("Voice recognition not available in this browser.");
      return;
    }

    const recognition = recognitionRef.current;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    const lang = LANGUAGES.find((l) => l.code === selectedLang) ?? LANGUAGES[0];
    recognition.lang = lang.locale;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setIsListening(false);
      sendMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
  }, [speechAvailable, isListening, selectedLang, sendMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Global keyframe animations */}
      <style>{`
        @keyframes typingBounce {
          from { opacity: 0.2; transform: translateY(0); }
          to   { opacity: 1;   transform: translateY(-4px); }
        }
        @keyframes micPulse {
          from { transform: scale(0.85); }
          to   { transform: scale(1.15); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,215,111,0.2); border-radius: 2px; }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "30px",
          width: "400px",
          height: "600px",
          maxWidth: "calc(100vw - 40px)",
          maxHeight: "calc(100vh - 120px)",
          background: "#0B0B10",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          overflow: "hidden",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 99999,
        }}
      >
        {/* Particle background */}
        <ParticleCanvas />

        {/* Header */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            padding: "14px 20px",
            background: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.3px",
            }}
          >
            Real Estate AI
          </span>

          <div style={{ flex: 1 }} />

          {/* Language dropdown */}
          <div
            style={{
              padding: "4px 12px",
              background: "#1F1F2E",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              marginRight: "10px",
            }}
          >
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                color: "#FFD76F",
                fontSize: 14,
                cursor: "pointer",
                outline: "none",
                appearance: "none",
                paddingRight: 16,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23FFD76F' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0px center",
              }}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} style={{ background: "#1F1F2E" }}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "24px",
              lineHeight: 1,
              padding: "0 5px"
            }}
          >
            &times;
          </button>
        </div>

        {/* Chat area */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            overflowY: "auto",
            padding: 20,
          }}
        >
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 16px",
            background: "rgba(255,255,255,0.04)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          {/* Text input */}
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about properties, PG, visits..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: 14,
                padding: "14px 16px",
                caretColor: "#FFD76F",
              }}
            />
          </div>

          {/* Mic button */}
          <IconBtn onClick={toggleVoice} active={isListening}>
            {isListening ? <PulsingMic /> : <MicIcon />}
          </IconBtn>

          {/* Send button */}
          <button
            onClick={() => sendMessage()}
            style={{
              padding: "14px 20px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #FFD76F, #FFB347)",
              color: "#111111",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
