import { privateAxios } from "./axios";
export interface TypeUsers {
  name?: string;
  email?: string;
  gender?: string;
  telephone?: string;
  date?: string;
  password?: number | string;
}
export interface TypeBrandGetListUser {
  keyword: string;
  sort: number;
  page: number;
  limit: number;
}

export const getListUser = (params: TypeBrandGetListUser) => {
  return privateAxios.get("/admin/user", {
    params,
  });
};

export const addUser = (body: TypeUsers) => {
  return privateAxios.post("/admin/user", body);
};

export const updateUser = (id: string, body: TypeUsers) => {
  return privateAxios.put(`/admin/user/${id}`, body);
};

export const deleteUser = (id: string) => {
  return privateAxios.delete(`/admin/user/${id}`);
};
