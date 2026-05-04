"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "./landing/page";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <LoadingScreen />;
  if (isAuthenticated) return <LoadingScreen message="Redirecting..." />;

  return <LandingPage />;
}
