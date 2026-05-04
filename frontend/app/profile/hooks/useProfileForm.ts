import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  CompleteProfile,
  ExperienceLevel,
  PartialUser,
  PartialUserProfile,
  Skill,
  SkillLevel,
  UserProfileSkill,
} from "@/types/user";
import {
  apiGetCompleteProfile,
  apiUpdateUser,
  apiUpdateProfile,
  apiCreateProfile,
  apiGetSkills,
  apiAddProfileSkill,
  apiUpdateProfileSkill,
  apiRemoveProfileSkill,
} from "@/utils/api";

export type FieldErrors = { [key: string]: string };

const getProfileDefaults = (
  profile?: PartialUserProfile,
): PartialUserProfile => ({
  targetRole: "",
  experienceLevel: "JUNIOR",
  yearsExperience: 0,
  skills: [],
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
  location: "",
  ...profile,
});

export function useProfileForm() {
  const { logout } = useAuth();

  const [profileData, setProfileData] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingUser, setEditingUser] = useState<PartialUser>({});
  const [editingProfile, setEditingProfile] = useState<PartialUserProfile>({});
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, skills] = await Promise.all([
          apiGetCompleteProfile(),
          apiGetSkills(),
        ]);
        setProfileData(data);
        setAvailableSkills(skills);
        setEditingUser({ name: data.name, email: data.email });
        setEditingProfile(getProfileDefaults(data.profile));
      } catch {
        setErrorMessage("Please login");
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!editingUser.name?.trim()) errors.name = "Name is required";
    if (!editingUser.email?.trim()) errors.email = "Email is required";
    if (!editingProfile.targetRole?.trim())
      errors.targetRole = "Target Role is required";
    if (!editingProfile.experienceLevel)
      errors.experienceLevel = "Experience Level is required";
    if (
      editingProfile.yearsExperience === undefined ||
      editingProfile.yearsExperience < 0
    )
      errors.yearsExperience = "Years of Experience must be 0 or more";
    if (!editingProfile.skills || editingProfile.skills.length === 0)
      errors.skills = "At least one skill is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!profileData) return;
    setErrorMessage("");
    setSuccessMessage("");
    if (!validate()) {
      setErrorMessage("Please fix the highlighted fields");
      return;
    }

    try {
      await apiUpdateUser(editingUser);

      const {
        skills: editedSkills,
        id,
        userId,
        createdAt,
        updatedAt,
        ...profileFields
      } = editingProfile;

      void id;
      void userId;
      void createdAt;
      void updatedAt;

      const originalSkills = profileData.profile?.skills ?? [];

      if (profileData.profile) {
        await apiUpdateProfile(profileFields);

        const originalIds = new Set(originalSkills.map((s) => s.skillId));
        const editedIds = new Set((editedSkills ?? []).map((s) => s.skillId));

        for (const s of originalSkills) {
          if (!editedIds.has(s.skillId)) {
            await apiRemoveProfileSkill(s.skillId);
          }
        }

        for (const s of editedSkills ?? []) {
          if (!originalIds.has(s.skillId)) {
            await apiAddProfileSkill({
              skillId: s.skillId,
              level: s.level,
              years: s.years,
            });
          } else {
            const original = originalSkills.find(
              (o) => o.skillId === s.skillId,
            );
            if (original?.level !== s.level || original?.years !== s.years) {
              await apiUpdateProfileSkill(s.skillId, {
                level: s.level,
                years: s.years,
              });
            }
          }
        }
      } else {
        await apiCreateProfile({
          ...profileFields,
          skills: (editedSkills ?? []).map((s) => ({
            skillId: s.skillId,
            level: s.level,
            years: s.years,
          })),
        } as never);
      }

      const refreshed = await apiGetCompleteProfile();
      setProfileData(refreshed);
      setEditingProfile(getProfileDefaults(refreshed.profile));
      setSuccessMessage("Profile saved successfully!");
      setIsEditing(false);
      setFieldErrors({});
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
    }
  };

  const handleCancel = () => {
    if (!profileData) return;
    setEditingUser({ name: profileData.name, email: profileData.email });
    setEditingProfile(getProfileDefaults(profileData.profile ?? undefined));
    setErrorMessage("");
    setSuccessMessage("");
    setFieldErrors({});
    setIsEditing(false);
  };

  const handleAddSkill = (
    skill: Skill,
    level: SkillLevel = "BEGINNER",
    years: number = 0,
  ) => {
    const newEntry: UserProfileSkill = {
      id: crypto.randomUUID(),
      profileId: profileData?.profile?.id ?? "",
      skillId: skill.id,
      level,
      years,
      skill,
    };
    setEditingProfile((prev) => ({
      ...prev,
      skills: [...(prev.skills ?? []), newEntry],
    }));
  };

  const handleRemoveSkill = (skillId: string) => {
    setEditingProfile((prev) => ({
      ...prev,
      skills: (prev.skills ?? []).filter((s) => s.skillId !== skillId),
    }));
  };

  const handleUpdateSkillField = (
    skillId: string,
    field: "level" | "years",
    value: string | number,
  ) => {
    setEditingProfile((prev) => ({
      ...prev,
      skills: (prev.skills ?? []).map((s) =>
        s.skillId === skillId ? { ...s, [field]: value } : s,
      ),
    }));
  };

  return {
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
    logout,
    setErrorMessage,
    setSuccessMessage,
  };
}
