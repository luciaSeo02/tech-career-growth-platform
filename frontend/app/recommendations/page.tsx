"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import { RecommendationsResult, SkillRecommendation } from "@/types/user";
import { apiGetRecommendations } from "@/utils/api";
import PrivatePageGuard from "@/components/PrivatePageGuard";

const PRIORITY_CONFIG = {
  high: { label: "High Priority", color: "var(--danger)" },
  medium: { label: "Medium Priority", color: "var(--warning)" },
  low: { label: "Low Priority", color: "var(--text-muted)" },
};

const TYPE_ICONS = {
  docs: "📄",
  course: "🎓",
  tutorial: "⚡",
  roadmap: "🗺️",
};

function RecommendationCard({
  rec,
  index,
}: {
  rec: SkillRecommendation;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const priority = PRIORITY_CONFIG[rec.priority];

  return (
    <div
      className="card"
      style={{
        borderLeft: `2px solid ${priority.color}`,
        transition: "all 0.15s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: 16,
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {rec.skill}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-elevated)",
                  border: "1px solid var(--bg-border)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                {rec.category}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: priority.color,
                  backgroundColor: `${priority.color}15`,
                  border: `1px solid ${priority.color}40`,
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                {priority.label}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {rec.marketDemand} job listings demand this skill
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
            }}
          >
            {rec.resources.length} resources
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {expanded && rec.resources.length > 0 && (
        <div
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid var(--bg-border)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {rec.resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--bg-border)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                transition: "all 0.15s ease",
                gap: 12,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bg-border)";
                e.currentTarget.style.backgroundColor = "var(--bg-elevated)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1rem" }}>
                  {TYPE_ICONS[resource.type]}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {resource.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      textTransform: "capitalize",
                    }}
                  >
                    {resource.type}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                {resource.free && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--success)",
                      backgroundColor: "#10b98120",
                      border: "1px solid #10b98140",
                      borderRadius: 999,
                      padding: "2px 8px",
                    }}
                  >
                    Free
                  </span>
                )}
                <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function RecommendationsContent() {
  const mounted = useMounted();
  const [data, setData] = useState<RecommendationsResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiGetRecommendations();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  if (!mounted) return null;
  if (loading)
    return (
      <div
        className="page"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
        }}
      >
        loading...
      </div>
    );

  if (!data) {
    return (
      <div className="page">
        <div
          className="card"
          style={{ textAlign: "center", padding: "48px 32px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "2rem",
              color: "var(--bg-border)",
              marginBottom: 16,
            }}
          >
            ◎
          </div>
          <h3 style={{ marginBottom: 8, color: "var(--text-secondary)" }}>
            No recommendations yet
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              marginBottom: 24,
            }}
          >
            Complete your profile with your skills and target role to get
            personalized recommendations.
          </p>
          <Link href="/profile">
            <button type="submit" style={{ padding: "9px 20px" }}>
              Complete profile →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page animate-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 6 }}>Recommendations</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Personalized learning path based on{" "}
          <span
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
          >
            {data.totalAnalyzed}
          </span>{" "}
          {data.roleCategory} job listings
        </p>
      </div>

      {data.nextStep && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 24px",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              ⚡ Your next step
            </div>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Learn {data.nextStep.skill}
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: 4,
              }}
            >
              {data.nextStep.marketDemand} {data.roleCategory} jobs require this
              skill
            </div>
          </div>
          {data.nextStep.resources[0] && (
            <a
              href={data.nextStep.resources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="submit" style={{ padding: "9px 20px" }}>
                Start learning →
              </button>
            </a>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Target role:
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--accent)",
            backgroundColor: "var(--accent-dim)",
            border: "1px solid var(--accent)",
            borderRadius: 999,
            padding: "2px 10px",
          }}
        >
          {data.targetRole}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.recommendations.map((rec, index) => (
          <RecommendationCard key={rec.skill} rec={rec} index={index} />
        ))}
      </div>

      {data.recommendations.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "32px" }}>
          <p style={{ color: "var(--success)", fontSize: "0.875rem" }}>
            ✓ You already have all the top skills for {data.roleCategory}!
          </p>
        </div>
      )}
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <PrivatePageGuard>
      <RecommendationsContent />
    </PrivatePageGuard>
  );
}
