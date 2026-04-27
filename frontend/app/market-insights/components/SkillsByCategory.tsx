type Props = {
  byCategory: Record<string, { skill: string; count: number }[]>;
};

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#3b82f6",
  Backend: "#10b981",
  DevOps: "#f59e0b",
  Cloud: "#8b5cf6",
  Database: "#ec4899",
  "Data & AI": "#14b8a6",
  Mobile: "#f97316",
  Testing: "#6366f1",
  Security: "#ef4444",
  "Programming Language": "#84cc16",
};

export default function SkillsByCategory({ byCategory }: Props) {
  return (
    <div className="card">
      <h3
        style={{
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "var(--text-muted)",
          fontWeight: 500,
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        Skills by Category
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(byCategory)
          .sort((a, b) => b[1][0]?.count - a[1][0]?.count)
          .map(([category, skills]) => {
            const color = CATEGORY_COLORS[category] ?? "var(--text-muted)";
            const maxCount = skills[0]?.count ?? 1;
            return (
              <div key={category}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {category}
                  </span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  {skills.slice(0, 5).map((s, i) => (
                    <div
                      key={`${category}-${s.skill}-${i}`}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                          minWidth: 120,
                          flexShrink: 0,
                        }}
                      >
                        {s.skill}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          height: 4,
                          backgroundColor: "var(--bg-border)",
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${(s.count / maxCount) * 100}%`,
                            height: "100%",
                            backgroundColor: color,
                            borderRadius: 999,
                            transition: "width 0.5s ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                          minWidth: 24,
                          textAlign: "right",
                        }}
                      >
                        {s.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
