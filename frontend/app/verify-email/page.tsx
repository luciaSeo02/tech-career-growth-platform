"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPost } from "../../utils/api";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Token is missing or invalid.");
        return;
      }

      try {
        await apiPost("/auth/verify-email", { token });
        setStatus("success");
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => router.push("/login?verified=true"), 1500);
      } catch (err: unknown) {
        setStatus("error");
        if (err instanceof Error) setMessage(err.message);
        else setMessage("Something went wrong. Please try again.");
      }
    };

    void verify();
  }, [router, searchParams]);

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
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 32,
          textAlign: "center",
        }}
      >
        {status === "loading" && (
          <>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                color: "var(--accent)",
                marginBottom: 16,
              }}
            >
              ◎
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Verifying your email...
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                color: "var(--success)",
                marginBottom: 16,
              }}
            >
              ✓
            </div>
            <p style={{ color: "var(--success)", fontSize: "0.875rem" }}>
              {message}
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1.5rem",
                color: "var(--danger)",
                marginBottom: 16,
              }}
            >
              ✕
            </div>
            <p
              style={{
                color: "var(--danger)",
                fontSize: "0.875rem",
                marginBottom: 16,
              }}
            >
              {message}
            </p>
            <a
              href="/login"
              style={{ fontSize: "0.875rem", color: "var(--accent)" }}
            >
              Back to login →
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
