import { useState } from "react";
import axios from "axios";

export default function Premium() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [txid, setTxid] = useState("");
  const [status, setStatus] = useState("");

  const submitPayment = async () => {
    setStatus("Verifying payment...");

    const res = await axios.post(
      "https://web-production-1d44e.up.railway.app/api/payment",
      {
        telegram_id: user.telegram_id,
        txid: txid
      }
    );

    if (res.data.status === "success") {
      setStatus("✅ Premium activated!");
    } else {
      setStatus("❌ Invalid transaction.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      padding: 40
    }}>
      <h1>💎 Premium Upgrade</h1>

      <p>Upgrade to Premium for 5 USDT</p>

      <div style={{ marginTop: 20 }}>
        <p><b>Binance Pay ID:</b> 339696746</p>
        <p><b>USDT Wallet:</b> TCmgNUz3nrMSQ1xjCALwcXQs8EJLwh4c5i</p>
      </div>

      <input
        style={{ width: "100%", padding: 12, marginTop: 20 }}
        placeholder="Enter TXID after payment"
        value={txid}
        onChange={e => setTxid(e.target.value)}
      />

      <button
        onClick={submitPayment}
        style={{
          marginTop: 20,
          padding: 12,
          background: "#2563eb",
          color: "white",
          border: "none"
        }}
      >
        Verify Payment
      </button>

      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </div>
  );
}
