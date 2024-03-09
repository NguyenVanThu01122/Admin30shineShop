import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CommonModal } from "../../../../components/Ui/modal";
import { STRING } from "../../../../helper/constants";
import { deleteProduct } from "../../../../service/product";
interface ModalDeleteProductProps {
  isModalDelete: boolean;
  setIsModalDelete: (value: boolean) => void;
  idProduct: string;
}

export default function ModalDeleteProduct({
  isModalDelete,
  setIsModalDelete,
  idProduct,
}: ModalDeleteProductProps) {
  const queryClient = useQueryClient();

  // xử lý xóa product
  const mutationDeleteProduct = useMutation(
    "delete-product",
    (id: string) => deleteProduct(id),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["getListProducts"]);
        setIsModalDelete(false); // đóng modal khi xóa sp thành công
        toast.success(data.data?.message);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  const cancelModalDeleteProduct = () => setIsModalDelete(false);

  // hàm xóa sản phẩm
  const handleDeleteProduct = () => mutationDeleteProduct.mutate(idProduct);

  return (
    <CommonModal
      width={430}
      title={STRING.CONFIRM_DELETE_PRODUCT}
      open={isModalDelete} // cái này đổi tên lại thành showModalDelete thì hợp lý hơn, đặt tên isDelete không có ý nghĩa lắm
      onCancel={cancelModalDeleteProduct}
      onOk={handleDeleteProduct}
    />
  );
}
