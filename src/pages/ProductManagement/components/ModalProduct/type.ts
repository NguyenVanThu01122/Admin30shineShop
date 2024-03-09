import { FormInstance } from "antd";

export interface ModalProductProps {
  form: FormInstance;
  isOpenModal: boolean;
  cancelModalAddProduct: () => void;
  imageFile: string;
  handleChangeFile: (value: any) => void;
  setKeyword: (value: string) => void;
  setPage: (value: number) => void;
  editProduct: any;
  setEditProduct: React.Dispatch<React.SetStateAction<any>>;
}
