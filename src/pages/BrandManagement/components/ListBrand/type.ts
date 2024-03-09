import { FormInstance } from "antd";

export interface ListBrandProps {
  form: FormInstance;
  setImageFile: (value: string) => void;
  limit: number;
  page: number;
  setIdBrand: (value: any) => void;
  setPage: (value: number) => void;
  setKeyword: (value: string) => void;
  listBrandId: string[];
  setSortDate: (value: number) => void;
  isLoading: boolean;
  sortDate: number;
  setIsOpenModalDelete: (value: boolean) => void;
  setIsDeleteAll: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  setListBrandId: (value: any) => void;
  setEditBrand: (value: any) => void;
}
export interface TypeRecord {
  id: string;
  checkbox: boolean;
  name: string;
  image: string;
  createdAt: string;
  action: string;
}
