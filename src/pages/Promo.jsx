import axios from "axios";
import { useState } from "react";

export default function Promo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const apply = async () => {
    if (!user || !user.telegram_id) {
      alert("Please login again");
      return;
    }

    if (!code) {
      alert("Enter promo code");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        "https://web-production-1d44e.up.railway.app/api/promo",
        {
          telegram_id: user.telegram_id,
          code: code
        }
      );

      setMsg(res.data.message || res.data.status);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid promo code";

      setMsg(message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>🏷 Promo Code</h2>

      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter promo code"
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
      />

      <button
        onClick={apply}
        disabled={loading}
        style={{
          padding: 10,
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Applying..." : "Apply"}
      </button>

      {msg && <p style={{ marginTop: 20 }}>{msg}</p>}
    </div>
  );
}
