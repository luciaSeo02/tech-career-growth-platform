import {
  ExperienceLevel,
  PartialUserProfile,
  Skill,
  UserProfile,
  UserProfileSkill,
} from "@/types/user";
import { FieldErrors } from "../hooks/useProfileForm";
import SkillSelector from "./SkillSelector";

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "JUNIOR",
  "MID",
  "SENIOR",
  "LEAD",
];

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
  const inputStyle = (field: string) =>
    fieldErrors[field] ? { borderColor: "red" } : {};

  if (!isEditing) {
    if (!profile) {
      return (
        <p>
          No professional profile yet. Click &quot;Edit / Create Profile&quot;
          to start.
        </p>
      );
    }
    return (
      <>
        <p>Target Role: {profile.targetRole}</p>
        <p>Experience Level: {profile.experienceLevel}</p>
        <p>Years Experience: {profile.yearsExperience}</p>
        <p>
          Skills:{" "}
          {profile.skills.length === 0
            ? "None"
            : profile.skills
                .map(
                  (s) =>
                    `${s.skill.name}${s.level ? ` (${s.level})` : ""}${s.years ? ` — ${s.years}y` : ""}`,
                )
                .join(", ")}
        </p>
        <p>GitHub: {profile.githubUrl}</p>
        <p>LinkedIn: {profile.linkedinUrl}</p>
        <p>Portfolio: {profile.portfolioUrl}</p>
        <p>Location: {profile.location}</p>
      </>
    );
  }

  return (
    <>
      <div>
        <label>Target Role: </label>
        <input
          type="text"
          style={inputStyle("targetRole")}
          value={editingProfile.targetRole ?? ""}
          onChange={(e) =>
            setEditingProfile({ ...editingProfile, targetRole: e.target.value })
          }
        />
        {fieldErrors.targetRole && (
          <small style={{ color: "red" }}> {fieldErrors.targetRole}</small>
        )}
      </div>
      <div>
        <label>Experience Level: </label>
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
          <small style={{ color: "red" }}> {fieldErrors.experienceLevel}</small>
        )}
      </div>
      <div>
        <label>Years Experience: </label>
        <input
          type="number"
          style={inputStyle("yearsExperience")}
          value={editingProfile.yearsExperience ?? 0}
          onChange={(e) =>
            setEditingProfile({
              ...editingProfile,
              yearsExperience: Number(e.target.value),
            })
          }
        />
        {fieldErrors.yearsExperience && (
          <small style={{ color: "red" }}> {fieldErrors.yearsExperience}</small>
        )}
      </div>

      <SkillSelector
        selectedSkills={editingProfile.skills ?? []}
        availableSkills={availableSkills}
        onAdd={onAddSkill}
        onRemove={onRemoveSkill}
        onUpdateField={onUpdateSkillField}
        error={fieldErrors.skills}
      />

      <div style={{ marginTop: 16 }}>
        <label>GitHub: </label>
        <input
          type="text"
          value={editingProfile.githubUrl ?? ""}
          onChange={(e) =>
            setEditingProfile({ ...editingProfile, githubUrl: e.target.value })
          }
        />
      </div>
      <div>
        <label>LinkedIn: </label>
        <input
          type="text"
          value={editingProfile.linkedinUrl ?? ""}
          onChange={(e) =>
            setEditingProfile({
              ...editingProfile,
              linkedinUrl: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Portfolio: </label>
        <input
          type="text"
          value={editingProfile.portfolioUrl ?? ""}
          onChange={(e) =>
            setEditingProfile({
              ...editingProfile,
              portfolioUrl: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Location: </label>
        <input
          type="text"
          value={editingProfile.location ?? ""}
          onChange={(e) =>
            setEditingProfile({ ...editingProfile, location: e.target.value })
          }
        />
      </div>
    </>
  );
}
