import { Form, FormInstance, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FormGeneral } from "../../../../components/Ui/form";
import { InputGeneral } from "../../../../components/Ui/input";
import { SelectGeneral } from "../../../../components/Ui/select";
import { LABEL, PLACEHOLDER } from "../../../../helper/constants";
import { optionGender } from "../../../../helper/formOptions";
import { handleError } from "../../../../helper/handleError";
import {
  validateBirthday,
  validateEmail,
  validateGender,
  validateNameClient,
  validatePassword,
  validatePhone,
} from "../../../../helper/validateForm";
import { TypeUsers, addUser, updateUser } from "../../../../service/user";

interface FormClientProps {
  form: FormInstance<any>;
  editUser: any;
  setPage: (page: number) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  setEditUser: (editUser: any) => void;
  handleCancelModal: () => void;
}
export default function FormClient({
  form,
  editUser,
  setPage,
  setIsOpenModal,
  setEditUser,
  handleCancelModal,
}: FormClientProps) {
  const queryClient = useQueryClient();

  // xử lý thêm thông tin khách hàng
  const mutationAddUser = useMutation(
    "add-user",
    (body: TypeUsers) => addUser(body),
    {
      onSuccess: (data) => {
        queryClient.refetchQueries(["getListUser"]); // gọi lại hàm getListUser
        setPage(1);
        form.resetFields();
        toast.success(data.data?.message);
        setIsOpenModal(false);
      },
      onError: (error: any) => {
        handleError(error.response.data);
      },
    }
  );

  // xử lý sửa thông tin khách hàng
  const mutationEditUser = useMutation(
    "edit-user",
    (payload: { id: string; body: TypeUsers }) =>
      updateUser(payload?.id, payload?.body),
    {
      onSuccess: (data) => {
        setEditUser(null);
        handleCancelModal();
        queryClient.refetchQueries(["getListUser"]); // gọi lại hàm getListUser
        toast.success(data.data?.message);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message);
      },
    }
  );

  // hàm handleFinish được gọi khi tất cả các requied trong rules được định nghĩa có giá trị
  const handleFinish = (value: TypeUsers) => {
    if (editUser) {
      const bodyEditUser = {
        name: value?.name,
        gender: value?.gender,
        telephone: value?.telephone,
        date: value?.date,
      };
      mutationEditUser.mutate({
        id: editUser?.id,
        body: bodyEditUser,
      });
    } else {
      const addBody = {
        name: value?.name,
        password: value?.password,
        email: value?.email,
        gender: value?.gender,
        date: value?.date,
        telephone: value?.telephone,
      };
      mutationAddUser.mutate(addBody);
    }
  };

  return (
    <FormGeneral
      onFinish={handleFinish}
      form={form}
      labelCol={{ span: 6 }} // tiêu đề
      wrapperCol={{ span: 18 }} // input
    >
      <Form.Item
        name="name"
        label={LABEL.NAME_CUSTOMER}
        rules={validateNameClient}
      >
        <InputGeneral
          size="large"
          placeholder={PLACEHOLDER.PLEASE_ENTER_NAME}
        />
      </Form.Item>
      <Form.Item name="email" label={LABEL.EMAIL} rules={validateEmail}>
        <InputGeneral
          maxLength={30}
          disabled={editUser ? true : false}
          // readOnly={editUser ? true : false}  // chỉ hiển thị value của input, không thể sửa được value đó
          size="large"
          placeholder={PLACEHOLDER.PLEASE_ENTER_EMAIL}
        />
      </Form.Item>
      {!editUser && (
        <Form.Item
          name="password"
          label={LABEL.PASSWORD}
          hasFeedback
          rules={validatePassword}
        >
          <Input.Password
            disabled={editUser ? true : false}
            hidden={true}
            size="large"
            placeholder={PLACEHOLDER.PLEASE_ENTER_PASSWORD}
          />
        </Form.Item>
      )}

      <Form.Item name="gender" label={LABEL.GENDER} rules={validateGender}>
        <SelectGeneral
          options={optionGender}
          size="large"
          placeholder={PLACEHOLDER.PLEASE_ENTER_GENDER}
        />
      </Form.Item>
      <Form.Item name="telephone" label={LABEL.PHONE} rules={validatePhone}>
        <Input
          type="number"
          size="large"
          placeholder={PLACEHOLDER.PLEASE_ENTER_PHONE}
        />
      </Form.Item>
      <Form.Item name="date" label={LABEL.BIRTHDAY} rules={validateBirthday}>
        <InputGeneral type="date" size="large" />
      </Form.Item>
    </FormGeneral>
  );
}
