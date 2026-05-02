// api/client.ts

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface ApiResponse<T = unknown> {
  ok: boolean;
  status: number;
  data: T;
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function api<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    window.location.href = "/login";
    return { ok: false, status: 401, data: null as T };
  }

  if (response.status === 204) {
    return { ok: true, status: 204, data: null as T };
  }

  const data: T = await response.json();

  return { ok: response.ok, status: response.status, data };
}

export const get = <T = unknown>(path: string) =>
  api<T>(path, { method: "GET" });

export const post = <T = unknown>(path: string, body: unknown) =>
  api<T>(path, { method: "POST", body: JSON.stringify(body) });

export const put = <T = unknown>(path: string, body: unknown) =>
  api<T>(path, { method: "PUT", body: JSON.stringify(body) });

export const patch = <T = unknown>(path: string, body: unknown) =>
  api<T>(path, { method: "PATCH", body: JSON.stringify(body) });

export const del = <T = unknown>(path: string) =>
  api<T>(path, { method: "DELETE" });
