import { useState } from "react";
import { apiChangePassword, apiDeleteAccount } from "@/utils/api";

type Props = {
  onAccountDeleted: () => void;
  onMessage: (type: "success" | "error", msg: string) => void;
};

export default function SecuritySection({
  onAccountDeleted,
  onMessage,
}: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || newPassword !== confirmPassword) {
      onMessage("error", "Passwords do not match or are empty");
      return;
    }
    try {
      const res = await apiChangePassword({
        currentPassword: oldPassword,
        newPassword,
      });
      onMessage("success", res.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) onMessage("error", err.message);
    }
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
    <section>
      <h2>Security</h2>
      <div>
        <label>Old Password: </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password: </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password: </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      <hr />
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </section>
  );
}
