import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { RoleDistribution } from "@/types/user";

const COLORS = [
  "#00d4aa",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

type Props = { data: RoleDistribution[] };

export default function RoleDistributionChart({ data }: Props) {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text-muted)",
          fontWeight: 500,
          marginBottom: 4,
          marginTop: 0,
        }}
      >
        Role Distribution
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
            dataKey="count"
            nameKey="role"
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
            formatter={(value, name) => [`${value} jobs`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {data.map((entry, index) => (
          <div
            key={entry.role}
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
              {entry.role} ({entry.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
