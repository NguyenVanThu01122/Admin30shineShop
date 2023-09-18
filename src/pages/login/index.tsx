import { Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogin from "../../images/img-login.png";
import logoLogin from "../../images/logo-login.png";
import { privateAxios } from "../../service/axios";
import { ItemForm, WrapperPageLogin } from "./styles";

function Login() {
  const [focusInput, setFocusInput] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (value: any) => {
    const body = {
      email: value?.email,
      password: value?.password,
      role: "admin",
    };
    privateAxios
      .post("/login", body)
      .then((res) => {
        message.success(res.data?.message);
        const result = res.data;
        localStorage.setItem("token", result?.token); // lưu token vào ứng dụng
        localStorage.setItem("refreshToken", result?.refreshToken); // lưu refreshtoken vào ứng dụng
        navigate("/");
      })
      .catch((error) => {
        message.error(error.response?.data?.message);
      });
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <WrapperPageLogin>
      <div className="page-login">
        <div className="image-login">
          <img src={imgLogin} alt="" />
          <div className="text-container">
            Đây là Hệ thống quản trị của cửa hàng 30shineshop dành cho Quản trị
            viên !
          </div>
        </div>

        <div className="block-form">
          <span className="border-line"></span>
          <div className="form-login">
            <div className="logo-login">
              <img src={logoLogin} alt="" />
              <div>ĐĂNG NHẬP</div>
            </div>
            <ItemForm form={form} onFinish={handleFinish}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email !" },
                  () => ({
                    validator(_, value: string) {
                      if (value.includes("@") === false && value !== "") {
                        return Promise.reject(
                          new Error("Vui lòng nhập đúng định dạng !")
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Input
                  className={`custom-input ${
                    focusInput === "email" && "border-violet"
                  }`}
                  onFocus={() => setFocusInput("email")} //hàm onFocus xảy ra khi click vào input
                  onBlur={() => setFocusInput("")} //hàm onBlur xảy ra khi click ra khỏi input
                  size="large"
                  type="email"
                  placeholder="Vui lòng nhập Email !"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mập khẩu !",
                  },
                ]}
              >
                <Input.Password
                  className={`${focusInput === "password" && "border-violet"}`}
                  onFocus={() => setFocusInput("password")}
                  onBlur={() => setFocusInput("")}
                  size="large"
                  placeholder="Vui lòng nhập mật khẩu !"
                />
              </Form.Item>
              <div className="submit-button" onClick={handleSubmit}>
                ĐĂNG NHẬP
              </div>
            </ItemForm>
          </div>
          <div className="brand-text">
            <span>Admin</span>
            <span>30Shine</span>
            <span>Shop</span>
          </div>
        </div>
      </div>
    </WrapperPageLogin>
  );
}
export default Login;
