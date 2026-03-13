export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export type SkillCategory = {
  id: string;
  name: string;
};

export type Skill = {
  id: string;
  name: string;
  categoryId?: string;
  category?: SkillCategory;
};

export type UserProfileSkill = {
  id: string;
  profileId: string;
  skillId: string;
  level?: string;
  years?: number;
  skill: Skill;
};

export type ExperienceLevel = "JUNIOR" | "MID" | "SENIOR" | "LEAD";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type UserProfile = {
  id: string;
  userId: string;
  targetRole: string;
  experienceLevel: string;
  yearsExperience?: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  skills: UserProfileSkill[];
};

export type AddSkillPayload = {
  skillId: string;
  level?: string;
  years?: number;
};

export type UpdateSkillPayload = {
  level?: string;
  years?: number;
};

export type PartialUserProfile = Partial<Omit<UserProfile, "skills">> & {
  skills?: UserProfileSkill[];
};
export type PartialUser = Partial<Pick<User, "name" | "email">>;
export type CompleteProfile = User & { profile?: UserProfile };
