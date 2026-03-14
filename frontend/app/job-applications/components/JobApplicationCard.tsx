import Link from "next/link";
import { JobApplication, ApplicationStatus } from "@/types/user";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  SAVED: "#6b7280",
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  GHOSTED: "#9ca3af",
};

type Props = {
  application: JobApplication;
  onDelete: (id: string) => void;
};

export default function JobApplicationCard({ application, onDelete }: Props) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <strong style={{ fontSize: 16 }}>{application.role}</strong>
          <span
            style={{
              backgroundColor: STATUS_COLORS[application.status],
              color: "white",
              borderRadius: 12,
              padding: "2px 10px",
              fontSize: 12,
            }}
          >
            {application.status}
          </span>
        </div>
        <p style={{ margin: "4px 0", color: "#374151" }}>
          {application.company}
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 4,
            fontSize: 13,
            color: "#6b7280",
          }}
        >
          {application.location && <span>📍 {application.location}</span>}
          {application.workMode && <span>💼 {application.workMode}</span>}
          {application.source && <span>🔗 {application.source}</span>}
          {application.appliedAt && (
            <span>
              📅 {new Date(application.appliedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        {application.skills.length > 0 && (
          <div
            style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}
          >
            {application.skills.map((s) => (
              <span
                key={s.skillId}
                style={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 12,
                }}
              >
                {s.skill.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <Link href={`/job-applications/${application.id}`}>
          <button>Edit</button>
        </Link>
        <button
          style={{
            color: "white",
            backgroundColor: "#ef4444",
            border: "none",
            borderRadius: 4,
            padding: "4px 10px",
            cursor: "pointer",
          }}
          onClick={() => onDelete(application.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
