"use client";

import { useParams, useRouter } from "next/navigation";
import { useMounted } from "@/hooks/useMounted";
import { useJobApplicationForm } from "../hooks/useJobApplicationForm";
import JobApplicationForm from "../components/JobApplicationForm";
import PrivatePageGuard from "@/components/PrivatePageGuard";

function EditJobApplicationContent() {
  const mounted = useMounted();
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

  if (!mounted) return null;
  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Application</h1>
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
