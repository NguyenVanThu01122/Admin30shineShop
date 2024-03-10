import { privateAxios } from "./axios";

export interface getListEvaluateType {
  page: number;
  limit: number;
  keyword: string;
}
export const getListEvaluate = (params: getListEvaluateType) => {
  return privateAxios.get("/admin/evaluate/", { params });
};
