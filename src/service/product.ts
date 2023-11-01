import { privateAxios } from "./axios";

export const getListproducts = async (params: any) => {
  return privateAxios.get("/admin/product", {
    params,
  });
};

export const addProduct = (body: any) => {
  return privateAxios.post("/admin/product", body);
};

export const updateProduct = (id: string, body: any) => {
  return privateAxios.put(`/admin/product/${id}`, body);
};

export const deleteProduct = (id: string) => {
  return privateAxios.delete(`/admin/product/${id}`);
};


