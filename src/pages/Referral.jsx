export default function Referral() {
  const user = JSON.parse(localStorage.getItem("user"));
  const link = `https://t.me/YoutoolsPro_Bot?start=${user.telegram_id}`;

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>🎁 Referral Program</h2>

      <p>Your referral link:</p>
      <input value={link} readOnly style={{ width: "100%" }} />
    </div>
  );
}
