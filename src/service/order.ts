import { privateAxios } from "./axios";

export const getListOrder = (params: any) => {
  return privateAxios.get("/admin/order", { params });
};
