import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBarProducts from "../../components/SideBarProducts";
import { CommonModal } from "../../components/Ui/modal";
import { useCheckLogin } from "../../helper/checkLogin";
import { WrapperLayout } from "./style";
import { STRING } from "../../helper/constants";

function LayoutDefault() {
  const [isModalLogOut, setIsModalLogOut] = useState(false);
  const handleCancelModal = () => setIsModalLogOut(false);
  const navigate = useNavigate();
  useCheckLogin(); 

  // hàm xử lý đăng xuất
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <WrapperLayout>
      <SideBarProducts setIsModalLogOut={setIsModalLogOut} />
      <Outlet />
      <CommonModal
        onOk={handleLogOut}
        width={420}
        open={isModalLogOut}
        onCancel={handleCancelModal}
        title={STRING.CONFIRM_LOGOUT}
      />
    </WrapperLayout>
  );
}
export default LayoutDefault;
