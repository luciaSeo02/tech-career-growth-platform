"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMounted } from "@/hooks/useMounted";
import {
  CompleteProfile,
  PartialUser,
  PartialUserProfile,
  UserProfile,
} from "@/types/user";
import {
  apiGetCompleteProfile,
  apiUpdateUser,
  apiUpdateProfile,
  apiCreateProfile,
} from "@/utils/api";

type FieldErrors = {
  [key: string]: string;
};

export default function ProfilePage() {
  const mounted = useMounted();
  const { token, logout } = useAuth();

  const [profileData, setProfileData] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [editingUser, setEditingUser] = useState<PartialUser>({});
  const [editingProfile, setEditingProfile] = useState<PartialUserProfile>({});
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const data = await apiGetCompleteProfile(token);
        setProfileData(data);
        setEditingUser({ name: data.name, email: data.email });

        if (data.profile) {
          setEditingProfile({ ...data.profile });
        } else {
          setEditingProfile({
            targetRole: "",
            experienceLevel: "",
            yearsExperience: 0,
            skills: [],
            technologies: [],
            githubUrl: "",
            linkedinUrl: "",
            portfolioUrl: "",
            location: "",
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    void fetchProfile();
  }, [token]);

  const sanitizeProfile = (profile: PartialUserProfile) => {
    const { id, userId, createdAt, updatedAt, ...rest } = profile;
    return rest;
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!editingUser.name?.trim()) errors.name = "Name is required";
    if (!editingUser.email?.trim()) errors.email = "Email is required";

    if (!editingProfile.targetRole?.trim())
      errors.targetRole = "Target Role is required";
    if (!editingProfile.experienceLevel?.trim())
      errors.experienceLevel = "Experience Level is required";
    if (
      editingProfile.yearsExperience === undefined ||
      editingProfile.yearsExperience < 0
    )
      errors.yearsExperience = "Years of Experience must be 0 or more";
    if (!editingProfile.skills || editingProfile.skills.length === 0)
      errors.skills = "At least one skill is required";
    if (
      !editingProfile.technologies ||
      editingProfile.technologies.length === 0
    )
      errors.technologies = "At least one technology is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!token || !profileData) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (!validate()) {
      setErrorMessage("Please fix the highlighted fields");
      return;
    }

    try {
      const updatedUser = await apiUpdateUser(editingUser, token);

      let updatedProfile: UserProfile | undefined;
      if (profileData.profile) {
        updatedProfile = await apiUpdateProfile(
          sanitizeProfile(editingProfile),
          token,
        );
      } else {
        updatedProfile = await apiCreateProfile(
          editingProfile as UserProfile,
          token,
        );
      }

      setProfileData({ ...updatedUser, profile: updatedProfile });
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
    setEditingProfile(profileData.profile ?? {});
    setErrorMessage("");
    setSuccessMessage("");
    setFieldErrors({});
    setIsEditing(false);
  };

  if (!mounted) return null;
  if (!token) return <p>Please login</p>;
  if (loading) return <p>Loading...</p>;
  if (!profileData) return <p>No profile data found</p>;

  const { profile, ...user } = profileData;

  const inputStyle = (field: string) =>
    fieldErrors[field] ? { borderColor: "red" } : {};

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: 16 }}>{errorMessage}</div>
      )}
      {successMessage && (
        <div style={{ color: "green", marginBottom: 16 }}>{successMessage}</div>
      )}

      <h2>User Info</h2>
      <div>
        <label>Name:</label>{" "}
        {isEditing ? (
          <>
            <input
              type="text"
              style={inputStyle("name")}
              value={editingUser.name ?? ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            {fieldErrors.name && (
              <small style={{ color: "red" }}>{fieldErrors.name}</small>
            )}
          </>
        ) : (
          <span>{user.name}</span>
        )}
      </div>
      <div>
        <label>Email:</label>{" "}
        {isEditing ? (
          <>
            <input
              type="email"
              style={inputStyle("email")}
              value={editingUser.email ?? ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            {fieldErrors.email && (
              <small style={{ color: "red" }}>{fieldErrors.email}</small>
            )}
          </>
        ) : (
          <span>{user.email}</span>
        )}
      </div>

      <h2>Professional Profile</h2>
      {isEditing ? (
        <>
          <div>
            <label>Target Role:</label>
            <input
              type="text"
              style={inputStyle("targetRole")}
              value={editingProfile.targetRole ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  targetRole: e.target.value,
                })
              }
            />
            {fieldErrors.targetRole && (
              <small style={{ color: "red" }}>{fieldErrors.targetRole}</small>
            )}
          </div>
          <div>
            <label>Experience Level:</label>
            <input
              type="text"
              style={inputStyle("experienceLevel")}
              value={editingProfile.experienceLevel ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  experienceLevel: e.target.value,
                })
              }
            />
            {fieldErrors.experienceLevel && (
              <small style={{ color: "red" }}>
                {fieldErrors.experienceLevel}
              </small>
            )}
          </div>
          <div>
            <label>Years Experience:</label>
            <input
              type="number"
              style={inputStyle("yearsExperience")}
              value={editingProfile.yearsExperience ?? 0}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  yearsExperience: Number(e.target.value),
                })
              }
            />
            {fieldErrors.yearsExperience && (
              <small style={{ color: "red" }}>
                {fieldErrors.yearsExperience}
              </small>
            )}
          </div>
          <div>
            <label>Skills (comma separated):</label>
            <input
              type="text"
              style={inputStyle("skills")}
              value={(editingProfile.skills ?? []).join(", ")}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  skills: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            {fieldErrors.skills && (
              <small style={{ color: "red" }}>{fieldErrors.skills}</small>
            )}
          </div>
          <div>
            <label>Technologies (comma separated):</label>
            <input
              type="text"
              style={inputStyle("technologies")}
              value={(editingProfile.technologies ?? []).join(", ")}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  technologies: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            {fieldErrors.technologies && (
              <small style={{ color: "red" }}>{fieldErrors.technologies}</small>
            )}
          </div>

          <div>
            <label>GitHub:</label>
            <input
              type="text"
              value={editingProfile.githubUrl ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  githubUrl: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>LinkedIn:</label>
            <input
              type="text"
              value={editingProfile.linkedinUrl ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  linkedinUrl: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Portfolio:</label>
            <input
              type="text"
              value={editingProfile.portfolioUrl ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  portfolioUrl: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={editingProfile.location ?? ""}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  location: e.target.value,
                })
              }
            />
          </div>
        </>
      ) : profile ? (
        <>
          <p>Target Role: {profile.targetRole}</p>
          <p>Experience Level: {profile.experienceLevel}</p>
          <p>Years Experience: {profile.yearsExperience}</p>
          <p>Skills: {(profile.skills ?? []).join(", ")}</p>
          <p>Technologies: {(profile.technologies ?? []).join(", ")}</p>
          <p>GitHub: {profile.githubUrl}</p>
          <p>LinkedIn: {profile.linkedinUrl}</p>
          <p>Portfolio: {profile.portfolioUrl}</p>
          <p>Location: {profile.location}</p>
        </>
      ) : (
        <p>
          No professional profile yet. Click &quot;Edit / Create Profile&quot;
          to start.
        </p>
      )}

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

      <hr style={{ margin: "20px 0" }} />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
