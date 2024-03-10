import { Pagination } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarProducts from "../../components/SideBarProducts";
import { CommonModal } from "../../components/Ui/modal";
import { useCheckLogin } from "../../helper/checkLogin";
import { STRING } from "../../helper/constants";
import { HandleLogout } from "../../helper/handleLogout";
import { WrapperLayout } from "./style";

function LayoutDefault() {
  const [isModalLogOut, setIsModalLogOut] = useState(false);
  const handleCancelModal = () => setIsModalLogOut(false);
  const logout = HandleLogout();
  useCheckLogin();

  return (
    <WrapperLayout>
      <SideBarProducts setIsModalLogOut={setIsModalLogOut} />
      {/* <div> */}
        <Outlet />
        {/* <Pagination></Pagination> */}
      {/* </div> */}

      {/* modal ConfirmDialog logout */}
      <CommonModal
        onOk={logout}
        width={420}
        open={isModalLogOut}
        onCancel={handleCancelModal}
        title={STRING.CONFIRM_LOGOUT}
      />
    </WrapperLayout>
  );
}
export default LayoutDefault;
