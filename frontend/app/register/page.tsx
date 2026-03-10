"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { apiPost } from "../../utils/api";
import AuthPageGuard from "@/components/AuthPageGuard";

type RegisterResponse = {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
};

type RegisterApiResponse = RegisterResponse;

function RegisterPageContent() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await apiPost<
        RegisterApiResponse,
        { name: string; email: string; password: string }
      >("/users/register", { name, email, password });

      router.push("/login?registered=true");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Register</h1>

      {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button label="Register" type="submit" />
      </form>
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
