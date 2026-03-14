"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { JobApplicationStats } from "@/types/user";
import { apiGetJobApplicationStats } from "@/utils/api";
import StatsCards from "./components/StatsCards";
import ApplicationsByStatus from "./components/ApplicationsByStatus";
import ApplicationsBySource from "./components/ApplicationsBySource";
import ApplicationsByCompanyType from "./components/ApplicationsByCompanyType";
import PrivatePageGuard from "@/components/PrivatePageGuard";

function DashboardContent() {
  const mounted = useMounted();
  const [stats, setStats] = useState<JobApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiGetJobApplicationStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    void fetchStats();
  }, []);

  if (!mounted) return null;
  if (loading)
    return (
      <div
        className="page"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
        }}
      >
        loading...
      </div>
    );

  return (
    <div className="page animate-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Your job search at a glance
          </p>
        </div>
        <Link href="/job-applications/new">
          <button type="submit" style={{ padding: "9px 20px" }}>
            + Add application
          </button>
        </Link>
      </div>

      {!stats || stats.total === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "60px 40px",
            borderStyle: "dashed",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "2rem",
              color: "var(--bg-border)",
              marginBottom: 16,
            }}
          >
            ◎
          </div>
          <h3 style={{ marginBottom: 8, color: "var(--text-secondary)" }}>
            No applications yet
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              marginBottom: 24,
            }}
          >
            Start tracking your job search to see insights here.
          </p>
          <Link href="/job-applications/new">
            <button type="submit">Add your first application →</button>
          </Link>
        </div>
      ) : (
        <>
          <StatsCards stats={stats} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <ApplicationsByStatus stats={stats} />
            <ApplicationsBySource stats={stats} />
            <ApplicationsByCompanyType stats={stats} />
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivatePageGuard>
      <DashboardContent />
    </PrivatePageGuard>
  );
}
