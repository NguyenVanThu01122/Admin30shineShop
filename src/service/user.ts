import { privateAxios } from "./axios";

export const getListUser = (params: any) => {
  return privateAxios.get("/admin/user", {
    params,
  });
};

export const addUser = (body: any) => {
  return privateAxios.post("/admin/user", body);
};

export const updateUser = (id: string, body: any) => {
  return privateAxios.put(`/admin/user/${id}`, body);
};

export const deleteUser = (id: string) => {
  return privateAxios.delete(`/admin/user/${id}`);
};
