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
      name: type,
      value: count ?? 0,
    }));

  if (data.length === 0) return null;

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 24 }}>
      <h3 style={{ marginBottom: 16, marginTop: 0 }}>By Company Type</h3>
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
