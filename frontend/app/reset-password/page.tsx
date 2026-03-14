"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    return <p style={{ color: "red" }}>Invalid reset link.</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Reset Password</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 16, width: "100%" }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
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
