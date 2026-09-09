import { useEffect, useState, type ReactNode } from "react";
import { get } from "@/api/client";
import { AuthContext, type AuthValue, type User } from "@/context/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await get<{ success: boolean; user?: User }>(
          "/auth/check-me",
        );
        if (active) setUser(res.data.user ?? null);
      } catch {
        if (active) setUser(null); // 401 / neautentificat
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const value: AuthValue = {
    user,
    setUser,
    isAuth: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
