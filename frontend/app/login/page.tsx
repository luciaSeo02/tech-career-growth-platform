"use client";
import { useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import { apiPost } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

type LoginResponse = {
  access_token: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const data: LoginResponse = await apiPost<LoginResponse>("/auth/login", {
        email,
        password,
      });
      login(data.access_token);
      router.push("/profile");
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
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
  );
}
