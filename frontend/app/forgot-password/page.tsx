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
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Forgot Password</h1>
      <p style={{ color: "#6b7280" }}>
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 16, width: "100%" }}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p style={{ marginTop: 16, textAlign: "center" }}>
        <Link href="/login">Back to login</Link>
      </p>
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
