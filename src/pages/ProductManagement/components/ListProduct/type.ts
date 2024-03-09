export interface ListProductProps {
  form: any;
  limit: number;
  page: number;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProduct: React.Dispatch<React.SetStateAction<any>>; // Kiểu dữ liệu của editProduct không rõ
  isLoading: boolean;
  setIdProduct: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<string>>; // Kiểu dữ liệu của image không rõ
  setIsModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
