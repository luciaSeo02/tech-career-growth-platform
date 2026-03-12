import {
  User,
  CompleteProfile,
  UserProfile,
  PartialUser,
  PartialUserProfile,
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
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
  });

  return handleResponse<T>(res);
}

export async function apiPost<T, B>(path: string, body: B): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function apiPatch<T, B>(path: string, body: B): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse<T>(res);
}

export async function apiGetUser(): Promise<User> {
  return apiGet<User>("/users/me");
}

export async function apiUpdateUser(body: PartialUser): Promise<User> {
  return apiPatch<User, PartialUser>("/users/me", body);
}

export async function apiGetProfile(): Promise<UserProfile | undefined> {
  const profile = await apiGet<UserProfile | null>("/profile");
  return profile ?? undefined;
}

export async function apiCreateProfile(
  body: UserProfile,
): Promise<UserProfile> {
  return apiPost<UserProfile, UserProfile>("/profile", body);
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

export async function apiGetMe() {
  return apiGet("/users/me");
}

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function apiChangePassword(body: ChangePasswordPayload) {
  const res = await fetch(`${BASE_URL}/users/change-password`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  try {
    return (await res.json()) as { message: string };
  } catch {
    return { message: "Password changed successfully" };
  }
}

export async function apiDeleteAccount(): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "API error" }));
    throw new Error(err.message || "API error");
  }

  return res.json();
}
