// src/utils/authService.ts

export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return false;
    const data = await res.json();
    return !!(data && data.connected);
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}
