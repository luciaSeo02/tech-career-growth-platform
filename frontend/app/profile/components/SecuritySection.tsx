import { useState } from "react";
import { apiChangePassword, apiDeleteAccount } from "@/utils/api";

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
  onAccountDeleted: () => void;
  onMessage: (type: "success" | "error", msg: string) => void;
};

export default function SecuritySection({
  onAccountDeleted,
  onMessage,
}: Props) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || newPassword !== confirmPassword) {
      onMessage("error", "Passwords do not match or are empty");
      return;
    }
    setLoading(true);
    try {
      const res = await apiChangePassword({
        currentPassword: oldPassword,
        newPassword,
      });
      onMessage("success", res.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err: unknown) {
      if (err instanceof Error) onMessage("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmed) return;
    try {
      await apiDeleteAccount();
      onAccountDeleted();
    } catch (err: unknown) {
      if (err instanceof Error) onMessage("error", err.message);
    }
  };

  return (
    <div>
      {!showPasswordForm ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>
              Password
            </div>
            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: 2,
              }}
            >
              ••••••••••••
            </div>
          </div>
          <button
            onClick={() => setShowPasswordForm(true)}
            style={{ padding: "7px 16px", fontSize: "0.8rem" }}
          >
            Change password
          </button>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--bg-border)",
            borderRadius: "var(--radius-md)",
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--text-primary)",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            Change password
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div className="form-group">
              <label style={labelStyle}>Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="submit"
              onClick={handleChangePassword}
              disabled={loading}
              style={{ padding: "9px 20px" }}
            >
              {loading ? "Updating..." : "Update password →"}
            </button>
            <button onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid var(--bg-border)",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--danger)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 12,
          }}
        >
          Danger Zone
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            Permanently delete your account and all associated data. This cannot
            be undone.
          </p>
          <button
            data-variant="danger"
            onClick={handleDeleteAccount}
            style={{ padding: "9px 20px", flexShrink: 0 }}
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}
