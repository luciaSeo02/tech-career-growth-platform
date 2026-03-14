import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { JobApplicationStats, ApplicationStatus } from "@/types/user";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  SAVED: "#6b7280",
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  GHOSTED: "#9ca3af",
};

type Props = { stats: JobApplicationStats };

export default function ApplicationsByStatus({ stats }: Props) {
  const data = Object.entries(stats.byStatus).map(([status, count]) => ({
    name: status,
    value: count ?? 0,
    fill: STATUS_COLORS[status as ApplicationStatus],
  }));

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 24 }}>
      <h3 style={{ marginBottom: 16, marginTop: 0 }}>By Status</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <rect key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
