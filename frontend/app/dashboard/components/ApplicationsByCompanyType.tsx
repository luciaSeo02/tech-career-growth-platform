import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { JobApplicationStats } from "@/types/user";

const COLORS = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#84cc16",
  "#6b7280",
];

type Props = { stats: JobApplicationStats };

export default function ApplicationsByCompanyType({ stats }: Props) {
  const data = Object.entries(stats.byCompanyType)
    .filter(([, count]) => (count ?? 0) > 0)
    .map(([type, count]) => ({
      name: type.charAt(0) + type.slice(1).toLowerCase(),
      value: count ?? 0,
    }));

  if (data.length === 0) return null;

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
        By Company Type
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
        {data.map((entry, index) => (
          <div
            key={entry.name}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: COLORS[index % COLORS.length],
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
