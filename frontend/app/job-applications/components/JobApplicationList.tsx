import {
  JobApplication,
  JobApplicationStats,
  ApplicationStatus,
} from "@/types/user";
import JobApplicationCard from "./JobApplicationCard";
import Link from "next/link";

const STATUS_ORDER: ApplicationStatus[] = [
  "INTERVIEW",
  "OFFER",
  "APPLIED",
  "SAVED",
  "GHOSTED",
  "REJECTED",
];

type Props = {
  applications: JobApplication[];
  stats: JobApplicationStats | null;
  onDelete: (id: string) => void;
};

export default function JobApplicationList({
  applications,
  stats,
  onDelete,
}: Props) {
  const sorted = [...applications].sort((a, b) => {
    const aIdx = STATUS_ORDER.indexOf(a.status);
    const bIdx = STATUS_ORDER.indexOf(b.status);
    if (aIdx !== bIdx) return aIdx - bIdx;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (applications.length === 0) {
    return (
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
          Start tracking your job search.
        </p>
        <Link href="/job-applications/new">
          <button type="submit">Add your first application →</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {stats && stats.total > 0 && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {(
            [
              "APPLIED",
              "INTERVIEW",
              "OFFER",
              "REJECTED",
              "GHOSTED",
            ] as ApplicationStatus[]
          ).map((status) => {
            const count = stats.byStatus[status] ?? 0;
            if (count === 0) return null;
            return (
              <span
                key={status}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--bg-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "4px 10px",
                }}
              >
                {status.toLowerCase()} · {count}
              </span>
            );
          })}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--accent)",
              backgroundColor: "var(--accent-dim)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-sm)",
              padding: "4px 10px",
              marginLeft: "auto",
            }}
          >
            total · {stats.total}
          </span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((app) => (
          <JobApplicationCard
            key={app.id}
            application={app}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
