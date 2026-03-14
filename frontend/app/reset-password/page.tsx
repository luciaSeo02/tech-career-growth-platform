"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await apiPost("/users/reset-password", { token, newPassword });
      router.push("/login?reset=true");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
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
          className="card"
          style={{ padding: 28, textAlign: "center", maxWidth: 400 }}
        >
          <p style={{ color: "var(--danger)", marginBottom: 16 }}>
            Invalid or missing reset link.
          </p>
          <Link
            href="/forgot-password"
            style={{ color: "var(--accent)", fontSize: "0.875rem" }}
          >
            Request a new one →
          </Link>
        </div>
      </div>
    );
  }

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
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            career/platform
          </span>
          <h1 style={{ marginTop: 12, fontSize: "1.75rem" }}>New password</h1>
          <p
            style={{
              marginTop: 8,
              fontSize: "0.875rem",
              color: "var(--text-muted)",
            }}
          >
            Choose a strong password for your account.
          </p>
        </div>

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
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  marginTop: 4,
                }}
              >
                Minimum 6 characters
              </small>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "11px", marginTop: 4 }}
            >
              {loading ? "Resetting..." : "Reset password →"}
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

export default function ResetPasswordPage() {
  return (
    <AuthPageGuard>
      <ResetPasswordContent />
    </AuthPageGuard>
  );
}
