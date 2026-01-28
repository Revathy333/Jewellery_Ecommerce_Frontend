// import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { UserContext } from "../user/Context/UserContext";


// import { useNavigate, NavLink, Outlet } from "react-router-dom";
// import axios from "axios";
// import {
//   FiBox,
//   FiUsers,
//   FiLogOut,
//   FiHome,
//   FiShoppingBag,
//   FiUser
// } from "react-icons/fi";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [admin, setAdmin] = useState(null);
//   const { logout } = useContext(UserContext);

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/admins");
//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setAdmin(res.data[0]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch admin data:", err);
//       }
//     };
//     fetchAdmin();
//   }, []);

  
//   const handleLogout = () => {
//     logout();
//   };

//   const collapsedWidth = 80; 
//   const expandedWidth = 256; 

//   return (
//     <div className="flex">
//       <aside
//         className={`${
//           isHovered ? "w-64" : "w-20"
//         } bg-white fixed top-0 left-0 h-screen shadow-lg transition-all duration-300 flex-shrink-0 flex flex-col`}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="flex-1 flex flex-col overflow-y-auto pt-4 hide-scrollbar ">
//           <div className="flex items-center gap-3 p-4 mt-4">
//             <img
//               src={admin?.image || "/adminpic.jpg"}
//               alt={admin?.name || "Admin"}
//               className="w-12 h-12 rounded-full border object-cover"
//             />
//             <div
//               className={`flex flex-col transition-opacity duration-300 ${
//                 isHovered ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <span className="font-semibold text-gray-800">
//                 {admin?.name || "Admin"}
//               </span>
//               <span className="text-sm text-gray-500">
//                 {admin?.email || ""}
//               </span>
//             </div>
//           </div>

//           <nav className="flex flex-col mt-6 gap-4">
//             {[
//               {
//                 to: "/admin",
//                 icon: <FiHome size={24} className="text-purple-600" />,
//                 label: "Dashboard",
//               },
//               {
//                 to: "/admin/products",
//                 icon: <FiBox size={24} className="text-purple-600" />,
//                 label: "Manage Products",
//               },
//               {
//                 to: "/admin/users",
//                 icon: <FiUsers size={24} className="text-purple-600" />,
//                 label: "Manage Users",
//               },
//               {
//                 to: "/admin/orders",
//                 icon: <FiShoppingBag size={24} className="text-purple-600" />,
//                 label: "Manage Orders",
//               },
//               {
//                 to: "/admin/settings",
//                 icon: <FiUser size={24} className="text-purple-600" />,
//                 label: "Profile",

//               },
//             ].map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className="flex items-center gap-4 p-4 hover:bg-purple-100 rounded-lg transition relative"
//               >
//                 <div className="flex-shrink-0">{item.icon}</div>
//                 <span
//                   className={`transition-opacity duration-300 absolute left-16 whitespace-nowrap ${
//                     isHovered ? "opacity-100" : "opacity-0"
//                   }`}
//                 >
//                   {item.label}
//                 </span>
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         <div className="p-4 mt-auto">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 p-3 w-full text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-purple-500 hover:to-pink-500 transition relative"
//           >
//             <FiLogOut size={20} />
//             <span
//               className={`transition-opacity duration-300 absolute left-16 whitespace-nowrap ${
//                 isHovered ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               Logout
//             </span>
//           </button>
//         </div>
//       </aside>

//       <main
//         className="flex-1 transition-all duration-300"
//         style={{
//           marginLeft: isHovered ? `${expandedWidth}px` : `${collapsedWidth}px`,
//         }}
//       >
//         <div className="p-6">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../user/Context/UserContext";

import { useNavigate, NavLink, Outlet } from "react-router-dom";
import {
  FiBox,
  FiUsers,
  FiLogOut,
  FiHome,
  FiShoppingBag,
  FiUser
} from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const collapsedWidth = 80; 
  const expandedWidth = 256; 

  return (
    <div className="flex">
      <aside
        className={`${
          isHovered ? "w-64" : "w-20"
        } bg-white fixed top-0 left-0 h-screen shadow-lg transition-all duration-300 flex-shrink-0 flex flex-col`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-1 flex flex-col overflow-y-auto pt-4 hide-scrollbar ">
          <div className="flex items-center gap-3 p-4 mt-4">
            <img
              src={user?.image || "/adminpic.jpg"}
              alt={user?.name || "Admin"}
              className="w-12 h-12 rounded-full border object-cover"
            />
            <div
              className={`flex flex-col transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="font-semibold text-gray-800">
                {user?.name || user?.email || "Admin"}
              </span>
              <span className="text-sm text-gray-500">
                {user?.email || ""}
              </span>
            </div>
          </div>

          <nav className="flex flex-col mt-6 gap-4">
            {[
              {
                to: "/admin",
                icon: <FiHome size={24} className="text-purple-600" />,
                label: "Dashboard",
              },
              {
                to: "/admin/products",
                icon: <FiBox size={24} className="text-purple-600" />,
                label: "Manage Products",
              },
              {
                to: "/admin/users",
                icon: <FiUsers size={24} className="text-purple-600" />,
                label: "Manage Users",
              },
              {
                to: "/admin/orders",
                icon: <FiShoppingBag size={24} className="text-purple-600" />,
                label: "Manage Orders",
              },
              {
                to: "/admin/settings",
                icon: <FiUser size={24} className="text-purple-600" />,
                label: "Profile",

              },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex items-center gap-4 p-4 hover:bg-purple-100 rounded-lg transition relative"
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span
                  className={`transition-opacity duration-300 absolute left-16 whitespace-nowrap ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:from-purple-500 hover:to-pink-500 transition relative"
          >
            <FiLogOut size={20} />
            <span
              className={`transition-opacity duration-300 absolute left-16 whitespace-nowrap ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      <main
        className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isHovered ? `${expandedWidth}px` : `${collapsedWidth}px`,
        }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
