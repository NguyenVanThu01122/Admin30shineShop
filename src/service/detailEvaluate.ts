import { privateAxios } from "./axios";

export interface getDetailEvaluateType {
  page: number;
  limit: number;
  sortDate: string;
  sortStar: string;
}
export const getDetailEvaluate = (
  id: string,
  params: getDetailEvaluateType
) => {
  return privateAxios.get(`/admin/evaluate/${id}`, {
    params,
  });
};

export const UpdateAllowVisible = (
  idEvaluate: string,
  objAllowVisible: { allowVisible: boolean }
) => {
  return privateAxios.put(`/admin/evaluate/allow-visible/${idEvaluate}`, {
    objAllowVisible,
  });
};

export const deleteDetailEvaluate = (idEvaluate: string) => {
  return privateAxios.delete(`/admin/evaluate/${idEvaluate}`);
};
