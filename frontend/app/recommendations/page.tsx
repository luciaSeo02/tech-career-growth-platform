"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMounted } from "@/hooks/useMounted";
import {
  RecommendationsResult,
  SkillRecommendation,
  Skill,
} from "@/types/user";
import {
  apiGetRecommendations,
  apiGetSkills,
  apiAddProfileSkill,
} from "@/utils/api";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import {
  FileText,
  GraduationCap,
  Zap,
  Map,
  ChevronDown,
  ChevronUp,
  Target,
  Filter,
  CheckCircle2,
  Clock,
  Circle,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

const PRIORITY_CONFIG = {
  high: { label: "High Priority", color: "var(--danger)" },
  medium: { label: "Medium Priority", color: "var(--warning)" },
  low: { label: "Low Priority", color: "var(--text-muted)" },
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  docs: <FileText size={16} />,
  course: <GraduationCap size={16} />,
  tutorial: <Zap size={16} />,
  roadmap: <Map size={16} />,
};

type SkillProgress = "none" | "in_progress" | "learned";

function RecommendationCard({
  rec,
  index,
  progress,
  onProgressChange,
  onAddToProfile,
  addingToProfile,
}: {
  rec: SkillRecommendation;
  index: number;
  progress: SkillProgress;
  onProgressChange: (skill: string, status: SkillProgress) => void;
  onAddToProfile: (skillName: string) => void;
  addingToProfile: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const priority = PRIORITY_CONFIG[rec.priority];

  const progressConfig = {
    none: {
      icon: <Circle size={16} />,
      label: "Not started",
      color: "var(--text-muted)",
    },
    in_progress: {
      icon: <Clock size={16} />,
      label: "In progress",
      color: "var(--warning)",
    },
    learned: {
      icon: <CheckCircle2 size={16} />,
      label: "Learned",
      color: "var(--success)",
    },
  };

  const currentProgress = progressConfig[progress];
  const nextStatus: Record<SkillProgress, SkillProgress> = {
    none: "in_progress",
    in_progress: "learned",
    learned: "none",
  };

  return (
    <div
      className="card"
      style={{
        borderLeft: `2px solid ${progress === "learned" ? "var(--success)" : progress === "in_progress" ? "var(--warning)" : priority.color}`,
        transition: "all 0.15s ease",
        opacity: progress === "learned" ? 0.75 : 1,
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
                  textDecoration:
                    progress === "learned" ? "line-through" : "none",
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
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProgressChange(rec.skill, nextStatus[progress]);
            }}
            title={`Status: ${currentProgress.label}. Click to change.`}
            style={{
              background: "none",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              color: currentProgress.color,
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
              transition: "all 0.15s ease",
            }}
          >
            {currentProgress.icon}
            <span>{currentProgress.label}</span>
          </button>

          {progress === "learned" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToProfile(rec.skill);
              }}
              disabled={addingToProfile}
              title="Add to your profile skills"
              style={{
                background: "none",
                border: "1px solid var(--success)",
                borderRadius: "var(--radius-sm)",
                cursor: addingToProfile ? "default" : "pointer",
                color: "var(--success)",
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                opacity: addingToProfile ? 0.6 : 1,
              }}
            >
              <PlusCircle size={14} />
              <span>{addingToProfile ? "Adding..." : "Add to profile"}</span>
            </button>
          )}

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-muted)",
            }}
          >
            {rec.resources.length} resources
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
                <span style={{ color: "var(--text-muted)" }}>
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
                <ExternalLink size={14} style={{ color: "var(--accent)" }} />
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
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, SkillProgress>>(
    {},
  );
  const [addingSkill, setAddingSkill] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [result, skills] = await Promise.all([
          apiGetRecommendations(),
          apiGetSkills(),
        ]);
        setData(result);
        setAllSkills(skills);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  const handleProgressChange = (skill: string, status: SkillProgress) => {
    setProgressMap((prev) => ({ ...prev, [skill]: status }));
  };

  const handleAddToProfile = async (skillName: string) => {
    const skill = allSkills.find(
      (s) => s.name.toLowerCase() === skillName.toLowerCase(),
    );

    if (!skill) {
      setMessage({
        type: "error",
        text: `Skill "${skillName}" not found in the system`,
      });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setAddingSkill(skillName);
    try {
      await apiAddProfileSkill({ skillId: skill.id, level: "BEGINNER" });
      setMessage({
        type: "success",
        text: `${skillName} added to your profile!`,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      }
    } finally {
      setAddingSkill(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!mounted) return null;
  if (loading) return <LoadingScreen message="Loading recommendations..." />;

  if (!data) {
    return (
      <div className="page">
        <div
          className="card"
          style={{ textAlign: "center", padding: "48px 32px" }}
        >
          <Target
            size={40}
            style={{ color: "var(--bg-border)", marginBottom: 16 }}
          />
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
  const categories = [...new Set(data.recommendations.map((r) => r.category))];

  const filtered = data.recommendations.filter((rec) => {
    if (priorityFilter !== "all" && rec.priority !== priorityFilter)
      return false;
    if (categoryFilter !== "all" && rec.category !== categoryFilter)
      return false;
    return true;
  });

  const learnedCount = Object.values(progressMap).filter(
    (p) => p === "learned",
  ).length;
  const inProgressCount = Object.values(progressMap).filter(
    (p) => p === "in_progress",
  ).length;
  const totalCount = data.recommendations.length;

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

      {message && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: `1px solid ${message.type === "success" ? "var(--success)" : "var(--danger)"}`,
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: "0.875rem",
            color:
              message.type === "success" ? "var(--success)" : "var(--danger)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {message.type === "success" ? <CheckCircle2 size={16} /> : null}
          {message.text}
        </div>
      )}

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
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Zap size={14} />
              <span>Your Next Step</span>
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
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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

          {(learnedCount > 0 || inProgressCount > 0) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}
            >
              {learnedCount > 0 && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--success)",
                  }}
                >
                  <CheckCircle2 size={13} />
                  {learnedCount}/{totalCount} learned
                </span>
              )}
              {inProgressCount > 0 && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--warning)",
                  }}
                >
                  <Clock size={13} />
                  {inProgressCount} in progress
                </span>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Filter size={14} style={{ color: "var(--text-muted)" }} />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              padding: "4px 8px",
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              padding: "4px 8px",
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {totalCount > 0 && learnedCount > 0 && (
        <div style={{ marginBottom: 20 }}>
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
                width: `${(learnedCount / totalCount) * 100}%`,
                height: "100%",
                backgroundColor: "var(--success)",
                borderRadius: 999,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((rec, index) => (
          <RecommendationCard
            key={rec.skill}
            rec={rec}
            index={index}
            progress={progressMap[rec.skill] || "none"}
            onProgressChange={handleProgressChange}
            onAddToProfile={handleAddToProfile}
            addingToProfile={addingSkill === rec.skill}
          />
        ))}
      </div>

      {filtered.length === 0 && data.recommendations.length > 0 && (
        <div className="card" style={{ textAlign: "center", padding: "32px" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            No recommendations match your filters.
          </p>
          <button
            onClick={() => {
              setPriorityFilter("all");
              setCategoryFilter("all");
            }}
            style={{ marginTop: 12, padding: "7px 16px", fontSize: "0.8rem" }}
          >
            Clear filters
          </button>
        </div>
      )}

      {data.recommendations.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: "32px" }}>
          <p
            style={{
              color: "var(--success)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={16} />
            You already have all the top skills for {data.roleCategory}!
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
