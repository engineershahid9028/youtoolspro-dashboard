import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://web-production-1d44e.up.railway.app/auth/register",
        { email, password }
      );

      setSuccess("Success: Account created! You can now login.");
      setError("");
    } catch {
      setError("Email already exists");
      setSuccess("");
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
        <h2>Create YouToolsPro Account</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "lightgreen" }}>{success}</p>}

        <input
          style={{ width: "100%", padding: 10, marginTop: 20 }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          style={{ width: "100%", padding: 10, marginTop: 15 }}
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
          onClick={register}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
