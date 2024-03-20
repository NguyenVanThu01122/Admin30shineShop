import { useNavigate } from "react-router-dom";

export const HandleLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  return logout;
};
