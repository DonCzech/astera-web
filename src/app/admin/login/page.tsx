"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useContent } from "@/context/ContentContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { refreshAdmin } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Login failed.");
      return;
    }

    // Refresh admin state in context WITHOUT page reload
    await refreshAdmin();
    router.push("/");
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f9f7f7",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 380,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <img src="/images/CBR-logo-black.png" alt="Logo" style={{ height: 48, marginBottom: 28 }} />
        <h1 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", marginTop: 0, marginBottom: 8 }}>
          Admin Login
        </h1>
        <p style={{ fontSize: 13, color: "#767676", marginTop: 0, marginBottom: 28 }}>
          Sign in to edit your website content.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid #dde5f0", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid #dde5f0", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
          </div>

          {error && (
            <div style={{ background: "#fff0f0", border: "1px solid #ffcccc", borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#c00" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", padding: "12px", fontSize: 14 }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 24 }}>
          <a href="/" style={{ color: "#40accd", textDecoration: "none" }}>← Back to site</a>
        </p>
      </div>
    </div>
  );
}
