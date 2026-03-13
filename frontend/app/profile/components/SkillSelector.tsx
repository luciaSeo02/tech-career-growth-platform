import { useState } from "react";
import { Skill, SkillLevel, UserProfileSkill } from "@/types/user";

const LEVELS: SkillLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

type Props = {
  selectedSkills: UserProfileSkill[];
  availableSkills: Skill[];
  onAdd: (skill: Skill) => void;
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
  error,
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
    onAdd(pendingSkill.skill);
    setPendingSkill(null);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <label>
        <strong>Skills</strong>
      </label>
      {error && <small style={{ color: "red" }}> {error}</small>}

      <div style={{ marginTop: 8 }}>
        {selectedSkills.map((ps) => (
          <div
            key={ps.skillId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ minWidth: 100 }}>
              <strong>{ps.skill.name}</strong>
              {ps.skill.category && (
                <small style={{ color: "gray" }}>
                  {" "}
                  ({ps.skill.category.name})
                </small>
              )}
            </span>
            <select
              value={ps.level ?? "BEGINNER"}
              onChange={(e) =>
                onUpdateField(ps.skillId, "level", e.target.value)
              }
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              style={{ width: 60 }}
              value={ps.years ?? 0}
              onChange={(e) =>
                onUpdateField(ps.skillId, "years", Number(e.target.value))
              }
              placeholder="Years"
            />
            <button onClick={() => onRemove(ps.skillId)}>✕</button>
          </div>
        ))}
      </div>

      {pendingSkill && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginTop: 8,
            borderRadius: 4,
          }}
        >
          <strong>Configure: {pendingSkill.skill.name}</strong>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <select
              value={pendingSkill.level}
              onChange={(e) =>
                setPendingSkill({
                  ...pendingSkill,
                  level: e.target.value as SkillLevel,
                })
              }
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              style={{ width: 60 }}
              value={pendingSkill.years}
              onChange={(e) =>
                setPendingSkill({
                  ...pendingSkill,
                  years: Number(e.target.value),
                })
              }
              placeholder="Years"
            />
            <button onClick={handleConfirm}>Add</button>
            <button onClick={() => setPendingSkill(null)}>Cancel</button>
          </div>
        </div>
      )}

      {!pendingSkill && (
        <div style={{ position: "relative", marginTop: 8 }}>
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
                background: "white",
                border: "1px solid #ccc",
                listStyle: "none",
                margin: 0,
                padding: 0,
                width: "100%",
                maxHeight: 200,
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {filteredSkills.map((s) => (
                <li
                  key={s.id}
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                  onMouseDown={() => handleSelect(s)}
                >
                  {s.name}
                  {s.category && (
                    <small style={{ color: "gray" }}>
                      {" "}
                      — {s.category.name}
                    </small>
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
