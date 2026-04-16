import type { PropsWithChildren } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import {
  getAdminSession,
  isAdminAuthConfigured,
  onAdminAuthStateChange,
  signInAdminWithPassword,
  signOutAdmin,
} from "@/features/admin/services/adminAuth.service";

type LoginInput = {
  email: string;
  password: string;
};

type AdminAuthContextValue = {
  isConfigured: boolean;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: PropsWithChildren) {
  const isConfigured = isAdminAuthConfigured();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(isConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigured) {
      setSession(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function loadSession() {
      try {
        const activeSession = await getAdminSession();
        if (isMounted) {
          setSession(activeSession);
        }
      } catch (sessionError) {
        if (isMounted) {
          setError(
            sessionError instanceof Error
              ? sessionError.message
              : "Unable to verify admin session.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = onAdminAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  async function login(input: LoginInput) {
    setError(null);
    setIsLoading(true);

    try {
      const nextSession = await signInAdminWithPassword(input);
      setSession(nextSession);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
      throw loginError;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setError(null);
    await signOutAdmin();
    setSession(null);
  }

  function clearError() {
    setError(null);
  }

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isConfigured,
      session,
      isAuthenticated: Boolean(session),
      isLoading,
      error,
      login,
      logout,
      clearError,
    }),
    [error, isConfigured, isLoading, session],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider.");
  }

  return context;
}
