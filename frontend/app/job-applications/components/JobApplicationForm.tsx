import {
  ApplicationStatus,
  ApplicationSource,
  CompanyType,
  WorkMode,
  Skill,
} from "@/types/user";

const STATUSES: ApplicationStatus[] = [
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
  "GHOSTED",
];
const SOURCES: ApplicationSource[] = [
  "LINKEDIN",
  "INFOJOBS",
  "INDEED",
  "COMPANY_SITE",
  "REFERRAL",
  "OTHER",
];
const COMPANY_TYPES: CompanyType[] = [
  "STARTUP",
  "SCALEUP",
  "CORPORATE",
  "CONSULTORA",
  "AGENCY",
  "OTHER",
];
const WORK_MODES: WorkMode[] = ["REMOTE", "HYBRID", "ONSITE"];

type FormData = {
  company: string;
  role: string;
  url: string;
  location: string;
  status: ApplicationStatus;
  source: ApplicationSource;
  companyType: CompanyType | "";
  workMode: WorkMode | "";
  salaryMin: string;
  salaryMax: string;
  notes: string;
  appliedAt: string;
  skillIds: string[];
};

type FieldErrors = { [key: string]: string };

type Props = {
  form: FormData;
  setForm: (f: FormData) => void;
  availableSkills: Skill[];
  fieldErrors: FieldErrors;
  errorMessage: string;
  saving: boolean;
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  toggleSkill: (skillId: string) => void;
};

export default function JobApplicationForm({
  form,
  setForm,
  availableSkills,
  fieldErrors,
  errorMessage,
  saving,
  isEditing,
  onSubmit,
  onCancel,
  toggleSkill,
}: Props) {
  const inputStyle = (field: string) =>
    fieldErrors[field] ? { borderColor: "red" } : {};

  const skillsByCategory = availableSkills.reduce(
    (acc, skill) => {
      const cat = skill.category?.name ?? "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div style={{ maxWidth: 600 }}>
      {errorMessage && (
        <div style={{ color: "red", marginBottom: 16 }}>{errorMessage}</div>
      )}

      <div>
        <label>Company *</label>
        <input
          type="text"
          style={inputStyle("company")}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
        {fieldErrors.company && (
          <small style={{ color: "red" }}> {fieldErrors.company}</small>
        )}
      </div>
      <div>
        <label>Role *</label>
        <input
          type="text"
          style={inputStyle("role")}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        {fieldErrors.role && (
          <small style={{ color: "red" }}> {fieldErrors.role}</small>
        )}
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as ApplicationStatus })
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Source</label>
          <select
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value as ApplicationSource })
            }
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>URL</label>
        <input
          type="text"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <label>Company Type</label>
          <select
            value={form.companyType}
            onChange={(e) =>
              setForm({
                ...form,
                companyType: e.target.value as CompanyType | "",
              })
            }
          >
            <option value="">— select —</option>
            {COMPANY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Work Mode</label>
          <select
            value={form.workMode}
            onChange={(e) =>
              setForm({ ...form, workMode: e.target.value as WorkMode | "" })
            }
          >
            <option value="">— select —</option>
            {WORK_MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <label>Salary Min (€)</label>
          <input
            type="number"
            min={0}
            value={form.salaryMin}
            onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
          />
        </div>
        <div>
          <label>Salary Max (€)</label>
          <input
            type="number"
            min={0}
            value={form.salaryMax}
            onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label>Applied At</label>
        <input
          type="date"
          value={form.appliedAt}
          onChange={(e) => setForm({ ...form, appliedAt: e.target.value })}
        />
      </div>

      <div>
        <label>Notes</label>
        <textarea
          value={form.notes}
          rows={3}
          style={{ width: "100%" }}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>
          <strong>Skills required in this offer</strong>
        </label>
        <div style={{ marginTop: 8 }}>
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} style={{ marginBottom: 12 }}>
              <small style={{ color: "#6b7280", fontWeight: "bold" }}>
                {category}
              </small>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 4,
                }}
              >
                {skills.map((skill) => {
                  const selected = form.skillIds.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 12,
                        border: "1px solid",
                        borderColor: selected ? "#3b82f6" : "#d1d5db",
                        backgroundColor: selected ? "#eff6ff" : "white",
                        color: selected ? "#3b82f6" : "#374151",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <button onClick={onSubmit} disabled={saving}>
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Application"
              : "Create Application"}
        </button>
        <button onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}
