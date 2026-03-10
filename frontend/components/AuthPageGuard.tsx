"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Props = { children: ReactNode };

export default function AuthPageGuard({ children }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (token) {
      router.replace("/profile");
    } else {
      const id = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(id);
    }
  }, [token, router]);

  if (!ready) return null;

  return <>{children}</>;
}
