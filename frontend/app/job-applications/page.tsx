"use client";

import Link from "next/link";
import { useJobApplications } from "./hooks/useJobApplications";
import JobApplicationList from "./components/JobApplicationList";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";

function JobApplicationsContent() {
  const { applications, stats, loading, errorMessage, handleDelete } =
    useJobApplications();

  if (loading) return <LoadingScreen message="Loading applications..." />;

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
          <h1 style={{ marginBottom: 6 }}>Job Applications</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Track every opportunity in your pipeline
          </p>
        </div>
        <Link href="/job-applications/new">
          <button type="submit" style={{ padding: "9px 20px" }}>
            + Add application
          </button>
        </Link>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--danger)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: "0.875rem",
            color: "var(--danger)",
          }}
        >
          {errorMessage}
        </div>
      )}

      <JobApplicationList
        applications={applications}
        stats={stats}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default function JobApplicationsPage() {
  return (
    <PrivatePageGuard>
      <JobApplicationsContent />
    </PrivatePageGuard>
  );
}
