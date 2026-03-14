"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/utils/api";

type Props = { children: ReactNode };

export default function PrivatePageGuard({ children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await apiGet("/users/me");
        setReady(true);
      } catch {
        router.replace("/login");
      }
    };

    void checkSession();
  }, [router]);

  if (!ready) return null;

  return <>{children}</>;
}
