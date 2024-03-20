import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ButtonGeneral } from "../../../../components/Ui/button";
import ImageGeneral from "../../../../components/Ui/image";
import { InputGeneral } from "../../../../components/Ui/input";
import { SelectGeneral } from "../../../../components/Ui/select";
import {
  ACCEPTED_FORMATS,
  LABEL,
  PLACEHOLDER,
} from "../../../../helper/constants";
import { optionForm } from "../../../../helper/formOptions";
import { handle413Error } from "../../../../helper/handleError";
import {
  validateBrand,
  validateCategory,
  validateFile,
  validateName,
  validateOriginPrice,
  validateQuantity,
  validateSalePrice,
} from "../../../../helper/validateForm";
import {
  TypeProducts,
  addProduct,
  updateProduct,
} from "../../../../service/product";
import { GroupButton, StyledCommonModal, StyledFormGeneral } from "./styles";
import { ModalProductProps } from "./type";

export default function ModalProduct({
  form,
  isOpenModal,
  cancelModalAddProduct,
  imageFile,
  handleChangeFile,
  setKeyword,
  setPage,
  editProduct,
  setEditProduct,
}: ModalProductProps) {
  const queryClient = useQueryClient();

  // xử lý thêm product
  const mutationAddProduct = useMutation(
    "add-new-product",
    (payload: TypeProducts) => addProduct(payload),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        queryClient.invalidateQueries(["getListProducts"]); // gọi lại getlistProduct
        cancelModalAddProduct();
        setPage(1);
        setKeyword("");
      },
      onError: (error: any) => {
        handle413Error(error);
        toast.error(error.response?.data?.message);
      },
    }
  );

  // xử lý sửa product
  const mutationEditProduct = useMutation(
    "edit-product",
    (payload: { id: string; body: TypeProducts }) =>
      updateProduct(payload.id, payload.body),
    {
      onSuccess: (data) => {
        toast.success(data.data?.message);
        // queryClient.refetchQueries(["getListProducts"]); // ép buộc gọi lại
        queryClient.invalidateQueries(["getListProducts"]); // đánh dấy query đã hết hạn
        cancelModalAddProduct();
        setEditProduct(false);
      },
      onError: (error: any) => {
        handle413Error(error);
        toast.error(error.response?.data?.message);
      },
    }
  );

  // hàm tạo mới sản phẩm và cập nhật sản phẩm theo đkiện
  const handleFinishForm = (value: TypeProducts) => {
    if (editProduct) {
      const editBody = {
        name: value?.name,
        category: value?.category,
        brand: value?.brand,
        quantity: value?.quantity,
        originPrice: value?.originPrice,
        salePrice: value?.salePrice,
        image: imageFile,
      };
      mutationEditProduct.mutate({
        id: editProduct?.id,
        body: editBody,
      });
    } else {
      const addBody = {
        name: value?.name,
        category: value?.category,
        brand: value?.brand,
        quantity: value?.quantity,
        originPrice: value?.originPrice,
        salePrice: value?.salePrice,
        image: imageFile,
      };
      mutationAddProduct.mutate(addBody);
    }
  };

  // hàm gửi form lên server
  const handleSubmitForm = () => form.submit();

  return (
    <StyledCommonModal
      open={isOpenModal}
      onCancel={cancelModalAddProduct}
      footer={false}
      centered
    >
      <StyledFormGeneral
        onFinish={handleFinishForm}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          className="formItem"
          label={LABEL.NAME_PRODUCT}
          name="name"
          rules={validateName}
        >
          <InputGeneral
            className="input"
            size="large"
            placeholder={PLACEHOLDER.ENTER_PRODUCT_NAME}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.CATEGORY}
          name="category"
          rules={validateCategory}
        >
          <SelectGeneral
            className="input"
            size="large"
            placeholder={PLACEHOLDER.PLEASE_ENTER_CATEGORY}
            options={optionForm}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.BRAND}
          name="brand"
          rules={validateBrand}
        >
          <InputGeneral
            className="input"
            placeholder={PLACEHOLDER.PLEASE_ENTER_BRAND}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.QUANTITY}
          name="quantity"
          rules={validateQuantity}
        >
          <InputGeneral
            size="large"
            type="number"
            className="input"
            placeholder={PLACEHOLDER.PLEASE_ENTER_QUANTITY}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.ORIGIN_PRICE}
          name="originPrice"
          dependencies={["salePrice"]} // Xác định phụ thuộc vào trường "salePrice"
          rules={validateOriginPrice}
        >
          <InputGeneral
            className="input"
            type="number"
            size="large"
            placeholder={PLACEHOLDER.PLEASE_ENTER_ORIGIN_PRICE}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.ORIGIN_SALE}
          name="salePrice"
          rules={validateSalePrice}
          dependencies={["originPrice"]} // Xác định phụ thuộc vào trường "originPrice"
        >
          <InputGeneral
            className="input"
            size="large"
            type="number"
            placeholder={PLACEHOLDER.PLEASE_ENTER_SALE_PRICE}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          className="formItem"
          label={LABEL.SELECT_IMAGE_FILE}
          name="image"
          rules={validateFile(imageFile)}
        >
          <Input
            className="inputFile"
            onChange={handleChangeFile}
            type="file"
            accept={ACCEPTED_FORMATS} // định dạng ảnh muốn chọn
          />
        </Form.Item>
        <ImageGeneral className="add-image" src={imageFile} alt="" />
      </StyledFormGeneral>
      {editProduct ? (
        <GroupButton>
          <ButtonGeneral
            size="large"
            onClick={cancelModalAddProduct}
            className="cancel-button"
          >
            Hủy
          </ButtonGeneral>
          <ButtonGeneral
            size="large"
            className="update-button"
            onClick={handleSubmitForm}
          >
            Sửa sản phẩm
          </ButtonGeneral>
        </GroupButton>
      ) : (
        <GroupButton>
          <ButtonGeneral
            size="large"
            onClick={cancelModalAddProduct}
            className="cancel-button"
          >
            Hủy
          </ButtonGeneral>
          <ButtonGeneral
            onClick={handleSubmitForm}
            className="update-button"
            size="large"
          >
            Thêm sản phẩm
          </ButtonGeneral>
        </GroupButton>
      )}
    </StyledCommonModal>
  );
}
