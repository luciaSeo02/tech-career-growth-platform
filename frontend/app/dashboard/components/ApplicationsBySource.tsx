import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { JobApplicationStats } from "@/types/user";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#6b7280",
];

type Props = { stats: JobApplicationStats };

export default function ApplicationsBySource({ stats }: Props) {
  const data = Object.entries(stats.bySource)
    .filter(([, count]) => (count ?? 0) > 0)
    .map(([source, count]) => ({
      name: source,
      value: count ?? 0,
    }));

  if (data.length === 0) return null;

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 24 }}>
      <h3 style={{ marginBottom: 16, marginTop: 0 }}>By Source</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }: { name: string; percent: number }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
