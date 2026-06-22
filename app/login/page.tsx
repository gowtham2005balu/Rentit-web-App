"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const API_BASE = "http://localhost:3000";

const PRIMARY = "#2F3E4D";

const api = {
  sendOtp: async (phone) => {
    const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to send OTP");
    return data;
  },
  verifyOtp: async (phone, otp) => {
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    if (!res.ok) throw new Error("Invalid OTP");
    return res.json();
  },
};

const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, val) => localStorage.setItem(key, val),
  clear: () => { localStorage.removeItem("token"); localStorage.removeItem("userId"); },
};

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
      background: "#1a2530", color: "#fff", borderRadius: 14, padding: "14px 22px",
      fontSize: 14, fontWeight: 500, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      maxWidth: "88vw", textAlign: "center", whiteSpace: "pre-wrap",
      animation: "slideUp 0.25s ease",
    }}>
      {message}
    </div>
  );
}

function SignInScreen({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [promoChecked, setPromoChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  const handleSubmit = async () => {
    if (phone.length !== 10) return showToast("Enter a valid 10-digit mobile number");
    if (!termsChecked) return showToast("Please accept Terms & Privacy Policy");

    try {
      setLoading(true);
      const data = await api.sendOtp(phone);
      
      // If we're in development mode without a real SMS key, the server sends the OTP back in the response.
      if (data.otp) {
        alert(`[TEST MODE] Your OTP is: ${data.otp}\n\n(This popup only appears because you don't have an SMS API key yet)`);
      }
      
      onSuccess(phone, data.otp);
    } catch (e) {
      alert(`Error details: ${e.message}\nBut don't worry, you can still log in using the master code!`);
      // Force transition to OTP screen so the user can use the universal test OTP 123456
      onSuccess(phone, '123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Top Header */}
      <div style={{
        width: "100%", maxWidth: 460, background: PRIMARY, borderRadius: "0 0 36px 36px",
        padding: "36px 28px 44px", boxSizing: "border-box",
        animation: "fadeIn 0.6s ease",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
              <path d="M9 21V12h6v9"/>
            </svg>
          </div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "24px 0 10px", letterSpacing: -0.3 }}>Welcome to Rentit</h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14.5, textAlign: "center", lineHeight: 1.65, margin: 0 }}>
            Find your perfect rental property<br />faster and smarter
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{
        width: "100%", maxWidth: 460, padding: "30px 24px 40px", boxSizing: "border-box",
        animation: "fadeIn 0.7s ease 0.1s both",
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: PRIMARY, margin: "0 0 6px" }}>Sign in</h2>
        <p style={{ fontSize: 14, color: "#888", margin: "0 0 30px" }}>Enter your mobile number to continue</p>

        <label style={{ fontSize: 14.5, fontWeight: 600, color: PRIMARY, display: "block", marginBottom: 10 }}>Mobile Number</label>

        <div style={{
          background: "#f1f2f4", borderRadius: 18, border: "1px solid #dde0e4",
          display: "flex", alignItems: "center", overflow: "hidden",
        }}>
          <div style={{ padding: "0 14px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 15.5, fontWeight: 700, color: PRIMARY }}>+91</span>
            <div style={{ width: 1, height: 22, background: "#c8ccd1" }} />
          </div>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Enter mobile number"
            style={{
              flex: 1, border: "none", background: "transparent", padding: "18px 14px 18px 0",
              fontSize: 16.5, fontWeight: 600, color: "#1a2530", outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Promo checkbox */}
        <CheckboxCard
          checked={promoChecked}
          onChange={setPromoChecked}
          label="Receive promotional and advertising messages."
        />

        {/* Terms checkbox */}
        <CheckboxCard
          checked={termsChecked}
          onChange={setTermsChecked}
          label={
            <span style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>
              I agree to the{" "}
              <a href="/terms-of-service" style={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none' }}>Terms of Service</a>
              {" & "}
              <a href="/privacy-policy" style={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a>
            </span>
          }
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", height: 60, borderRadius: 18, border: "none",
            background: loading ? "#8a9baa" : PRIMARY, color: "#fff",
            fontSize: 16.5, fontWeight: 700, cursor: loading ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            marginTop: 30, transition: "background 0.2s", fontFamily: "inherit",
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Get OTP
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </>
          )}
        </button>

        <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, fontWeight: 500, marginTop: 30 }}>
          Safe • Secure • Trusted Rentals
        </p>
      </div>
    </div>
  );
}

function CheckboxCard({ checked, onChange, label }) {
  return (
    <div style={{
      background: "#f1f2f4", borderRadius: 16, padding: "4px 14px 4px 4px",
      display: "flex", alignItems: "flex-start", gap: 4, marginTop: 14,
    }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? PRIMARY : "#c0c4ca"}`,
          background: checked ? PRIMARY : "transparent", flexShrink: 0, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", marginTop: 13,
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div style={{ paddingTop: 13, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
        {label}
      </div>
    </div>
  );
}

function OtpScreen({ phone, onBack, onVerified, testOtp }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const [toast, setToast] = useState(null);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  const showToast = (msg) => setToast(msg);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setSeconds(15);
    timerRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) { clearInterval(timerRef.current); return 0; }
        return s - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const verifyOtp = async () => {
    const otp = digits.join("");
    if (otp.length !== 6) return showToast("Enter the complete 6-digit OTP");
    try {
      setLoading(true);
      const res = await api.verifyOtp(phone, otp);
      storage.set("token", res.token);
      storage.set("userId", String(res.user?.id));
      onVerified(res);
    } catch {
      showToast("Invalid OTP. Please try again.");
      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const data = await api.sendOtp(phone);
      if (data.otp) {
        alert(`[TEST MODE] Your OTP is: ${data.otp}\n\n(This popup only appears because you don't have an SMS API key yet)`);
      }
      startTimer();
      showToast("OTP resent successfully");
    } catch {
      showToast("Failed to resend OTP");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div style={{
        width: "100%", maxWidth: 460, background: PRIMARY, borderRadius: "0 0 36px 36px",
        padding: "28px 24px 48px", boxSizing: "border-box",
        animation: "fadeIn 0.6s ease",
      }}>
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 14,
            width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6"/>
          </svg>
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "22px 0 10px", letterSpacing: -0.3 }}>OTP Verification</h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14.5, margin: "0 0 12px" }}>Enter the 6-digit code sent to</p>
          <div style={{
            background: "rgba(255,255,255,0.12)", borderRadius: 30,
            padding: "10px 20px", color: "#fff", fontWeight: 700, fontSize: 15.5,
          }}>
            +91 {phone}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{
        width: "100%", maxWidth: 460, padding: "32px 24px 40px", boxSizing: "border-box",
        animation: "fadeIn 0.7s ease 0.1s both",
      }}>
        {testOtp && (
          <div style={{ background: "#FEF3C7", padding: "12px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #F59E0B", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#B45309", marginBottom: "4px" }}>DEVELOPMENT MODE</p>
            <p style={{ fontSize: 20, color: "#92400E", fontWeight: 800, letterSpacing: "2px" }}>{testOtp}</p>
          </div>
        )}

        <h2 style={{ fontSize: 26, fontWeight: 700, color: PRIMARY, margin: "0 0 8px" }}>Enter OTP</h2>
        <p style={{ fontSize: 14, color: "#888", margin: "0 0 32px", lineHeight: 1.6 }}>
          Please enter the verification code to continue your rental journey.
        </p>

        {/* OTP inputs */}
        <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }} onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="tel"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                width: "calc(16.6% - 10px)", minWidth: 44, height: 62, borderRadius: 18,
                border: d ? `2px solid ${PRIMARY}` : "1.5px solid #d4d7dc",
                background: "#f1f2f4", textAlign: "center",
                fontSize: 24, fontWeight: 700, color: PRIMARY,
                outline: "none", fontFamily: "inherit", transition: "border 0.15s",
                boxSizing: "border-box",
              }}
            />
          ))}
        </div>

        {/* Timer / Resend */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          {seconds > 0 ? (
            <div style={{
              background: "#f1f2f4", borderRadius: 18, padding: "12px 22px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: PRIMARY }}>
                Resend OTP in 00:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          ) : (
            <button
              onClick={resendOtp}
              style={{
                background: "none", border: "none", color: PRIMARY,
                fontSize: 15.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          onClick={verifyOtp}
          disabled={loading}
          style={{
            width: "100%", height: 60, borderRadius: 18, border: "none",
            background: loading ? "#8a9baa" : PRIMARY, color: "#fff",
            fontSize: 16.5, fontWeight: 700, cursor: loading ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            marginTop: 36, transition: "background 0.2s", fontFamily: "inherit",
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Verify & Login
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </>
          )}
        </button>

        <p style={{ textAlign: "center", color: "#aaa", fontSize: 13, fontWeight: 500, marginTop: 30 }}>
          Safe • Secure • Trusted Rental App
        </p>
      </div>
    </div>
  );
}

function HomeScreen({ onLogout }) {
  const userId = storage.get("userId");
  return (
    <div style={{
      minHeight: "100vh", background: "#f5f6f8", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "40px 32px", textAlign: "center",
        boxShadow: "0 2px 20px rgba(0,0,0,0.08)", maxWidth: 380, width: "100%",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", background: PRIMARY,
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
        }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: PRIMARY, margin: "0 0 8px" }}>Logged in!</h2>
        <p style={{ color: "#888", fontSize: 14, margin: "0 0 24px" }}>User ID: {userId}</p>
        <button
          onClick={onLogout}
          style={{
            background: PRIMARY, color: "#fff", border: "none", borderRadius: 14,
            padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: "50%",
      border: "2.5px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}

export default function App() {
  const [screen, setScreen] = useState("loading");
  const [phone, setPhone] = useState("");
  const [testOtp, setTestOtp] = useState("");

  useEffect(() => {
    const token = storage.get("token");
    const userId = storage.get("userId");
    setScreen(token && userId ? "home" : "signin");
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, 'Segoe UI', sans-serif; }
        input:focus { border-color: #2F3E4D !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {screen === "loading" && (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Spinner />
        </div>
      )}
      {screen === "signin" && (
        <SignInScreen onSuccess={(p, receivedOtp) => { 
          setPhone(p); 
          if(receivedOtp) setTestOtp(receivedOtp);
          setScreen("otp"); 
        }} />
      )}
      {screen === "otp" && (
        <OtpScreen
          phone={phone}
          testOtp={testOtp}
          onBack={() => setScreen("signin")}
          onVerified={() => setScreen("home")}
        />
      )}
      {screen === "home" && (
        <HomeScreen onLogout={() => { storage.clear(); setScreen("signin"); }} />
      )}
    </>
  );
}