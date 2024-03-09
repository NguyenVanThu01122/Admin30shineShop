import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import ImageGeneral from "../Ui/image";
// import imgLogo from '../../images/'
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ContentSideBar,
  ItemImageLogo,
  Logout,
  MenuNavigation,
  TitleAdmin,
  TitleText,
  WrapperSideBar,
} from "./styles";

function SideBarProducts({
  setIsModalLogOut,
}: {
  setIsModalLogOut: (value: boolean) => void;
}) {
  const [isTitle, setIsTitle] = useState(true);
  const [iconToggle, setIconToggle] = useState(false);
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const handleShowTitle = () => {
    setIsTitle(!isTitle);
    setIconToggle(!iconToggle);
  };
  // hàm mở modal đăng xuât
  const showModalLogOut = () => setIsModalLogOut(true);

  const menuItem = [
    {
      path: "/",
      label: " Quản lý sản phẩm",
    },
    {
      path: "/user-management",
      label: "Quản lý khách hàng",
    },
    {
      path: "/order-management",
      label: "  Quản lý đơn hàng",
    },
    {
      path: "/brand-management",
      label: "  Quản lý thương hiệu",
    },
    {
      path: "/evaluate-lists",
      label: "Danh sách đánh giá",
    },
  ];

  return (
    <WrapperSideBar>
      <ItemImageLogo>
        <ImageGeneral src={Logo} alt="" />
      </ItemImageLogo>
      <ContentSideBar>
        <TitleAdmin onClick={handleShowTitle}>
          <TitleText>ADMIN 30SHINESHOP</TitleText>
          {iconToggle ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </TitleAdmin>
        {isTitle && (
          <MenuNavigation>
            {menuItem.map((item: { path: string; label: string }) => (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`${pathname === item.path && "active"}`}
              >
                {item?.label}
              </div>
            ))}
          </MenuNavigation>
        )}
      </ContentSideBar>
      <Logout onClick={showModalLogOut}>Đăng xuất</Logout>
    </WrapperSideBar>
  );
}
export default SideBarProducts;
