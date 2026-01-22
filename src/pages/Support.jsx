import axios from "axios";
import { useState } from "react";

export default function Support() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submit = async () => {
    await axios.post("https://web-production-1d44e.up.railway.app/api/support", {
      telegram_id: user.telegram_id,
      message
    });

    setStatus("✅ Support ticket sent");
    setMessage("");
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>🎟 Support</h2>

      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Enter your message"
        style={{ width: "100%", height: 150 }}
      />

      <button onClick={submit}>Send Ticket</button>

      <p>{status}</p>
    </div>
  );
}
