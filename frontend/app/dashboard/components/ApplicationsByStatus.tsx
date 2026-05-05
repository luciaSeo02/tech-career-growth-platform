import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { JobApplicationStats, ApplicationStatus } from "@/types/user";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  SAVED: "#4a5568",
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  GHOSTED: "#8b5cf6",
};

type Props = { stats: JobApplicationStats };

export default function ApplicationsByStatus({ stats }: Props) {
  const data = Object.entries(stats.byStatus)
    .filter(([, count]) => (count ?? 0) > 0)
    .map(([status, count]) => ({
      name: status.charAt(0) + status.slice(1).toLowerCase(),
      value: count ?? 0,
      color: STATUS_COLORS[status as ApplicationStatus],
    }));

  return (
    <div className="card">
      <h3
        style={{
          marginBottom: 4,
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text-muted)",
          fontWeight: 500,
        }}
      >
        By Status
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 16, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--bg-border)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
            }}
            cursor={{ fill: "var(--bg-hover)" }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
