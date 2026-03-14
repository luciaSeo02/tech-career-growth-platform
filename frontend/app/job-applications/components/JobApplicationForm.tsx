import {
  ApplicationStatus,
  ApplicationSource,
  CompanyType,
  WorkMode,
  Skill,
} from "@/types/user";

import { useState } from "react";

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

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "var(--text-muted)",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginBottom: 6,
  display: "block",
};

const sectionTitle = {
  fontSize: "0.7rem",
  fontWeight: 600,
  color: "var(--text-muted)",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  marginBottom: 12,
  marginTop: 24,
  paddingBottom: 8,
  borderBottom: "1px solid var(--bg-border)",
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
  const [skillSearch, setSkillSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedSkills = availableSkills.filter((s) =>
    form.skillIds.includes(s.id),
  );

  const filteredSkills = availableSkills.filter(
    (s) =>
      !form.skillIds.includes(s.id) &&
      s.name.toLowerCase().includes(skillSearch.toLowerCase()),
  );

  return (
    <div style={{ maxWidth: 680 }}>
      {errorMessage && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--danger)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 24,
            fontSize: "0.875rem",
            color: "var(--danger)",
          }}
        >
          {errorMessage}
        </div>
      )}

      <p style={sectionTitle}>Position</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="form-group">
          <label style={labelStyle}>
            Company <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <input
            type="text"
            style={fieldErrors.company ? { borderColor: "var(--danger)" } : {}}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Acme Corp"
          />
          {fieldErrors.company && (
            <small
              style={{
                color: "var(--danger)",
                fontSize: "0.75rem",
                marginTop: 4,
              }}
            >
              {fieldErrors.company}
            </small>
          )}
        </div>
        <div className="form-group">
          <label style={labelStyle}>
            Role <span style={{ color: "var(--danger)" }}>*</span>
          </label>
          <input
            type="text"
            style={fieldErrors.role ? { borderColor: "var(--danger)" } : {}}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Senior Frontend Engineer"
          />
          {fieldErrors.role && (
            <small
              style={{
                color: "var(--danger)",
                fontSize: "0.75rem",
                marginTop: 4,
              }}
            >
              {fieldErrors.role}
            </small>
          )}
        </div>
      </div>

      <div className="form-group">
        <label style={labelStyle}>Job URL</label>
        <input
          type="text"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://linkedin.com/jobs/..."
        />
      </div>

      <p style={sectionTitle}>Tracking</p>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        <div className="form-group">
          <label style={labelStyle}>Status</label>
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
        <div className="form-group">
          <label style={labelStyle}>Source</label>
          <select
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value as ApplicationSource })
            }
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label style={labelStyle}>Applied at</label>
          <input
            type="date"
            value={form.appliedAt}
            onChange={(e) => setForm({ ...form, appliedAt: e.target.value })}
          />
        </div>
      </div>

      <p style={sectionTitle}>Details</p>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}
      >
        <div className="form-group">
          <label style={labelStyle}>Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Madrid, Spain"
          />
        </div>
        <div className="form-group">
          <label style={labelStyle}>Company Type</label>
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
        <div className="form-group">
          <label style={labelStyle}>Work Mode</label>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="form-group">
          <label style={labelStyle}>Salary Min (€)</label>
          <input
            type="number"
            min={0}
            value={form.salaryMin}
            onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
            placeholder="30000"
          />
        </div>
        <div className="form-group">
          <label style={labelStyle}>Salary Max (€)</label>
          <input
            type="number"
            min={0}
            value={form.salaryMax}
            onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
            placeholder="45000"
          />
        </div>
      </div>

      <div className="form-group">
        <label style={labelStyle}>Notes</label>
        <textarea
          value={form.notes}
          rows={3}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Recruiter contact, interview notes, next steps..."
        />
      </div>

      <p style={sectionTitle}>Required Skills</p>

      {selectedSkills.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 12,
          }}
        >
          {selectedSkills.map((skill) => (
            <span
              key={skill.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "var(--accent-dim)",
                border: "1px solid var(--accent)",
                borderRadius: 999,
                padding: "4px 12px",
                fontSize: "0.8rem",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {skill.name}
              <button
                type="button"
                onClick={() => toggleSkill(skill.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--accent)",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "0.9rem",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search and add skills..."
          value={skillSearch}
          onChange={(e) => {
            setSkillSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        {showDropdown && skillSearch && filteredSkills.length > 0 && (
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
            {filteredSkills.slice(0, 10).map((skill) => (
              <li
                key={skill.id}
                onMouseDown={() => {
                  toggleSkill(skill.id);
                  setSkillSearch("");
                  setShowDropdown(false);
                }}
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
                <span>{skill.name}</span>
                {skill.category && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {skill.category.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid var(--bg-border)",
        }}
      >
        <button
          type="submit"
          onClick={onSubmit}
          disabled={saving}
          style={{ padding: "10px 24px" }}
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update application →"
              : "Create application →"}
        </button>
        <button onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </div>
  );
}
