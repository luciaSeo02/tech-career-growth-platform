"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPost } from "../../utils/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("Token is missing or invalid.");
      return;
    }

    const verify = async () => {
      try {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0";

        await apiPost("/auth/verify-email", { token });

        setMessage("Email verified successfully! Redirecting to login...");

        router.push("/login?verified=true");
      } catch (err: any) {
        setMessage(err?.message || "Something went wrong");
      }
    };

    verify();
  }, [router, searchParams]);

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <p>{message}</p>
    </div>
  );
}
