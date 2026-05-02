"use client";

import { useMounted } from "@/hooks/useMounted";
import { useProfileForm } from "./hooks/useProfileForm";
import UserInfoForm from "./components/UserInfoForm";
import ProfessionalProfileForm from "./components/ProfessionalProfileForm";
import SecuritySection from "./components/SecuritySection";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";

function ProfilePageContent() {
  const mounted = useMounted();
  const {
    profileData,
    loading,
    errorMessage,
    successMessage,
    editingUser,
    setEditingUser,
    editingProfile,
    setEditingProfile,
    isEditing,
    setIsEditing,
    fieldErrors,
    availableSkills,
    handleSave,
    handleCancel,
    handleAddSkill,
    handleRemoveSkill,
    handleUpdateSkillField,
    setErrorMessage,
    setSuccessMessage,
  } = useProfileForm();

  if (!mounted) return null;
  if (loading) return <LoadingScreen message="Loading profile..." />;
  if (!profileData)
    return (
      <div className="page" style={{ color: "var(--text-muted)" }}>
        No profile data found.
      </div>
    );

  const { profile, ...user } = profileData;

  return (
    <div className="page animate-in">
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ marginBottom: 6 }}>Profile</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Manage your professional information
        </p>
      </div>

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
      {successMessage && (
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--success)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: 24,
            fontSize: "0.875rem",
            color: "var(--success)",
          }}
        >
          {successMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="card">
          <h2
            style={{
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Account
          </h2>
          <UserInfoForm
            isEditing={isEditing}
            user={user}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            fieldErrors={fieldErrors}
          />
        </div>

        <div className="card">
          <h2
            style={{
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Professional Profile
          </h2>
          <ProfessionalProfileForm
            isEditing={isEditing}
            profile={profile}
            editingProfile={editingProfile}
            setEditingProfile={setEditingProfile}
            availableSkills={availableSkills}
            fieldErrors={fieldErrors}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            onUpdateSkillField={handleUpdateSkillField}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {isEditing ? (
            <>
              <button
                type="submit"
                onClick={handleSave}
                style={{ padding: "10px 24px" }}
              >
                Save changes →
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button
              type="submit"
              onClick={() => setIsEditing(true)}
              style={{ padding: "10px 24px" }}
            >
              {profile ? "Edit profile →" : "Create profile →"}
            </button>
          )}
        </div>

        <div className="card">
          <h2
            style={{
              fontSize: "0.875rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            Security
          </h2>
          <SecuritySection
            onAccountDeleted={() => (window.location.href = "/login")}
            onMessage={(type, msg) => {
              if (type === "error") setErrorMessage(msg);
              else setSuccessMessage(msg);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivatePageGuard>
      <ProfilePageContent />
    </PrivatePageGuard>
  );
}
