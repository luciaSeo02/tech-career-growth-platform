"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "./LoadingScreen";

type Props = { children: ReactNode };

export default function PrivatePageGuard({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
