"use client";

import { useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { apiPost } from "../../utils/api";
import { useRouter } from "next/navigation";

type RegisterResponse = {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const data: RegisterResponse = await apiPost<RegisterResponse>(
        "/users/register",
        { name, email, password },
      );
      console.log("Registered user:", data);
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "40px auto" }}
    >
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
  );
}
