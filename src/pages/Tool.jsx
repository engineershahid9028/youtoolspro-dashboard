import { useState } from "react";
import axios from "axios";

const API = "https://web-production-1d44e.up.railway.app";

export default function Tool({ name }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const token = localStorage.getItem("token"); // 🔑 email users

  const runTool = async () => {
    try {
      const res = await axios.post(
        `${API}/api/tool/${name}`,
        { query },
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {} // telegram users
      );

      setResult(res.data.result);
    } catch (err) {
      setResult("❌ Unauthorized or error running tool");
    }
  };

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter keyword or URL"
      />

      <button onClick={runTool}>Run Tool</button>

      {result && <pre>{result}</pre>}
    </div>
  );
}
