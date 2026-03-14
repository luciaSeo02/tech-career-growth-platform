"use client";

import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { useJobApplications } from "./hooks/useJobApplications";
import JobApplicationList from "./components/JobApplicationList";
import PrivatePageGuard from "@/components/PrivatePageGuard";

function JobApplicationsContent() {
  const mounted = useMounted();
  const { applications, stats, loading, errorMessage, handleDelete } =
    useJobApplications();

  if (!mounted) return null;
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1>Job Applications</h1>
        <Link href="/job-applications/new">
          <button>+ Add Application</button>
        </Link>
      </div>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: 16 }}>{errorMessage}</div>
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
