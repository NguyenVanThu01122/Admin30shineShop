import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormInstance, Input } from "antd";
import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ButtonGeneral } from "../../../../components/Ui/button";
import { FormGeneral } from "../../../../components/Ui/form";
import { InputGeneral } from "../../../../components/Ui/input";
import { ACCEPTED_FORMATS, LABEL, PLACEHOLDER } from "../../../../helper/constants";
import { handle413Error } from "../../../../helper/handleError";
import {
  validateImage,
  validateNameBrand,
} from "../../../../helper/validateForm";
import { TypeBrands, addBrand, updateBrand } from "../../../../service/brand";
import {
  GroupButton,
  NoImage,
  StyledCommonModal,
  StyledImageGeneral,
} from "./styles";

interface ModalBrandProps {
  form: FormInstance;
  editBrand: boolean;
  isOpenModal: boolean;
  handelCancelModal: () => void;
  idBrand: { id: string };
  imageFile: string;
  handleChangeFile: (value: ChangeEvent<HTMLInputElement>) => void;
}
export default function ModalBrand({
  form,
  editBrand,
  imageFile,
  idBrand,
  isOpenModal,
  handelCancelModal,
  handleChangeFile,
}: ModalBrandProps) {
  const queryClient = useQueryClient();

  // xử lý thêm brand
  const mutationAddBrand = useMutation(
    "addBrand",
    (body: TypeBrands) => addBrand(body),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        handelCancelModal();
        queryClient.refetchQueries(["getListBrand"]);
      },
      onError: (err: any) => {
        handle413Error(err);
        toast.error(err.response?.data?.message);
      },
    }
  );

  // xử lý sửa brand
  const mutationEditBrand = useMutation(
    "editBrand",
    (payload: { id: string; body: TypeBrands }) =>
      updateBrand(payload.id, payload.body),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        queryClient.refetchQueries(["getListBrand"]);
        handelCancelModal();
      },
      onError: (err: any) => {
        handle413Error(err);
        toast.error(err.response?.data?.message);
      },
    }
  );

  // hàm handleOnFinish xử lý create và update thương hiệu dựa theo điều kiện
  const handleOnFinish = (value: TypeBrands) => {
    if (editBrand) {
      const bodyUpdate = {
        name: value?.name,
        image: imageFile,
      };
      mutationEditBrand.mutate({
        id: idBrand?.id,
        body: bodyUpdate,
      });
    } else {
      const bodyCreate = {
        name: value?.name,
        image: imageFile, // Chỗ này gửi đường dẫn ảnh base64 string lên, được lưu ở state
      };
      mutationAddBrand.mutate(bodyCreate);
    }
  };

  return (
    <StyledCommonModal
      centered={true}
      width={550}
      open={isOpenModal}
      onCancel={handelCancelModal}
      footer={false}
    >
      <FormGeneral
        className="custom-form"
        onFinish={handleOnFinish}
        form={form}
      >
        <Form.Item
          name="name"
          label={LABEL.NAME_BRAND}
          rules={validateNameBrand}
        >
          <InputGeneral
            className="input-text"
            placeholder={PLACEHOLDER.PLEASE_ENTER_NAME_BRAND}
          />
        </Form.Item>
        <Form.Item
          name="image"
          label={LABEL.IMAGE_BRAND}
          rules={validateImage(imageFile)}
        >
          <Input
            className="input-file"
            type="file"
            onChange={(value) => handleChangeFile(value)}
            accept={ACCEPTED_FORMATS} // định dạng ảnh muốn chọn
          />
        </Form.Item>
        {imageFile ? (
          <StyledImageGeneral className="img-upload" src={imageFile} alt="" />
        ) : (
          <NoImage>Không có thương hiệu nào !</NoImage>
        )}
        {editBrand ? (
          <GroupButton>
            <ButtonGeneral onClick={handelCancelModal} size="large">
              Hủy
            </ButtonGeneral>
            <ButtonGeneral className="add-brand" htmlType="submit" size="large">
              <FontAwesomeIcon className="icon-plus" icon={faPlus} />
              Cập nhật thương hiệu
            </ButtonGeneral>
          </GroupButton>
        ) : (
          <GroupButton>
            <ButtonGeneral onClick={handelCancelModal} size="large">
              Hủy
            </ButtonGeneral>
            <ButtonGeneral className="add-brand" htmlType="submit" size="large">
              <FontAwesomeIcon className="icon-plus" icon={faPlus} />
              Thêm thương hiệu
            </ButtonGeneral>
          </GroupButton>
        )}
      </FormGeneral>
    </StyledCommonModal>
  );
}
