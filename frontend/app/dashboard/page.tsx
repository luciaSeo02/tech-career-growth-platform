"use client";

import { useEffect, useState } from "react";
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
  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No data yet.</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 24 }}>Dashboard</h1>

      <StatsCards stats={stats} />

      {stats.total > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginTop: 32,
          }}
        >
          <ApplicationsByStatus stats={stats} />
          <ApplicationsBySource stats={stats} />
          <ApplicationsByCompanyType stats={stats} />
        </div>
      ) : (
        <p style={{ color: "#6b7280", marginTop: 32 }}>
          No applications yet. Start tracking your job search to see insights
          here.
        </p>
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
