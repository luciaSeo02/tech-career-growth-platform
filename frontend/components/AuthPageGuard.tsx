"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/utils/api";

type Props = { children: ReactNode };

export default function AuthPageGuard({ children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiGet("/users/me");
        router.replace("/profile");
      } catch {
        setReady(true);
      }
    };

    void checkSession();
  }, [router]);

  if (!ready) {
    return <div className="page">loading...</div>;
  }

  return <>{children}</>;
}
