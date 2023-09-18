import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import { ItemImageLogo, ItemTitleProduct, WrapperSideBar } from "./styles";

function SideBarProducts() {
  const [isTitle, setIsTitle] = useState(true);
  const [isModalLogOut, setIsModalLogOut] = useState(false);
  const navigate = useNavigate();
  const handleShowTitle = () => {
    setIsTitle(!isTitle);
  };
  const pathname = window.location.pathname; // lấy param

  // hàm xử lý đăng xuất
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // hàm mở modal đăng xuât
  const showModalLogOut = () => {
    setIsModalLogOut(true);
  };
  // hàm hủy modal đăng xuất
  const handleCancelModalLogOut = () => {
    setIsModalLogOut(false);
  };
  return (
    <WrapperSideBar>
      <ItemImageLogo>
        <img src={Logo} alt="" />
      </ItemImageLogo>
      <ItemTitleProduct>
        <div className="title-admin" onClick={handleShowTitle}>
          <div>ADMIN 30SHINESHOP</div>
          <img
            src="https://next-style-management.dev.apero.vn/static/media/icon-down.ac6f4248e5f1cda247c43a7423db7dc3.svg"
            alt=""
          />
        </div>
        {isTitle && (
          <div className="group-title">
            <div
              onClick={() => navigate("/")}
              className={`${pathname === "/" && "active"}`}
            >
              Quản lý sản phẩm
            </div>
            <div
              onClick={() => navigate("/user-management")}
              className={pathname === "/user-management" ? "active" : ""}
            >
              Quản lý khách hàng
            </div>
            <div
              onClick={() => navigate("/order-management")}
              className={pathname === "/order-management" ? "active" : ""}
            >
              Quản lý đơn hàng
            </div>
            <div
              onClick={() => navigate("/brand-management")}
              className={pathname === "/brand-management" ? "active" : ""}
            >
              Quản lý thương hiệu
            </div>
            <div
              onClick={() => navigate("/evaluate-lists")}
              className={pathname === "/evaluate-lists" ? "active" : ""}
            >
              Danh sách đánh giá
            </div>
          </div>
        )}
      </ItemTitleProduct>
      <div className="logOut" onClick={handleLogOut}>
        Đăng xuất
      </div>
    </WrapperSideBar>
  );
}
export default SideBarProducts;
