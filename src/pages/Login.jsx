import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [telegramId, setTelegramId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("telegram"); // telegram | email
  const [error, setError] = useState("");

  // Telegram Login (existing users)
  const telegramLogin = async () => {
    try {
      const res = await axios.post(
        "https://web-production-1d44e.up.railway.app/api/login",
        { telegram_id: Number(telegramId) }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid Telegram ID");
    }
  };

  // Email Login (new SaaS users)
  const emailLogin = async () => {
    try {
      const res = await axios.post(
        "https://web-production-1d44e.up.railway.app/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data));

      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    }}>
      <div style={{
        background: "#020617",
        padding: 30,
        borderRadius: 12,
        width: 360
      }}>
        <h2>YouToolsPro Login</h2>

        {/* Mode Switch */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button
            style={{
              flex: 1,
              padding: 10,
              background: mode === "telegram" ? "#2563eb" : "#1e293b",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => setMode("telegram")}
          >
            Telegram Login
          </button>

          <button
            style={{
              flex: 1,
              padding: 10,
              background: mode === "email" ? "#2563eb" : "#1e293b",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => setMode("email")}
          >
            Email Login
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Telegram Login */}
        {mode === "telegram" && (
          <>
            <input
              style={{ width: "100%", padding: 10, marginTop: 10 }}
              placeholder="Enter Telegram ID"
              value={telegramId}
              onChange={e => setTelegramId(e.target.value)}
            />

            <button
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "#2563eb",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              onClick={telegramLogin}
            >
              Login with Telegram
            </button>
          </>
        )}

        {/* Email Login */}
        {mode === "email" && (
          <>
            <input
              style={{ width: "100%", padding: 10, marginTop: 10 }}
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              style={{ width: "100%", padding: 10, marginTop: 10 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "#2563eb",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
              onClick={emailLogin}
            >
              Login with Email
            </button>
<button
  style={{
    width: "100%",
    marginTop: 20,
    padding: 12,
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  }}
  onClick={emailLogin}
>
  Login with Email
</button>
<div style={{ marginTop: 15, textAlign: "center" }}>
  <span
    style={{ color: "#60a5fa", cursor: "pointer", fontSize: 14 }}
    onClick={() => (window.location.href = "/register")}
  >
    Create an account
  </span>
  <br />
  <span
    style={{ color: "#94a3b8", cursor: "pointer", fontSize: 13 }}
    onClick={() => alert("Forgot password coming soon")}
  >
    Forgot password?
  </span>
</div>




          </>
          
        )}
      </div>
    </div>
  );
}
