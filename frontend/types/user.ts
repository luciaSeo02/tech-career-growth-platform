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

export type ApplicationStatus =
  | "SAVED"
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "GHOSTED";

export type ApplicationSource =
  | "LINKEDIN"
  | "INFOJOBS"
  | "INDEED"
  | "COMPANY_SITE"
  | "REFERRAL"
  | "OTHER";

export type CompanyType =
  | "STARTUP"
  | "SCALEUP"
  | "CORPORATE"
  | "CONSULTORA"
  | "AGENCY"
  | "OTHER";

export type WorkMode = "REMOTE" | "HYBRID" | "ONSITE";

export type JobApplicationSkill = {
  id: string;
  applicationId: string;
  skillId: string;
  skill: Skill;
};

export type JobApplication = {
  id: string;
  userId: string;
  company: string;
  role: string;
  url?: string;
  location?: string;
  status: ApplicationStatus;
  source: ApplicationSource;
  companyType?: CompanyType;
  workMode?: WorkMode;
  salaryMin?: number;
  salaryMax?: number;
  notes?: string;
  appliedAt?: string;
  createdAt: string;
  updatedAt: string;
  skills: JobApplicationSkill[];
};

export type CreateJobApplicationPayload = {
  company: string;
  role: string;
  url?: string;
  location?: string;
  status?: ApplicationStatus;
  source?: ApplicationSource;
  companyType?: CompanyType;
  workMode?: WorkMode;
  salaryMin?: number;
  salaryMax?: number;
  notes?: string;
  appliedAt?: string;
  skillIds?: string[];
};

export type UpdateJobApplicationPayload = Partial<CreateJobApplicationPayload>;

export type JobApplicationStats = {
  total: number;
  byStatus: Partial<Record<ApplicationStatus, number>>;
  bySource: Partial<Record<ApplicationSource, number>>;
  byCompanyType: Partial<Record<CompanyType, number>>;
};
