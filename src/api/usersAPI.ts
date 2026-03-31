import { api } from "../api/axios";
import type {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "../types/users";

export const getUsers = (filters?: UserFilters) => {
  return api.get<MetaResponse<User>>("/admin/users", {
    params: filters,
  });
};

export const getUserById = (id: number) => {
  return api.get<User>(`/admin/users/${id}`);
};

export const deleteUser = (id: number) => {
  return api.delete(`/admin/users/${id}`);
};

export const updateUser = (id: number, body: UserRequest) => {
  return api.put(`/admin/users/${id}`, body);
};

export const blockUser = (id: number) => {
  return api.post(`/admin/users/${id}/block`);
};

export const unblockUser = (id: number) => {
  return api.post(`/admin/users/${id}/unblock`);
};

export const updateUserRoles = (id: number, roles: UserRolesRequest) => {
  return api.post(`/admin/users/${id}/rights`, roles);
};
