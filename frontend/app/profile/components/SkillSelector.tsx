import { useState } from "react";
import { Skill, SkillLevel, UserProfileSkill } from "@/types/user";
import { capitalize } from "@/utils/format";

const LEVELS: SkillLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "var(--text-muted)" as const,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginBottom: 6,
  display: "block",
};

type Props = {
  selectedSkills: UserProfileSkill[];
  availableSkills: Skill[];
  onAdd: (skill: Skill, level: SkillLevel, years: number) => void;
  onRemove: (skillId: string) => void;
  onUpdateField: (
    skillId: string,
    field: "level" | "years",
    value: string | number,
  ) => void;
  error?: string;
};

export default function SkillSelector({
  selectedSkills,
  availableSkills,
  onAdd,
  onRemove,
  onUpdateField,
}: Props) {
  const [skillSearch, setSkillSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pendingSkill, setPendingSkill] = useState<{
    skill: Skill;
    level: SkillLevel;
    years: number;
  } | null>(null);

  const filteredSkills = availableSkills.filter((s) => {
    const alreadyAdded = selectedSkills.some((ps) => ps.skillId === s.id);
    return (
      !alreadyAdded && s.name.toLowerCase().includes(skillSearch.toLowerCase())
    );
  });

  const handleSelect = (skill: Skill) => {
    setPendingSkill({ skill, level: "BEGINNER", years: 0 });
    setSkillSearch("");
    setShowDropdown(false);
  };

  const handleConfirm = () => {
    if (!pendingSkill) return;
    onAdd(pendingSkill.skill, pendingSkill.level, pendingSkill.years);
    setPendingSkill(null);
  };

  return (
    <div>
      {selectedSkills.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {selectedSkills.map((ps) => (
            <div
              key={ps.skillId}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                padding: "10px 0",
                borderBottom: "1px solid var(--bg-border)",
              }}
            >
              <div style={{ minWidth: 140, flex: "1 1 140px" }}>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {ps.skill.name}
                </span>
                {ps.skill.category && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      marginLeft: 6,
                    }}
                  >
                    {ps.skill.category.name}
                  </span>
                )}
              </div>

              <select
                value={ps.level ?? "BEGINNER"}
                onChange={(e) =>
                  onUpdateField(ps.skillId, "level", e.target.value)
                }
                style={{ flex: "1 1 120px", minWidth: 100, maxWidth: 160 }}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {capitalize(l)}
                  </option>
                ))}
              </select>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flex: "0 0 auto",
                }}
              >
                <input
                  type="number"
                  min={0}
                  style={{ width: 56 }}
                  value={ps.years ?? ""}
                  onChange={(e) =>
                    onUpdateField(
                      ps.skillId,
                      "years",
                      e.target.value === "" ? 0 : Number(e.target.value),
                    )
                  }
                />
                <span
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  yrs
                </span>
              </div>
              <button
                type="button"
                onClick={() => onRemove(ps.skillId)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px 6px",
                  fontSize: "1rem",
                  lineHeight: 1,
                  borderRadius: "var(--radius-sm)",
                  flex: "0 0 auto",
                  marginLeft: "auto",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--danger)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
                title="Remove skill"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {pendingSkill && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius-md)",
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            Configure{" "}
            <span
              style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
            >
              {pendingSkill.skill.name}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <label style={labelStyle}>Level</label>
              <select
                value={pendingSkill.level}
                onChange={(e) =>
                  setPendingSkill({
                    ...pendingSkill,
                    level: e.target.value as SkillLevel,
                  })
                }
                style={{ width: 160 }}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {capitalize(l)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Years</label>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="number"
                  min={0}
                  style={{ width: 72 }}
                  value={pendingSkill.years || ""}
                  onChange={(e) =>
                    setPendingSkill({
                      ...pendingSkill,
                      years: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                />
                <span
                  style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                >
                  yrs
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button
                type="submit"
                onClick={handleConfirm}
                style={{ padding: "8px 16px" }}
              >
                Add skill
              </button>
              <button
                type="button"
                onClick={() => setPendingSkill(null)}
                style={{ padding: "8px 16px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!pendingSkill && (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search and add a skill..."
            value={skillSearch}
            onChange={(e) => {
              setSkillSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filteredSkills.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--bg-border)",
                borderRadius: "var(--radius-md)",
                listStyle: "none",
                margin: 0,
                padding: "4px 0",
                maxHeight: 220,
                overflowY: "auto",
                zIndex: 20,
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              {filteredSkills.map((s) => (
                <li
                  key={s.id}
                  onMouseDown={() => handleSelect(s)}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLLIElement).style.background =
                      "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLLIElement).style.background =
                      "transparent";
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {s.name}
                  </span>
                  {s.category && (
                    <span
                      style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                    >
                      {s.category.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
