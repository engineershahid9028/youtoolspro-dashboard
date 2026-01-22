const API = "https://web-production-1d44e.up.railway.app";

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Invalid login");

  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Registration failed");

  return res.json();
}

export function saveSession(token) {
  localStorage.setItem("token", token);
}

export function getSession() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}
