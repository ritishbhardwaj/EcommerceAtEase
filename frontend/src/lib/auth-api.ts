/**
 * Client-side auth API. Auth requests go directly to the backend URL so the
 * Authorization header is sent correctly (Next.js rewrite does not forward it).
 */

function getAuthApiBase(): string {
  if (typeof window === 'undefined') return 'http://localhost:8000';
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
}
// Alias so any reference to getApiBase (e.g. cached bundle) works
const getApiBase = getAuthApiBase;

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${getAuthApiBase()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || 'Login failed');
  }
  return res.json();
}

export async function register(
  email: string,
  password: string,
  full_name: string
): Promise<LoginResponse> {
  const res = await fetch(`${getAuthApiBase()}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || 'Registration failed');
  }
  return res.json();
}

export async function fetchMe(token: string): Promise<User> {
  const res = await fetch(`${getAuthApiBase()}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Not authenticated');
  return res.json();
}
