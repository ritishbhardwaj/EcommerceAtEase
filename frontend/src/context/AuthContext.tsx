'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '@/lib/auth-api';
import { fetchMe, login as apiLogin, register as apiRegister } from '@/lib/auth-api';

const TOKEN_KEY = 'nexshop_token';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  const loadStoredAuth = useCallback(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setState((s) => ({ ...s, token: null, user: null, loading: false }));
      return;
    }
    setState((s) => ({ ...s, token: stored, loading: true }));
    fetchMe(stored)
      .then((user) => setState({ token: stored, user, loading: false }))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setState({ token: null, user: null, loading: false });
      });
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await apiLogin(email, password);
    localStorage.setItem(TOKEN_KEY, access_token);
    const user = await fetchMe(access_token);
    setState({ token: access_token, user, loading: false });
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    const { access_token } = await apiRegister(email, password, fullName);
    localStorage.setItem(TOKEN_KEY, access_token);
    const user = await fetchMe(access_token);
    setState({ token: access_token, user, loading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setState({ token: null, user: null, loading: false });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    isAuthenticated: !!state.user && !!state.token,
    isAdmin: state.user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
