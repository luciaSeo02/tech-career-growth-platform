"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost } from "@/utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

function RegisterPageContent() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await apiPost("/users/register", { name, email, password });
      router.push("/login?registered=true");
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
          <h1 style={{ marginTop: 12, fontSize: "1.75rem" }}>Create account</h1>
          <p
            style={{
              marginTop: 8,
              fontSize: "0.875rem",
              color: "var(--text-muted)",
            }}
          >
            Start tracking your career growth
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
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
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
                minLength={6}
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "11px", marginTop: 4 }}
            >
              {loading ? "Creating account..." : "Create account →"}
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
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent)" }}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthPageGuard>
      <RegisterPageContent />
    </AuthPageGuard>
  );
}
