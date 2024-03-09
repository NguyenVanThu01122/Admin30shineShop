import { Form } from "antd";
import { useCallback, useContext } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataMessage from "../../components/NoDataMessage";
import { AppContext } from "../../context";
import { NO_DATA_MESSAGE } from "../../helper/constants";
import { useSharedStateUtils } from "../../helper/useSharedState";
import { useUploadFile } from "../../helper/useUploadFile";
import { getListProducts } from "../../service/product";
import ListProduct from "./components/ListProduct";
import ModalDeleteProduct from "./components/ModalDelete";
import ModalProduct from "./components/ModalProduct";
import PaginationProduct from "./components/PaginationProduct";
import { TitlePage, WrapperProductManagement } from "./styles";

function ProductManagement() {
  const [
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
    totalItem,
    setTotalItem,
    isOpenModal,
    setIsOpenModal,
    isModalDelete,
    setIsModalDelete,
    editItem,
    setEditItem,
    idItem,
    setIdItem,
  ] = useSharedStateUtils();
  const [form] = Form.useForm(); // tạo đối tượng form và làm việc vs form
  const [handleChangeFile, imageFile, setImageFile] = useUploadFile();
  const appContext = useContext(AppContext);

  const { isLoading } = useQuery(
    ["getListProducts", page, limit, keyword],
    () =>
      getListProducts({
        limit,
        page,
        keyword,
      }),
    {
      onSuccess: (data) => {
        appContext?.setSaveProducts(data.data?.data); // lưu data vào product
        setTotalItem(data.data?.totalProducts); // lấy số lượng sp res và lưu vào state totalProducts
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  // hàm này xử lý hủy bỏ modal thêm sản phẩm
  const cancelModalAddProduct = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
    setImageFile("");
  }, [setIsOpenModal, setImageFile, form]);

  return (
    <WrapperProductManagement>
      <TitlePage>QUẢN LÝ SẢN PHẨM</TitlePage>
      <ListProduct
        form={form}
        limit={limit}
        page={page}
        setKeyword={setKeyword}
        setPage={setPage}
        setIsOpenModal={setIsOpenModal}
        setEditProduct={setEditItem}
        isLoading={isLoading}
        setIdProduct={setIdItem}
        setImageFile={setImageFile}
        setIsModalDelete={setIsModalDelete}
      />

      {!appContext?.saveProducts?.length && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_PRODUCT} />
      ) : (
        <PaginationProduct
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalProducts={totalItem}
        />
      )}

      {/* modal add and edit */}
      <ModalProduct
        form={form}
        isOpenModal={isOpenModal}
        editProduct={editItem}
        setEditProduct={setEditItem}
        imageFile={imageFile}
        handleChangeFile={handleChangeFile}
        setKeyword={setKeyword}
        setPage={setPage}
        cancelModalAddProduct={cancelModalAddProduct}
      />

      {/* modal delete */}
      <ModalDeleteProduct
        isModalDelete={isModalDelete}
        setIsModalDelete={setIsModalDelete}
        idProduct={idItem}
      />
    </WrapperProductManagement>
  );
}
export default ProductManagement;
