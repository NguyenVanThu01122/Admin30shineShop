export interface TableProductProps {
  form: any;
  isLoading: boolean;
  page: number;
  limit: number;
  setIsModalDelete: (value: boolean) => void;
  setIdProduct: (value: string) => void;
  setEditProduct: (value: any) => void;
  setIsOpenModal: (value: boolean) => void;
  setImageFile: (value: string) => void;
}
