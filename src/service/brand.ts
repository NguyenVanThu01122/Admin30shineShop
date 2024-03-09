import { privateAxios } from "./axios";
export interface TypeBrands {
  createdAt?: Date;
  id?: string;
  image?: string ;
  name?: string;
}
export interface TypeGetListBrand {
  keyword: string;
  sortDate: number;
  page: number;
  limit: number;
}

export const getListBrand = (params: TypeGetListBrand) => {
  return privateAxios.get("/admin/brand", {
    params,
  });
};

export const addBrand = (body: TypeBrands) => {
  return privateAxios.post("/admin/brand/", body);
};

export const updateBrand = (id: string, body: TypeBrands) => {
  return privateAxios.put(`/admin/brand/${id}`, body);
};

export const deleteBrand = (id: string) => {
  return privateAxios.delete(`/admin/brand/${id}`);
};

export const deleteBrandAll = (params: { idArr: string[] }) => {
  return privateAxios.delete("/admin/brand/delete-many", { params });
};
