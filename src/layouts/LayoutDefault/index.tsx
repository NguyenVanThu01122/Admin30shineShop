import { Navigate, Outlet, useNavigate } from "react-router-dom";
import SideBarProducts from "../../components/SideBarProducts";
import { checkLogin } from "../../helper";
import { WrapperLayout } from "./style";

function LayoutDefault() {
  if (!checkLogin()) {
    return <Navigate to="login" />;
  }

  return (
    <WrapperLayout>
      <SideBarProducts />
      <Outlet />
    </WrapperLayout>
  );
}
export default LayoutDefault;
