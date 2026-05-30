import { post, get } from "./client";

interface AuthResponse {
  message: string;
  success: boolean;
  token?: string;
}

async function loginUser(email: string, password: string) {
  const response = await post<AuthResponse>("/auth/login", {
    email,
    password,
  });

  console.log("Response:", response);
  console.log("Data:", response.data);
  return response;
}

async function createUser(username: string, email: string, password: string) {
  const response = await post<AuthResponse>("/auth/register", {
    username,
    email,
    password,
  });

  console.log("Response:", response);
  console.log("Data:", response.data);
  return response;
}

async function checkUserAuthentication() {
  const response = await get<AuthResponse>("/auth/check-me");
  return response;
}

export { loginUser, createUser, checkUserAuthentication };
