import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // If neither telegram login nor email login exists → redirect
    if (!storedUser && !token) {
      navigate("/");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Email login user (JWT only)
    if (!storedUser && token) {
      setUser({
        is_premium: false,
        is_admin: false
      });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  const tools = [
    ["keyword", "🔑 Keyword Generator"],
    ["title", "🏷 Title Generator"],
    ["seo", "🔍 SEO Analyzer"],
    ["rank", "📊 Rank Tracker"],
    ["spy", "🕵 Competitor Spy"],
    ["thumbnail", "🖼 Thumbnail AI"],
    ["viral", "🔥 Viral Ideas"],
    ["content", "📝 Content Generator"],
    ["trending", "📈 Trending Videos"],
    ["growth", "💡 Growth Mentor"]
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b1220",
      color: "white",
      padding: 40
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>🚀 YouToolsPro AI Dashboard</h1>
          <p>All Tools to Rank, Trend & Monetize</p>

          <p style={{ marginTop: 10 }}>
            Account Status: {user?.is_admin ? "👑 Admin" : user?.is_premium ? "💎 Premium" : "🆓 Free"}
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 16px",
            background: "#ef4444",
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Tools Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
        marginTop: 30
      }}>
        {tools.map(([slug, label]) => (
          <Link
            key={slug}
            to={`/tool/${slug}`}
            style={{
              padding: 16,
              background: "#1e293b",
              borderRadius: 10,
              textAlign: "center",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold"
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Business Section */}
      <div style={{ marginTop: 40 }}>

        {!user?.is_premium && (
          <Link to="/premium" style={btnStyle}>💎 Premium (5 USDT)</Link>
        )}

        <Link to="/referral" style={btnStyle}>🎁 Referral Program</Link>
        <Link to="/promo" style={btnStyle}>🏷 Promo Code</Link>
        <Link to="/support" style={btnStyle}>🎟 Support</Link>

        <a
          href="https://t.me/YouToolsPro"
          target="_blank"
          rel="noreferrer"
          style={btnStyle}
        >
          📢 Join Channel
        </a>

        {user?.is_admin && (
          <Link to="/admin" style={{ ...btnStyle, background: "#7c3aed" }}>
            👑 Admin Panel
          </Link>
        )}
      </div>
    </div>
  );
}

const btnStyle = {
  display: "block",
  marginTop: 15,
  padding: 16,
  background: "#2563eb",
  borderRadius: 10,
  textAlign: "center",
  textDecoration: "none",
  color: "white",
  fontWeight: "bold"
};
