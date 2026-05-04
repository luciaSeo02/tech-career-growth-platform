"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiPost("/auth/login", { email, password });

      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
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
            }}
          >
            my/trckr
          </Link>
          <h1 style={{ marginTop: 12, fontSize: "1.75rem" }}>Welcome back</h1>
          <p
            style={{
              marginTop: 8,
              fontSize: "0.875rem",
              color: "var(--text-muted)",
            }}
          >
            Sign in to continue your journey
          </p>
        </div>

        {registered && (
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
            Account created — please verify your email before logging in.
          </div>
        )}
        {verified === "true" && (
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
            Email verified successfully — you can now log in.
          </div>
        )}
        {reset === "true" && (
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
            Password reset successfully — you can now log in.
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div
              style={{ textAlign: "right", marginBottom: 20, marginTop: -8 }}
            >
              <Link
                href="/forgot-password"
                style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "11px" }}
            >
              {loading ? "Signing in..." : "Sign in →"}
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
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--accent)" }}>
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageGuard>
        <LoginPageContent />
      </AuthPageGuard>
    </Suspense>
  );
}
