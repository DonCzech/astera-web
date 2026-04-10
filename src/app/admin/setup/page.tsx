"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Setup failed.");
      return;
    }

    router.push("/admin/login");
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
        maxWidth: 420,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <img src="/images/CBR-logo-black.png" alt="Logo" style={{ height: 48, marginBottom: 28 }} />
        <h1 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", marginTop: 0, marginBottom: 8 }}>
          Create Admin Account
        </h1>
        <p style={{ fontSize: 13, color: "#767676", marginTop: 0, marginBottom: 28 }}>
          This is a one-time setup. Only one admin account is allowed.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid #dde5f0", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: "1px solid #dde5f0", borderRadius: 8, fontSize: 14, outline: "none" }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
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
            {loading ? "Creating…" : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
