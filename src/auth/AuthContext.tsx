import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export const DEMO_USERNAME = 'admin_laesperanza';
export const DEMO_EMAIL = 'admin_laesperanza@bocadilloslaesperanza.com';
export const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD || 'laesperanza2026';
export const FORCE_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const DEMO_LOCAL_KEY = 'bocadillos_demo_session';
const DEMO_SESSION_KEY = 'bocadillos_demo_session_s';

export interface AuthSessionInfo {
  email: string;
  provider: 'supabase' | 'demo';
}

interface AuthContextValue {
  loading: boolean;
  authenticated: boolean;
  isDemo: boolean;
  sessionInfo: AuthSessionInfo | null;
  signIn: (emailOrUser: string, password: string, remember: boolean) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function restoreDemoSession(): AuthSessionInfo | null {
  try {
    const raw =
      window.localStorage.getItem(DEMO_LOCAL_KEY) ||
      window.sessionStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSessionInfo;
    if (parsed && parsed.email && parsed.provider === 'demo') return parsed;
    return null;
  } catch {
    return null;
  }
}

function storeDemoSession(info: AuthSessionInfo, remember: boolean) {
  const raw = JSON.stringify(info);
  if (remember) {
    window.localStorage.setItem(DEMO_LOCAL_KEY, raw);
    window.sessionStorage.removeItem(DEMO_SESSION_KEY);
  } else {
    window.sessionStorage.setItem(DEMO_SESSION_KEY, raw);
    window.localStorage.removeItem(DEMO_LOCAL_KEY);
  }
}

function clearDemoSession() {
  window.localStorage.removeItem(DEMO_LOCAL_KEY);
  window.sessionStorage.removeItem(DEMO_SESSION_KEY);
}

function toEmail(emailOrUser: string): string {
  const value = emailOrUser.trim().toLowerCase();
  if (!value) return value;
  if (value.includes('@')) return value;
  if (value === DEMO_USERNAME.toLowerCase()) return DEMO_EMAIL;
  return `${value}@bocadilloslaesperanza.com`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState<AuthSessionInfo | null>(null);

  const isDemo = FORCE_DEMO_MODE || !supabase;

  useEffect(() => {
    let active = true;

    if (supabase && !FORCE_DEMO_MODE) {
      supabase.auth.getSession().then(({ data }) => {
        if (!active) return;
        const email = data.session?.user?.email ?? null;
        setSessionInfo(email ? { email, provider: 'supabase' } : null);
        setLoading(false);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        const email = session?.user?.email ?? null;
        setSessionInfo(email ? { email, provider: 'supabase' } : null);
      });
      return () => {
        active = false;
        listener.subscription.unsubscribe();
      };
    }

    setSessionInfo(restoreDemoSession());
    setLoading(false);
    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(
    async (emailOrUser: string, password: string, remember: boolean): Promise<{ error: string | null }> => {
      if (supabase && !FORCE_DEMO_MODE) {
        const { error } = await supabase.auth.signInWithPassword({
          email: toEmail(emailOrUser),
          password,
        });
        if (error) return { error: error.message };
        return { error: null };
      }

      const input = emailOrUser.trim().toLowerCase();
      const validUser =
        input === DEMO_USERNAME.toLowerCase() || input === DEMO_EMAIL.toLowerCase();
      if (validUser && password === DEMO_PASSWORD) {
        const info: AuthSessionInfo = { email: DEMO_EMAIL, provider: 'demo' };
        storeDemoSession(info, remember);
        setSessionInfo(info);
        return { error: null };
      }
      return { error: 'Usuario o contraseña incorrectos. Verifique sus credenciales.' };
    },
    []
  );

  const signOut = useCallback(async () => {
    if (supabase && !FORCE_DEMO_MODE) {
      await supabase.auth.signOut();
    }
    clearDemoSession();
    setSessionInfo(null);
  }, []);

  const value: AuthContextValue = {
    loading,
    authenticated: Boolean(sessionInfo),
    isDemo,
    sessionInfo,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>.');
  }
  return ctx;
}