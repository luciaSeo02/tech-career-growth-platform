import {
  User,
  CompleteProfile,
  UserProfile,
  PartialUser,
  PartialUserProfile,
  Skill,
  UserProfileSkill,
  AddSkillPayload,
  UpdateSkillPayload,
} from "@/types/user";

const BASE_URL = "http://localhost:3001";

type ApiErrorResponse = { message: string };

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err: ApiErrorResponse = await res
      .json()
      .catch(() => ({ message: "API Error" }));
    throw new Error(err.message || "API Error");
  }
  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { credentials: "include" });
  return handleResponse<T>(res);
}

export async function apiPost<T, B>(path: string, body: B): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiPatch<T, B>(path: string, body: B): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse<T>(res);
}

export async function apiGetUser(): Promise<User> {
  return apiGet<User>("/users/me");
}

export async function apiUpdateUser(body: PartialUser): Promise<User> {
  return apiPatch<User, PartialUser>("/users/me", body);
}

export async function apiDeleteAccount(): Promise<{ message: string }> {
  return apiDelete<{ message: string }>("/users/me");
}

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function apiChangePassword(
  body: ChangePasswordPayload,
): Promise<{ message: string }> {
  return apiPatch<{ message: string }, ChangePasswordPayload>(
    "/users/change-password",
    body,
  );
}

export async function apiGetProfile(): Promise<UserProfile | undefined> {
  const profile = await apiGet<UserProfile | null>("/profile");
  return profile ?? undefined;
}

export async function apiCreateProfile(
  body: Omit<UserProfile, "id" | "userId" | "createdAt" | "updatedAt">,
): Promise<UserProfile> {
  return apiPost<UserProfile, typeof body>("/profile", body);
}

export async function apiUpdateProfile(
  body: PartialUserProfile,
): Promise<UserProfile> {
  return apiPatch<UserProfile, PartialUserProfile>("/profile", body);
}

export async function apiGetCompleteProfile(): Promise<CompleteProfile> {
  const user = await apiGetUser();
  const profile = await apiGetProfile().catch(() => undefined);
  return { ...user, profile };
}

export async function apiGetSkills(): Promise<Skill[]> {
  return apiGet<Skill[]>("/skills");
}

export async function apiAddProfileSkill(
  body: AddSkillPayload,
): Promise<UserProfileSkill> {
  return apiPost<UserProfileSkill, AddSkillPayload>("/profile/skills", body);
}

export async function apiUpdateProfileSkill(
  skillId: string,
  body: UpdateSkillPayload,
): Promise<UserProfileSkill> {
  return apiPatch<UserProfileSkill, UpdateSkillPayload>(
    `/profile/skills/${skillId}`,
    body,
  );
}

export async function apiRemoveProfileSkill(
  skillId: string,
): Promise<{ message: string }> {
  return apiDelete<{ message: string }>(`/profile/skills/${skillId}`);
}
