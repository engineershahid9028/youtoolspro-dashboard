import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API = "https://web-production-1d44e.up.railway.app";

export default function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  const loadAll = useCallback(async () => {
    const statsRes = await axios.get(`${API}/api/admin/stats/${user.telegram_id}`);
    const usersRes = await axios.get(`${API}/api/admin/users/${user.telegram_id}`);
    const paymentsRes = await axios.get(`${API}/api/admin/payments/${user.telegram_id}`);

    setStats(statsRes.data);
    setUsers(usersRes.data);
    setPayments(paymentsRes.data);
  }, [user.telegram_id]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const action = async (endpoint, userId) => {
    await axios.post(`${API}${endpoint}`, {
      admin_id: user.telegram_id,
      user_id: userId
    });

    alert("Action completed successfully");
    loadAll();
  };

  if (!user?.is_admin) {
    return <h2 style={{ color: "white", padding: 40 }}>Unauthorized</h2>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: 40 }}>
      <h1>👑 Admin Dashboard</h1>

      {stats && (
        <div style={{ marginTop: 20 }}>
          <p>Users: {stats.users}</p>
          <p>Premium Users: {stats.premium}</p>
          <p>Wallets: {stats.wallets} USDT</p>
          <p>Total Requests: {stats.requests}</p>
        </div>
      )}

      <h2 style={{ marginTop: 30 }}>Users</h2>

      {users.map(u => (
        <div key={u.id} style={{ padding: 10, borderBottom: "1px solid #1e293b" }}>
          <b>{u.id}</b> | Premium: {u.premium ? "Yes" : "No"} | Wallet: {u.wallet} USDT

          <div style={{ marginTop: 10 }}>
            <button onClick={() => action("/api/admin/grant", u.id)}>Grant</button>{" "}
            <button onClick={() => action("/api/admin/revoke", u.id)}>Revoke</button>{" "}
            <button onClick={() => action("/api/admin/ban", u.id)}>Ban</button>{" "}
            <button onClick={() => action("/api/admin/unban", u.id)}>Unban</button>
          </div>
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>Payments</h2>

      {payments.map((p, i) => (
        <div key={i}>
          {p.user} | {p.amount} USDT | {p.status} | {p.txid}
        </div>
      ))}
    </div>
  );
}
