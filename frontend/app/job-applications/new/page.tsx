"use client";

import { useRouter } from "next/navigation";
import { useJobApplicationForm } from "../hooks/useJobApplicationForm";
import JobApplicationForm from "../components/JobApplicationForm";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";

function NewJobApplicationContent() {
  const router = useRouter();
  const {
    form,
    setForm,
    availableSkills,
    loading,
    saving,
    errorMessage,
    fieldErrors,
    isEditing,
    handleSubmit,
    toggleSkill,
  } = useJobApplicationForm();

  if (loading) return <LoadingScreen message="Loading..." />;

  return (
    <div className="page animate-in">
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => router.push("/job-applications")}
          style={{
            fontSize: "0.8rem",
            marginBottom: 20,
            color: "var(--text-muted)",
          }}
        >
          ← Back
        </button>
        <h1 style={{ marginBottom: 6 }}>Add Application</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Log a new job opportunity
        </p>
      </div>
      <JobApplicationForm
        form={form}
        setForm={setForm}
        availableSkills={availableSkills}
        fieldErrors={fieldErrors}
        errorMessage={errorMessage}
        saving={saving}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/job-applications")}
        toggleSkill={toggleSkill}
      />
    </div>
  );
}

export default function NewJobApplicationPage() {
  return (
    <PrivatePageGuard>
      <NewJobApplicationContent />
    </PrivatePageGuard>
  );
}
