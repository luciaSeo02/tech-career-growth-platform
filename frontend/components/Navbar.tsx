"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/job-applications", label: "Job Tracker" },
  { href: "/profile", label: "Profile" },
];

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default function Navbar() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (AUTH_ROUTES.includes(pathname)) return null;
  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--bg-border)",
        backgroundColor: "var(--bg-base)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--accent)",
            letterSpacing: "0.05em",
            textDecoration: "none",
          }}
        >
          career<span style={{ color: "var(--text-muted)" }}>/</span>platform
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isActive
                    ? "var(--bg-elevated)"
                    : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              background: "transparent",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-md)",
              padding: "6px 14px",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "all 0.15s ease",
              marginLeft: 8,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--danger)";
              e.currentTarget.style.borderColor = "var(--danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--bg-border)";
            }}
          >
            logout
          </button>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--bg-border)",
            borderRadius: "var(--radius-md)",
            padding: "6px 10px",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "1rem",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            borderTop: "1px solid var(--bg-border)",
            backgroundColor: "var(--bg-surface)",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: isActive
                    ? "var(--accent-dim)"
                    : "transparent",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMenuOpen(false);
              void logout();
            }}
            data-variant="danger"
            style={{ marginTop: 8, padding: "10px", width: "100%" }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
