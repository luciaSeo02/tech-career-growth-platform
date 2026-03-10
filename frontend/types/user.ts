export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  targetRole: string;
  experienceLevel: string;
  yearsExperience?: number;
  skills: string[];
  technologies: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
};

export type PartialUserProfile = Partial<UserProfile>;
export type PartialUser = Partial<Pick<User, "name" | "email">>;
export type CompleteProfile = User & { profile?: UserProfile };
