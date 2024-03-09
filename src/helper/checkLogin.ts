import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (!isLogin) {
      return navigate("/login");
    }
  }, []);
};
