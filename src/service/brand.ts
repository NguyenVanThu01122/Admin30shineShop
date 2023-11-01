import { privateAxios } from "./axios";

export const getListBrand = (params: any) => {
  return privateAxios.get("/admin/brand", {
    params,
  });
};

export const addBrand = (body: any) => {
  return privateAxios.post("/admin/brand/", body);
};

export const updateBrand = (id: string, body: any) => {
  return privateAxios.put(`/admin/brand/${id}`, body);
};

export const deleteBrand = (id: string) => {
  return privateAxios.delete(`/admin/brand/${id}`);
};
