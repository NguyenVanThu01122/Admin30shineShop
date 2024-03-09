import { Form } from "antd";
import { useCallback, useContext, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataMessage from "../../components/NoDataMessage";
import { AppContext } from "../../context";
import {
  ERROR_MESSAGES,
  NO_DATA_MESSAGE,
  SORT_DATE,
} from "../../helper/constants";
import { useSharedStateUtils } from "../../helper/useSharedState";
import { useUploadFile } from "../../helper/useUploadFile";
import { getListBrand } from "../../service/brand";
import ListBrand from "./components/ListBrand";
import ModalBrand from "./components/ModalBrand";
import ModalDeleteBrand from "./components/ModalDeleteBrand";
import PaginationBrand from "./components/PaginationBrand";
import { WrapperBrandManagement } from "./styles";

export function BrandManagement() {
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

  const [sortDate, setSortDate] = useState(SORT_DATE);
  const [listBrandId, setListBrandId] = useState<any>([]);
  const [deleteAll, setIsDeleteAll] = useState<boolean>(false);
  const [handleChangeFile, imageFile, setImageFile] = useUploadFile();
  const [form] = Form.useForm();
  const appContext = useContext(AppContext); // dùng useContext để truy xuất vào context

  // dùng useQuery thao tác với dữ liệu
  const { isLoading } = useQuery(
    ["getListBrand", keyword, sortDate, page, limit],
    () =>
      getListBrand({
        keyword,
        sortDate,
        page,
        limit,
      }),
    {
      onSuccess: (data) => {
        setTotalItem(data.data?.totalBrands);
        appContext?.setSaveBrands(data.data?.data);
      },
      onError: (err) => toast.error(ERROR_MESSAGES.SERVER_ERROR),
    }
  );

  // hàm hủy modal
  const handelCancelModal = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
    setIdItem("");
    setEditItem(null);
    setImageFile("");
  }, [form, setIdItem, setEditItem, setImageFile]);

  return (
    <WrapperBrandManagement>
      <ListBrand
        form={form}
        limit={limit}
        page={page}
        setPage={setPage}
        setKeyword={setKeyword}
        listBrandId={listBrandId}
        setSortDate={setSortDate}
        isLoading={isLoading}
        sortDate={sortDate}
        setIsOpenModalDelete={setIsModalDelete}
        setIsDeleteAll={setIsDeleteAll}
        setIsOpenModal={setIsOpenModal}
        setListBrandId={setListBrandId}
        setIdBrand={setIdItem}
        setEditBrand={setEditItem}
        setImageFile={setImageFile}
      />

      {!appContext?.saveBrands?.length && !isLoading ? (
        <NoDataMessage message={NO_DATA_MESSAGE.NO_BRAND} />
      ) : (
        <PaginationBrand
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalBrands={totalItem}
          setListBrandId={setListBrandId}
        />
      )}
      {/* item modal */}
      <ModalBrand
        form={form}
        idBrand={idItem}
        editBrand={editItem}
        imageFile={imageFile}
        handleChangeFile={handleChangeFile}
        isOpenModal={isOpenModal}
        handelCancelModal={handelCancelModal}
      />
      {/* modal delete */}
      <ModalDeleteBrand
        listBrandId={listBrandId}
        idBrand={idItem}
        deleteAll={deleteAll}
        isOpenModalDelete={isModalDelete}
        setListBrandId={setListBrandId}
        setIsDeleteAll={setIsDeleteAll}
        setIsOpenModalDelete={setIsModalDelete}
      />
    </WrapperBrandManagement>
  );
}
