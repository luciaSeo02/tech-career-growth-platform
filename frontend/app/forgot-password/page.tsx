"use client";

import { useState } from "react";
import Link from "next/link";
import { apiPost } from "@/utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await apiPost<{ message: string }, { email: string }>(
        "/users/forgot-password",
        { email },
      );
      setMessage(res.message);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 300,
          background:
            "radial-gradient(ellipse, var(--accent-dim) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            my/trckr
          </Link>
          <h1 style={{ marginTop: 12, fontSize: "1.75rem" }}>Reset password</h1>
          <p
            style={{
              marginTop: 8,
              fontSize: "0.875rem",
              color: "var(--text-muted)",
            }}
          >
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {message && (
          <div
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--success)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: "0.875rem",
              color: "var(--success)",
            }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--danger)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: "0.875rem",
              color: "var(--danger)",
            }}
          >
            {error}
          </div>
        )}

        <div className="card" style={{ padding: 28 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !!message}
              style={{ width: "100%", padding: "11px" }}
            >
              {loading ? "Sending..." : "Send reset link →"}
            </button>
          </form>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: "0.875rem",
            color: "var(--text-muted)",
          }}
        >
          <Link href="/login" style={{ color: "var(--accent)" }}>
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageGuard>
      <ForgotPasswordContent />
    </AuthPageGuard>
  );
}
