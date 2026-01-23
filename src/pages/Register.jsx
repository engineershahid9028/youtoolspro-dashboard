import { useState } from "react";

const API = "https://web-production-1d44e.up.railway.app";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Register user
      const registerRes = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!registerRes.ok) {
        const err = await registerRes.text();
        throw new Error(err || "Registration failed");
      }

      // 2️⃣ Auto-login immediately
      const loginRes = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!loginRes.ok) {
        throw new Error("Login after signup failed");
      }

      const data = await loginRes.json();

      // 3️⃣ Save session
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data));

      // 4️⃣ Redirect
      window.location.href = "/dashboard";

    } catch (e) {
      setError("Email already exists or registration failed");
    } finally {
      setLoading(false);
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
        <h2>Create Account</h2>

        {error && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}

        <input
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          style={{ width: "100%", padding: 10, marginTop: 10 }}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 20,
            padding: 12,
            background: loading ? "#334155" : "#2563eb",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          onClick={register}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p style={{ marginTop: 15, fontSize: 14 }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "#60a5fa" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
