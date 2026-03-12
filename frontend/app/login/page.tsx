"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { apiPost } from "../../utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const verified = searchParams.get("verified");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await apiPost("/auth/login", { email, password });

      window.location.href = "/profile";
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Login</h1>

      {registered && (
        <p style={{ color: "green", marginBottom: 16 }}>
          Account created! Please verify your email before logging in.
        </p>
      )}

      {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

      {verified === "true" && (
        <p style={{ color: "green", marginBottom: 16 }}>
          Your email has been successfully verified! Please log in.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Login" type="submit" />
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthPageGuard>
      <LoginPageContent />
    </AuthPageGuard>
  );
}
