import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Tool() {
  const { name } = useParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runTool = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await axios.post(
        `https://web-production-1d44e.up.railway.app/api/tools/${name}`,
        {
          telegram_id: JSON.parse(localStorage.getItem("user"))?.telegram_id,
          keyword: input
        }
      );

      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Tool execution failed");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: 40
      }}
    >
      <h1 style={{ marginBottom: 20 }}>
        🛠 {name.toUpperCase()} Tool
      </h1>

      <input
        style={{ width: "100%", padding: 12 }}
        placeholder="Enter input..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        onClick={runTool}
        style={{
          marginTop: 20,
          padding: 12,
          background: "#2563eb",
          color: "white",
          border: "none"
        }}
        disabled={loading}
      >
        {loading ? "Running..." : "Run Tool"}
      </button>

      {loading && <p style={{ marginTop: 20 }}>Processing...</p>}

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            background: "#020617",
            border: "1px solid #1e293b"
          }}
        >
          <h3>Result</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </div>
  );
}
