import Link from "next/link";
import { JobApplication, ApplicationStatus } from "@/types/user";

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  SAVED: { label: "Saved", color: "var(--status-saved)" },
  APPLIED: { label: "Applied", color: "var(--status-applied)" },
  INTERVIEW: { label: "Interview", color: "var(--status-interview)" },
  OFFER: { label: "Offer", color: "var(--status-offer)" },
  REJECTED: { label: "Rejected", color: "var(--status-rejected)" },
  GHOSTED: { label: "Ghosted", color: "var(--status-ghosted)" },
};

type Props = {
  application: JobApplication;
  onDelete: (id: string) => void;
};

export default function JobApplicationCard({ application, onDelete }: Props) {
  const status = STATUS_CONFIG[application.status];

  return (
    <div
      className="card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        padding: "16px 20px",
        borderLeft: `2px solid ${status.color}`,
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderLeftColor =
          status.color;
        (e.currentTarget as HTMLDivElement).style.background =
          "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "var(--bg-surface)";
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "var(--text-primary)",
            }}
          >
            {application.role}
          </span>
          <span
            className="badge"
            style={{
              backgroundColor: `${status.color}20`,
              color: status.color,
              border: `1px solid ${status.color}40`,
            }}
          >
            {status.label}
          </span>
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
          }}
        >
          {application.company}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 8,
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {application.location && <span>📍 {application.location}</span>}
          {application.workMode && <span>{application.workMode}</span>}
          {application.source && (
            <span
              style={{ textTransform: "uppercase", letterSpacing: "0.03em" }}
            >
              {application.source.replace(/_/g, " ")}
            </span>
          )}
          {application.salaryMin && (
            <span>
              {application.salaryMin.toLocaleString()}
              {application.salaryMax
                ? `–${application.salaryMax.toLocaleString()}`
                : "+"}{" "}
              €
            </span>
          )}
          {application.appliedAt && (
            <span>
              {new Date(application.appliedAt).toLocaleDateString("en-GB")}
            </span>
          )}
        </div>

        {application.skills.length > 0 && (
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}
          >
            {application.skills.map((s) => (
              <span
                key={s.skillId}
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--bg-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "2px 8px",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.skill.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}
      >
        {application.url && (
          <a
            href={application.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              padding: "5px 10px",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
            }}
          >
            ↗
          </a>
        )}
        <Link href={`/job-applications/${application.id}`}>
          <button style={{ fontSize: "0.8rem", padding: "5px 12px" }}>
            Edit
          </button>
        </Link>
        <button
          data-variant="danger"
          style={{ fontSize: "0.8rem", padding: "5px 12px" }}
          onClick={() => onDelete(application.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
