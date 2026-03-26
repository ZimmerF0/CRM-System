import { api } from "../api/axios";
import type { MetaResponse, User, UserFilters, UserRequest } from "../types/users";

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
