"use client";
import { useState, useEffect } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  });

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);

    document.cookie = `token=${jwt}; path=/; max-age=3600`;

    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");

    document.cookie = "token=; path=/; max-age=0";

    setToken(null);
  };

  return { token, login, logout };
}
