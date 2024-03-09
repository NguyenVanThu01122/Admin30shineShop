import { FormInstance } from "antd";
import { useCallback } from "react";
import { ButtonGeneral } from "../../../../components/Ui/button";
import FormClient from "./form";
import { GroupButton, StyledCommonModal } from "./styles";

interface ModalFormClientProps {
  isOpenModal: boolean;
  form: FormInstance<any>;
  editUser: any;
  setEditUser: (value: any) => void;
  setPage: (value: number) => void;
  setIsOpenModal: (value: boolean) => void;
}

export default function ModalFormClient({
  isOpenModal,
  form,
  editUser,
  setEditUser,
  setPage,
  setIsOpenModal,
}: ModalFormClientProps) {
  // hàm hủy bỏ modal
  const handleCancelModal = useCallback(() => {
    setIsOpenModal(false);
    form.resetFields();
  }, [form, setIsOpenModal]);

  const handleSubmitForm = () => form.submit();

  return (
    <StyledCommonModal
      open={isOpenModal}
      onCancel={handleCancelModal}
      footer={false}
    >
      <FormClient
        editUser={editUser}
        form={form}
        setPage={setPage}
        setIsOpenModal={setIsOpenModal}
        setEditUser={setEditUser}
        handleCancelModal={handleCancelModal}
      />
      {editUser ? (
        <GroupButton>
          <ButtonGeneral
            className="button-cancel"
            size="large"
            onClick={handleCancelModal}
          >
            Hủy
          </ButtonGeneral>
          <ButtonGeneral
            onClick={handleSubmitForm}
            className="button-add"
            size="large"
          >
            Sửa thông tin khách hàng
          </ButtonGeneral>
        </GroupButton>
      ) : (
        <GroupButton>
          <ButtonGeneral
            className="button-cancel"
            size="large"
            onClick={handleCancelModal}
          >
            Hủy
          </ButtonGeneral>
          <ButtonGeneral
            onClick={handleSubmitForm}
            className="button-add"
            size="large"
          >
            Thêm khách hàng
          </ButtonGeneral>
        </GroupButton>
      )}
    </StyledCommonModal>
  );
}
