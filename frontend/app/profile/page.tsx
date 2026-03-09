"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

type JwtPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const data = await apiGet<JwtPayload>("/users/profile", token);
        setUser(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error");
      }
    };

    void fetchProfile();
  }, [token]);

  if (!token) return <p>Please login</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>
      <p>ID: {user.sub}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
