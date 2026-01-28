// import React, { useContext, useEffect, useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { UserContext } from "../user/Context/UserContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useContext(UserContext);
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Check if user is logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If role is "admin", check if user has is_staff or is_superuser
//   if (role === "admin") {
//     if (!user.is_staff && !user.is_superuser) {
//       return <Navigate to="/" replace />;
//     }
//   }

//   // If role is "user", just check if user exists (already logged in)
//   // Since your users don't have a role field, we assume logged in = regular user

//   return children;
// };

// export default ProtectedRoute;

import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../user/Context/UserContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin route protection (USING ROLE STRING)
  if (role === "admin" && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
