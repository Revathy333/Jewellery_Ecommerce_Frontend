import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../user/Context/UserContext";

const AdminOnlyRedirect = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default AdminOnlyRedirect;
