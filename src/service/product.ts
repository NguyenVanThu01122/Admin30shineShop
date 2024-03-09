import { privateAxios } from "./axios";
export interface TypeGetListProducts {
  keyword: string;
  page: number;
  limit: number;
}
export interface TypeProducts {
  brand?: string;
  category?: string;
  id?: string;
  image?: string;
  name?: string;
  originPrice?: number;
  quantity?: number;
  salePrice?: number;
}

export const getListProducts = async (params: TypeGetListProducts) => {
  return privateAxios.get("/admin/product", {
    params,
  });
};

export const addProduct = (body: TypeProducts) => {
  return privateAxios.post("/admin/product", body);
};

export const updateProduct = (id: string, body: TypeProducts) => {
  return privateAxios.put(`/admin/product/${id}`, body);
};

export const deleteProduct = (id: string) => {
  return privateAxios.delete(`/admin/product/${id}`);
};
