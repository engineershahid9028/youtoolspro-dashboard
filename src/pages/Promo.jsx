import axios from "axios";
import { useState } from "react";

export default function Promo() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const apply = async () => {
    const res = await axios.post("https://web-production-1d44e.up.railway.app/api/promo", {
      telegram_id: user.telegram_id,
      code
    });

    setMsg(res.data.status);
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>🏷 Promo Code</h2>

      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter promo code"
      />

      <button onClick={apply}>Apply</button>

      <p>{msg}</p>
    </div>
  );
}
