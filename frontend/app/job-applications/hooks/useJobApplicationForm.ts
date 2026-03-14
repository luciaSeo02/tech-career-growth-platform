import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  JobApplication,
  ApplicationStatus,
  ApplicationSource,
  CompanyType,
  WorkMode,
  CreateJobApplicationPayload,
  Skill,
} from "@/types/user";
import {
  apiGetJobApplication,
  apiCreateJobApplication,
  apiUpdateJobApplication,
  apiGetSkills,
} from "@/utils/api";

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

const defaultForm: FormData = {
  company: "",
  role: "",
  url: "",
  location: "",
  status: "SAVED",
  source: "OTHER",
  companyType: "",
  workMode: "",
  salaryMin: "",
  salaryMax: "",
  notes: "",
  appliedAt: "",
  skillIds: [],
};

type FieldErrors = { [key: string]: string };

export function useJobApplicationForm(id?: string) {
  const router = useRouter();
  const isEditing = !!id;

  const [form, setForm] = useState<FormData>(defaultForm);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skills = await apiGetSkills();
        setAvailableSkills(skills);

        if (isEditing && id) {
          const app = await apiGetJobApplication(id);
          setForm({
            company: app.company,
            role: app.role,
            url: app.url ?? "",
            location: app.location ?? "",
            status: app.status,
            source: app.source,
            companyType: app.companyType ?? "",
            workMode: app.workMode ?? "",
            salaryMin: app.salaryMin?.toString() ?? "",
            salaryMax: app.salaryMax?.toString() ?? "",
            notes: app.notes ?? "",
            appliedAt: app.appliedAt ? app.appliedAt.slice(0, 10) : "",
            skillIds: app.skills.map((s) => s.skillId),
          });
        }
      } catch {
        setErrorMessage("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [id, isEditing]);

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!form.company.trim()) errors.company = "Company is required";
    if (!form.role.trim()) errors.role = "Role is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    setErrorMessage("");

    try {
      const payload: CreateJobApplicationPayload = {
        company: form.company,
        role: form.role,
        url: form.url || undefined,
        location: form.location || undefined,
        status: form.status,
        source: form.source,
        companyType: (form.companyType as CompanyType) || undefined,
        workMode: (form.workMode as WorkMode) || undefined,
        salaryMin: form.salaryMin ? parseInt(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? parseInt(form.salaryMax) : undefined,
        notes: form.notes || undefined,
        appliedAt: form.appliedAt
          ? new Date(form.appliedAt).toISOString()
          : undefined,
        skillIds: form.skillIds.length > 0 ? form.skillIds : undefined,
      };

      if (isEditing && id) {
        await apiUpdateJobApplication(id, payload);
      } else {
        await apiCreateJobApplication(payload);
      }

      router.push("/job-applications");
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (skillId: string) => {
    setForm((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((id) => id !== skillId)
        : [...prev.skillIds, skillId],
    }));
  };

  return {
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
  };
}
