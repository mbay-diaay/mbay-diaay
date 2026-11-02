import type { RoleId } from "../permissions";
import { apiFetch } from "./client";

export type ApiUser = {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  scoopId: string | null;
  phone: string | null;
  active: boolean;
};

export function listUsers() {
  return apiFetch<{ items: ApiUser[] }>("/users");
}

export function createUser(body: {
  name: string;
  email: string;
  role: RoleId;
  scoopId?: string;
  phone?: string;
  password?: string;
}) {
  return apiFetch<ApiUser>("/users", { method: "POST", body });
}

export function toggleUserActive(id: string) {
  return apiFetch<ApiUser>(`/users/${id}/toggle-active`, { method: "POST", body: {} });
}
