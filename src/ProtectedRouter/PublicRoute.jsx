  import { useContext } from "react";
  import { Navigate } from "react-router-dom";
  import { UserContext } from "../user/Context/UserContext";

  const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) return null; 

    if (user) {
      return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
    }

    return children; 
  };

  export default PublicRoute;