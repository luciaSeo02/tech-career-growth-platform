const BASE_URL = "http://localhost:3001";

type ApiErrorResponse = {
  message: string;
};

export async function apiPost<T>(
  path: string,
  body: Record<string, unknown>,
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

  if (!res.ok) {
    let errorMessage = "API Error";

    try {
      const err: ApiErrorResponse = await res.json();
      errorMessage = err.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    let errorMessage = "API Error";

    try {
      const err: ApiErrorResponse = await res.json();
      errorMessage = err.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}
