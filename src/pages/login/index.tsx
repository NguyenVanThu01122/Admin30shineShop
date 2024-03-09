import { Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageGeneral from "../../components/Ui/image";
import { InputGeneral } from "../../components/Ui/input";
import { PLACEHOLDER, SUCCESS_MESSAGE } from "../../helper/constants";
import { validateEmail, validatePassword } from "../../helper/validateForm";
import imgLogin from "../../images/img-login.png";
import logoImg from "../../images/logo-login.png";
import { login } from "../../service/login";
import {
  AdminSystemInfo,
  BoxFormLogin,
  BoxImage,
  BrandText,
  ContainerForm,
  ContentLogin,
  LoginItem,
  LoginSubmit,
  LogoLogin,
  StyledFormGeneral,
  StyledImageGeneral,
  WrapperLogin,
} from "./styles";

export default function Login() {
  const [focusInput, setFocusInput] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (value: any) => {
    const body = {
      email: value?.email,
      password: value?.password,
      role: "admin",
    };
    login(body)
      .then((res) => {
        const result = res.data;
        toast.success(SUCCESS_MESSAGE.SUCCESS_LOGIN);
        navigate("/");
        // Lưu token vào cookie
        // document.cookie = `token=${result?.token}; expires=Thu, 01 December
        // 2024 00:00:00 UTC; path=/`; // Token hết hạn sau ngày 01/12/2024
        localStorage.setItem("token", result?.token); // lưu token vào ứng dụng
        localStorage.setItem("refreshToken", result?.refreshToken); // lưu refreshtoken vào ứng dụng
      })
      .catch((error) => toast.error(error.response?.data?.message));
  };

  const handleSubmit = () => form.submit();

  return (
    <WrapperLogin>
      <ContentLogin>
        <BoxImage>
          <StyledImageGeneral src={imgLogin} alt="" />
          <AdminSystemInfo>
            Đây là Hệ thống quản trị của cửa hàng 30shineshop dành cho Quản trị
            viên !
          </AdminSystemInfo>
        </BoxImage>
        <ContainerForm>
          <span className="border-line"></span>
          <BoxFormLogin>
            <LogoLogin>
              <ImageGeneral src={logoImg} alt="" />
              <LoginItem>ĐĂNG NHẬP</LoginItem>
            </LogoLogin>
            <StyledFormGeneral form={form} onFinish={handleFinish}>
              <Form.Item name="email" rules={validateEmail}>
                <InputGeneral
                  className={`custom-input ${
                    focusInput === "email" && "border-violet"
                  }`}
                  onFocus={() => setFocusInput("email")}
                  onBlur={() => setFocusInput("")}
                  size="large"
                  type="email"
                  placeholder={PLACEHOLDER.PLEASE_ENTER_EMAIL}
                />
              </Form.Item>
              <Form.Item name="password" rules={validatePassword}>
                <Input.Password
                  className={`${focusInput === "password" && "border-violet"}`}
                  onFocus={() => setFocusInput("password")}
                  onBlur={() => setFocusInput("")}
                  size="large"
                  placeholder={PLACEHOLDER.PLEASE_ENTER_PASSWORD}
                />
              </Form.Item>
              <LoginSubmit onClick={handleSubmit}>ĐĂNG NHẬP</LoginSubmit>
            </StyledFormGeneral>
          </BoxFormLogin>
          <BrandText>
            <span>Admin</span>
            <span>30Shine</span>
            <span>Shop</span>
          </BrandText>
        </ContainerForm>
      </ContentLogin>
    </WrapperLogin>
  );
}
