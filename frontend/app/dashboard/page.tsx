"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import {
  JobApplicationStats,
  RecommendationsResult,
  SkillGap,
} from "@/types/user";
import {
  apiGetJobApplicationStats,
  apiGetRecommendations,
  apiGetSkillGap,
} from "@/utils/api";
import StatsCards from "./components/StatsCards";
import ApplicationsByStatus from "./components/ApplicationsByStatus";
import ApplicationsBySource from "./components/ApplicationsBySource";
import ApplicationsByCompanyType from "./components/ApplicationsByCompanyType";
import PrivatePageGuard from "@/components/PrivatePageGuard";

function DashboardContent() {
  const mounted = useMounted();
  const [stats, setStats] = useState<JobApplicationStats | null>(null);
  const [recommendations, setRecommendations] =
    useState<RecommendationsResult | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, recsData, gapData] = await Promise.all([
          apiGetJobApplicationStats(),
          apiGetRecommendations(),
          apiGetSkillGap(),
        ]);
        setStats(statsData);
        setRecommendations(recsData);
        setSkillGap(gapData);
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

  return (
    <div className="page animate-in">
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            Your career growth at a glance
          </p>
        </div>
        <Link href="/job-applications/new">
          <button type="submit" style={{ padding: "9px 20px" }}>
            + Add application
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
        className="market-grid-2"
      >
        {recommendations?.nextStep ? (
          <div
            className="card"
            style={{
              borderLeft: "2px solid var(--accent)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              ⚡ Next Step
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 4,
                }}
              >
                Learn {recommendations.nextStep.skill}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {recommendations.nextStep.marketDemand}{" "}
                {recommendations.roleCategory} jobs require this
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
              {recommendations.nextStep.resources[0] && (
                <a
                  href={recommendations.nextStep.resources[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    type="submit"
                    style={{ padding: "7px 16px", fontSize: "0.8rem" }}
                  >
                    Start learning →
                  </button>
                </a>
              )}
              <Link href="/recommendations">
                <button style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                  View all
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="card"
            style={{
              borderLeft: "2px solid var(--bg-border)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              ⚡ Next Step
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Complete your profile to get personalized recommendations.
            </p>
            <Link href="/profile">
              <button style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                Complete profile →
              </button>
            </Link>
          </div>
        )}

        {skillGap ? (
          <div
            className="card"
            style={{
              borderLeft: `2px solid ${
                skillGap.coveragePercent >= 70
                  ? "var(--success)"
                  : skillGap.coveragePercent >= 40
                    ? "var(--warning)"
                    : "var(--danger)"
              }`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              📊 Market Coverage
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "2.5rem",
                  fontWeight: 600,
                  lineHeight: 1,
                  color:
                    skillGap.coveragePercent >= 70
                      ? "var(--success)"
                      : skillGap.coveragePercent >= 40
                        ? "var(--warning)"
                        : "var(--danger)",
                }}
              >
                {skillGap.coveragePercent}%
              </div>
              <div style={{ paddingBottom: 4 }}>
                <div
                  style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
                >
                  skill coverage
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  for {skillGap.roleCategory}
                </div>
              </div>
            </div>

            <div
              style={{
                height: 4,
                backgroundColor: "var(--bg-border)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${skillGap.coveragePercent}%`,
                  height: "100%",
                  backgroundColor:
                    skillGap.coveragePercent >= 70
                      ? "var(--success)"
                      : skillGap.coveragePercent >= 40
                        ? "var(--warning)"
                        : "var(--danger)",
                  borderRadius: 999,
                  transition: "width 0.8s ease",
                }}
              />
            </div>

            <Link href="/market-insights" style={{ marginTop: "auto" }}>
              <button style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                View skill gap →
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="card"
            style={{
              borderLeft: "2px solid var(--bg-border)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              📊 Market Coverage
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              Add skills to your profile to see your market coverage.
            </p>
            <Link href="/profile">
              <button style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                Add skills →
              </button>
            </Link>
          </div>
        )}
      </div>

      {!stats || stats.total === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "60px 40px",
            borderStyle: "dashed",
          }}
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
            No applications yet
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              marginBottom: 24,
            }}
          >
            Start tracking your job search to see insights here.
          </p>
          <Link href="/job-applications/new">
            <button type="submit">Add your first application →</button>
          </Link>
        </div>
      ) : (
        <>
          <StatsCards stats={stats} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <ApplicationsByStatus stats={stats} />
            <ApplicationsBySource stats={stats} />
            <ApplicationsByCompanyType stats={stats} />
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivatePageGuard>
      <DashboardContent />
    </PrivatePageGuard>
  );
}
