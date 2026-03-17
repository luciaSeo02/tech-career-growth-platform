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
import { WorkModeDistribution } from "@/types/user";

const COLORS: Record<string, string> = {
  REMOTE: "#00d4aa",
  HYBRID: "#3b82f6",
  ONSITE: "#f59e0b",
};

type Props = { data: WorkModeDistribution[] };

export default function WorkModeChart({ data }: Props) {
  const specifiedData = data.filter(
    (d) => d.mode !== "NOT_SPECIFIED" && d.mode !== "ONSITE",
  );

  const totalSpecified = specifiedData.reduce((sum, d) => sum + d.count, 0);
  const totalAll = data.reduce((sum, d) => sum + d.count, 0);
  const notSpecifiedCount =
    (data.find((d) => d.mode === "NOT_SPECIFIED")?.count ?? 0) +
    (data.find((d) => d.mode === "ONSITE")?.count ?? 0);
  const notSpecifiedPercent =
    totalAll > 0 ? Math.round((notSpecifiedCount / totalAll) * 100) : 0;

  if (specifiedData.length === 0) return null;

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 4,
        }}
      >
        <h3
          style={{
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-muted)",
            fontWeight: 500,
            margin: 0,
          }}
        >
          Work Mode
        </h3>
        <span
          style={{
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: "var(--radius-sm)",
            padding: "2px 8px",
          }}
        >
          {notSpecifiedPercent}% not specified
        </span>
      </div>

      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginBottom: 12,
        }}
      >
        Based on {totalSpecified} jobs with explicit work mode
      </p>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={specifiedData}
          margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--bg-border)"
            vertical={false}
          />
          <XAxis
            dataKey="mode"
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
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {specifiedData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.mode] ?? "var(--text-muted)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
