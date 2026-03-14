"use client";

import { useMounted } from "@/hooks/useMounted";
import { useProfileForm } from "./hooks/useProfileForm";
import UserInfoForm from "./components/UserInfoForm";
import ProfessionalProfileForm from "./components/ProfessionalProfileForm";
import SecuritySection from "./components/SecuritySection";
import PrivatePageGuard from "@/components/PrivatePageGuard";

function ProfileContent() {
  const mounted = useMounted();
  const {
    profileData,
    loading,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
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
    logout,
  } = useProfileForm();

  if (!mounted) return null;
  if (loading) return <p>Loading...</p>;
  if (!profileData) return <p>No profile data found</p>;

  const { profile, ...user } = profileData;

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: 16 }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: "green", marginBottom: 16 }}>{successMessage}</div>
      )}

      <UserInfoForm
        isEditing={isEditing}
        user={user}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        fieldErrors={fieldErrors}
      />

      <h2>Professional Profile</h2>
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

      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          {profile ? "Edit Profile" : "Create Profile"}
        </button>
      )}

      <SecuritySection
        onAccountDeleted={logout}
        onMessage={(type, msg) => {
          if (type === "error") setErrorMessage(msg);
          else setSuccessMessage(msg);
        }}
      />

      <hr style={{ margin: "20px 0" }} />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivatePageGuard>
      <ProfileContent />
    </PrivatePageGuard>
  );
}
