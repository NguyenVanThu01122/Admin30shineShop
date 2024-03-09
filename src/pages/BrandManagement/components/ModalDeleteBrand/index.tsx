import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { ButtonGeneral } from "../../../../components/Ui/button";
import { STRING } from "../../../../helper/constants";
import { deleteBrand, deleteBrandAll } from "../../../../service/brand";
import { GroupButton, StyledCommonModal } from "./styles";

interface ModalDeleteBrandProps {
  isOpenModalDelete: boolean;
  deleteAll: boolean;
  idBrand: { id: string };
  listBrandId: string[];
  setListBrandId: (list: string[]) => void;
  setIsDeleteAll: (value: boolean) => void;
  setIsOpenModalDelete: (value: boolean) => void;
}
export default function ModalDeleteBrand({
  isOpenModalDelete,
  deleteAll,
  idBrand,
  listBrandId,
  setListBrandId,
  setIsDeleteAll,
  setIsOpenModalDelete,
}: ModalDeleteBrandProps) {
  const queryClient = useQueryClient();

  // xử lý xóa brand
  const mutationDeleteOneBrand = useMutation(
    "deleteBrandOne",
    (id: string) => deleteBrand(id),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        handleCancelDelete();
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  // xóa tất cả brand
  const mutationDeleteBrandAll = useMutation(
    "deleteBrandAll",
    (params: { idArr: string[] }) => deleteBrandAll(params),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        (document.getElementById("checkbox-all") as any).checked = false;
        setListBrandId([]);
        setIsDeleteAll(false);
        handleCancelDelete();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message);
      },
    }
  );

  // Hàm xử lý xóa tất cả brand
  const handleDeleteBrandAll = useCallback(() => {
    const params = {
      idArr: listBrandId,
    };
    mutationDeleteBrandAll.mutate(params);
  }, [listBrandId, mutationDeleteBrandAll]);

  // Hàm xử lý  xóa 1 brand
  const handleDeleteOne = useCallback(() => {
    mutationDeleteOneBrand.mutate(idBrand?.id);
  }, [mutationDeleteOneBrand, idBrand]);

  // hàm hủy modal xóa thương hiệu
  const handleCancelDelete = () => {
    setIsOpenModalDelete(false);
    setIsDeleteAll(false);
  };

  return (
    <StyledCommonModal
      open={isOpenModalDelete}
      onCancel={handleCancelDelete}
      width={450}
      centered={true}
      footer={false}
    >
      {deleteAll ? (
        <ConfirmationDialog message={STRING.CONFIRM_DELETE_All} />
      ) : (
        <ConfirmationDialog message={STRING.CONFIRM_DELETE_ONE} />
      )}
      {deleteAll ? (
        <GroupButton>
          <ButtonGeneral onClick={handleCancelDelete}>Hủy</ButtonGeneral>
          <ButtonGeneral
            className="button-delete"
            type="primary"
            onClick={handleDeleteBrandAll}
          >
            xóa tất cả
          </ButtonGeneral>
        </GroupButton>
      ) : (
        <GroupButton>
          <ButtonGeneral onClick={handleCancelDelete}>Hủy</ButtonGeneral>
          <ButtonGeneral
            className="button-delete"
            type="primary"
            onClick={handleDeleteOne}
          >
            xóa
          </ButtonGeneral>
        </GroupButton>
      )}
    </StyledCommonModal>
  );
}
