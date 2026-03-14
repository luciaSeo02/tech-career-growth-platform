import { JobApplicationStats, ApplicationStatus } from "@/types/user";

const STATUS_LABELS: Partial<
  Record<ApplicationStatus, { label: string; color: string }>
> = {
  APPLIED: { label: "Applied", color: "#3b82f6" },
  INTERVIEW: { label: "Interviews", color: "#f59e0b" },
  OFFER: { label: "Offers", color: "#10b981" },
  REJECTED: { label: "Rejected", color: "#ef4444" },
  GHOSTED: { label: "Ghosted", color: "#9ca3af" },
};

type Props = { stats: JobApplicationStats };

export default function StatsCards({ stats }: Props) {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Card label="Total Applications" value={stats.total} color="#111" />
      {Object.entries(STATUS_LABELS).map(([status, { label, color }]) => {
        const value = stats.byStatus[status as ApplicationStatus] ?? 0;
        return <Card key={status} label={label} value={value} color={color} />;
      })}
    </div>
  );
}

function Card({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "16px 24px",
        minWidth: 120,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 32, fontWeight: "bold", color }}>{value}</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}
