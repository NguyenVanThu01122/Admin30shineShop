import { FormInstance } from "antd";

export interface TableProductProps {
  form: FormInstance;
  isLoading: boolean;
  page: number;
  limit: number;
  setIsModalDelete: (value: boolean) => void;
  setIdProduct: (value: string) => void;
  setEditProduct: (value: TypeProduct) => void;
  setIsOpenModal: (value: boolean) => void;
  setImageFile: (value: string) => void;
}

export interface TypeColumn {
  title?: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  render?: (
    value: any,
    record: any,
    index: number
  ) => number | JSX.Element;
}

export interface TypeProduct {
  id: string;
  STT?: number;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  originPrice: number;
  salePrice: number;
  image: string;
  action: string; // hoặc bạn có thể sử dụng enum để định nghĩa các hành động hợp lệ
}
