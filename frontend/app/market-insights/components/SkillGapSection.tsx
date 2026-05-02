import { SkillGap } from "@/types/user";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

type Props = { skillGap: SkillGap | null };

export default function SkillGapSection({ skillGap }: Props) {
  if (!skillGap) {
    return (
      <div
        className="card"
        style={{ textAlign: "center", padding: "32px 24px" }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            marginBottom: 16,
          }}
        >
          Complete your profile to see your skill gap analysis.
        </p>
        <Link href="/profile">
          <button type="submit" style={{ padding: "8px 20px" }}>
            Complete profile →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 8,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
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
            Your Skill Gap
          </h3>
          <div
            style={{
              marginTop: 6,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
            >
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
              {skillGap.targetRole}
            </span>
          </div>
          {skillGap.roleCategory === "Other" && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--warning)",
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Lightbulb size={13} style={{ flexShrink: 0 }} />
              Add a more specific role to your profile for better results
            </p>
          )}
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: 4,
            }}
          >
            Based on{" "}
            <span
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {skillGap.totalAnalyzed}
            </span>{" "}
            {skillGap.roleCategory} job listings
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.5rem",
              fontWeight: 600,
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
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              market coverage
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              for {skillGap.roleCategory}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--success)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            ✓ You have ({skillGap.matched.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skillGap.matched.map((s) => (
              <span
                key={s.skill}
                style={{
                  backgroundColor: "#10b98120",
                  border: "1px solid #10b98140",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: "0.75rem",
                  color: "var(--success)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--danger)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            ✕ Missing ({skillGap.gap.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skillGap.gap.map((s) => (
              <span
                key={s.skill}
                style={{
                  backgroundColor: "#ef444420",
                  border: "1px solid #ef444440",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: "0.75rem",
                  color: "var(--danger)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s.skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
