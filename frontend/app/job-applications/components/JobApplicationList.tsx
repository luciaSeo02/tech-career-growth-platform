import {
  JobApplication,
  JobApplicationStats,
  ApplicationStatus,
} from "@/types/user";
import JobApplicationCard from "./JobApplicationCard";

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  SAVED: "Saved",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  GHOSTED: "Ghosted",
};

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
  return (
    <div>
      {stats && (
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <StatCard label="Total" value={stats.total} />
          {Object.entries(STATUS_LABELS).map(([status, label]) => {
            const count = stats.byStatus[status as ApplicationStatus] ?? 0;
            if (count === 0) return null;
            return <StatCard key={status} label={label} value={count} />;
          })}
        </div>
      )}

      {applications.length === 0 ? (
        <p style={{ color: "#6b7280" }}>
          No applications yet. Click &quot;Add Application&quot; to start
          tracking.
        </p>
      ) : (
        applications.map((app) => (
          <JobApplicationCard
            key={app.id}
            application={app}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "12px 20px",
        minWidth: 80,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div>
    </div>
  );
}
