import {
  ExperienceLevel,
  PartialUserProfile,
  Skill,
  UserProfile,
} from "@/types/user";
import { FieldErrors } from "../hooks/useProfileForm";
import SkillSelector from "./SkillSelector";

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "JUNIOR",
  "MID",
  "SENIOR",
  "LEAD",
];

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
  isEditing: boolean;
  profile?: UserProfile;
  editingProfile: PartialUserProfile;
  setEditingProfile: (p: PartialUserProfile) => void;
  availableSkills: Skill[];
  fieldErrors: FieldErrors;
  onAddSkill: (skill: Skill) => void;
  onRemoveSkill: (skillId: string) => void;
  onUpdateSkillField: (
    skillId: string,
    field: "level" | "years",
    value: string | number,
  ) => void;
};

export default function ProfessionalProfileForm({
  isEditing,
  profile,
  editingProfile,
  setEditingProfile,
  availableSkills,
  fieldErrors,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkillField,
}: Props) {
  if (!isEditing) {
    if (!profile) {
      return (
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          No professional profile yet. Click &quot;Create profile&quot; to get
          started.
        </p>
      );
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <Field label="Target Role" value={profile.targetRole} />
          <Field label="Experience Level" value={profile.experienceLevel} />
          <Field
            label="Years Experience"
            value={profile.yearsExperience?.toString() ?? "—"}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <Field
            label="GitHub"
            value={profile.githubUrl ?? "—"}
            link={profile.githubUrl}
          />
          <Field
            label="LinkedIn"
            value={profile.linkedinUrl ?? "—"}
            link={profile.linkedinUrl}
          />
          <Field
            label="Portfolio"
            value={profile.portfolioUrl ?? "—"}
            link={profile.portfolioUrl}
          />
        </div>
        <Field label="Location" value={profile.location ?? "—"} />
        {profile.skills.length > 0 && (
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 10,
              }}
            >
              Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {profile.skills.map((s) => (
                <span
                  key={s.skillId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--bg-border)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.skill.name}
                  {s.level && (
                    <span
                      style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
                    >
                      · {s.level.toLowerCase()}
                    </span>
                  )}
                  {s.years !== undefined && s.years > 0 && (
                    <span
                      style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}
                    >
                      · {s.years}y
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        <div className="form-group">
          <label style={labelStyle}>Target Role</label>
          <input
            type="text"
            style={
              fieldErrors.targetRole ? { borderColor: "var(--danger)" } : {}
            }
            value={editingProfile.targetRole ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                targetRole: e.target.value,
              })
            }
            placeholder="Senior Frontend Engineer"
          />
          {fieldErrors.targetRole && (
            <small style={{ color: "var(--danger)", fontSize: "0.75rem" }}>
              {fieldErrors.targetRole}
            </small>
          )}
        </div>
        <div className="form-group">
          <label style={labelStyle}>Experience Level</label>
          <select
            value={editingProfile.experienceLevel ?? "JUNIOR"}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                experienceLevel: e.target.value as ExperienceLevel,
              })
            }
          >
            {EXPERIENCE_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {fieldErrors.experienceLevel && (
            <small style={{ color: "var(--danger)", fontSize: "0.75rem" }}>
              {fieldErrors.experienceLevel}
            </small>
          )}
        </div>
        <div className="form-group">
          <label style={labelStyle}>Years Experience</label>
          <input
            type="number"
            min={0}
            style={
              fieldErrors.yearsExperience
                ? { borderColor: "var(--danger)" }
                : {}
            }
            value={editingProfile.yearsExperience ?? 0}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                yearsExperience: Number(e.target.value),
              })
            }
          />
          {fieldErrors.yearsExperience && (
            <small style={{ color: "var(--danger)", fontSize: "0.75rem" }}>
              {fieldErrors.yearsExperience}
            </small>
          )}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        <div className="form-group">
          <label style={labelStyle}>GitHub</label>
          <input
            type="text"
            value={editingProfile.githubUrl ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                githubUrl: e.target.value,
              })
            }
            placeholder="https://github.com/..."
          />
        </div>
        <div className="form-group">
          <label style={labelStyle}>LinkedIn</label>
          <input
            type="text"
            value={editingProfile.linkedinUrl ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                linkedinUrl: e.target.value,
              })
            }
            placeholder="https://linkedin.com/in/..."
          />
        </div>
        <div className="form-group">
          <label style={labelStyle}>Portfolio</label>
          <input
            type="text"
            value={editingProfile.portfolioUrl ?? ""}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                portfolioUrl: e.target.value,
              })
            }
            placeholder="https://yoursite.com"
          />
        </div>
      </div>

      <div className="form-group" style={{ maxWidth: 240 }}>
        <label style={labelStyle}>Location</label>
        <input
          type="text"
          value={editingProfile.location ?? ""}
          onChange={(e) =>
            setEditingProfile({ ...editingProfile, location: e.target.value })
          }
          placeholder="Madrid, Spain"
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 12,
          }}
        >
          Skills
        </div>
        {fieldErrors.skills && (
          <small
            style={{
              color: "var(--danger)",
              fontSize: "0.75rem",
              display: "block",
              marginBottom: 8,
            }}
          >
            {fieldErrors.skills}
          </small>
        )}
        <SkillSelector
          selectedSkills={editingProfile.skills ?? []}
          availableSkills={availableSkills}
          onAdd={onAddSkill}
          onRemove={onRemoveSkill}
          onUpdateField={onUpdateSkillField}
          error={fieldErrors.skills}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  link,
}: {
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "0.875rem", color: "var(--accent)" }}
        >
          {value}
        </a>
      ) : (
        <div style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
          {value}
        </div>
      )}
    </div>
  );
}
