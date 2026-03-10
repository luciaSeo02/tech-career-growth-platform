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

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return handleResponse<T>(res);
}

export async function apiPost<T, B>(
  path: string,
  body: B,
  token?: string,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiPatch<T, B>(
  path: string,
  body: B,
  token?: string,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiGetUser(token: string): Promise<User> {
  return apiGet<User>("/users/me", token);
}

export async function apiUpdateUser(
  body: PartialUser,
  token: string,
): Promise<User> {
  return apiPatch<User, PartialUser>("/users/me", body, token);
}

export async function apiGetProfile(
  token: string,
): Promise<UserProfile | undefined> {
  const profile = await apiGet<UserProfile | null>("/profile", token);
  return profile ?? undefined;
}

export async function apiCreateProfile(
  body: UserProfile,
  token: string,
): Promise<UserProfile> {
  return apiPost<UserProfile, UserProfile>("/profile", body, token);
}

export async function apiUpdateProfile(
  body: PartialUserProfile,
  token: string,
): Promise<UserProfile> {
  return apiPatch<UserProfile, PartialUserProfile>("/profile", body, token);
}

export async function apiGetCompleteProfile(
  token: string,
): Promise<CompleteProfile> {
  const user = await apiGetUser(token);
  const profile = await apiGetProfile(token).catch(() => undefined);
  return { ...user, profile };
}
