"use client";

import { useAuth } from "@/context/AuthContext";
import Dashboard from "./dashboard/page";
import LandingPage from "./landing/page";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}
