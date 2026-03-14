"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/profile", label: "Profile" },
  { href: "/job-applications", label: "Job Tracker" },
];

const AUTH_ROUTES = ["/login", "/register"];

export default function Navbar() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) return null;
  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 40px",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link
          href="/"
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textDecoration: "none",
            color: "#111",
          }}
        >
          CareerPlatform
        </Link>
        <div style={{ display: "flex", gap: 16 }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: pathname.startsWith(link.href) ? "#3b82f6" : "#374151",
                fontWeight: pathname.startsWith(link.href) ? "600" : "normal",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={logout}
        style={{
          background: "none",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          padding: "6px 14px",
          cursor: "pointer",
          color: "#374151",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
