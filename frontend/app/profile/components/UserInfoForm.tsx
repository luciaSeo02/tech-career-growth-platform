import { PartialUser } from "@/types/user";
import { FieldErrors } from "../hooks/useProfileForm";

type Props = {
  isEditing: boolean;
  user: { name: string | null; email: string };
  editingUser: PartialUser;
  setEditingUser: (u: PartialUser) => void;
  fieldErrors: FieldErrors;
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "var(--text-muted)" as const,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  marginBottom: 6,
  display: "block",
};

export default function UserInfoForm({
  isEditing,
  user,
  editingUser,
  setEditingUser,
  fieldErrors,
}: Props) {
  if (!isEditing) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Name" value={user.name ?? "—"} />
        <Field label="Email" value={user.email} />
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div className="form-group">
        <label style={labelStyle}>Name</label>
        <input
          type="text"
          style={fieldErrors.name ? { borderColor: "var(--danger)" } : {}}
          value={editingUser.name ?? ""}
          onChange={(e) =>
            setEditingUser({ ...editingUser, name: e.target.value })
          }
          placeholder="Your name"
        />
        {fieldErrors.name && (
          <small
            style={{
              color: "var(--danger)",
              fontSize: "0.75rem",
              marginTop: 4,
            }}
          >
            {fieldErrors.name}
          </small>
        )}
      </div>
      <div className="form-group">
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          style={fieldErrors.email ? { borderColor: "var(--danger)" } : {}}
          value={editingUser.email ?? ""}
          onChange={(e) =>
            setEditingUser({ ...editingUser, email: e.target.value })
          }
          placeholder="you@example.com"
        />
        {fieldErrors.email && (
          <small
            style={{
              color: "var(--danger)",
              fontSize: "0.75rem",
              marginTop: 4,
            }}
          >
            {fieldErrors.email}
          </small>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
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
      <div style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}
