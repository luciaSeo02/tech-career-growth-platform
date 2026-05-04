"use client";

import { useParams, useRouter } from "next/navigation";
import { useJobApplicationForm } from "../hooks/useJobApplicationForm";
import JobApplicationForm from "../components/JobApplicationForm";
import PrivatePageGuard from "@/components/PrivatePageGuard";
import LoadingScreen from "@/components/LoadingScreen";

function EditJobApplicationContent() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

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
  } = useJobApplicationForm(id);

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
        <h1 style={{ marginBottom: 6 }}>Edit Application</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
          Update your application details
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

export default function EditJobApplicationPage() {
  return (
    <PrivatePageGuard>
      <EditJobApplicationContent />
    </PrivatePageGuard>
  );
}
