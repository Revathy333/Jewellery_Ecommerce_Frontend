// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ordersRes, usersRes] = await Promise.all([
//           axios.get("http://localhost:5000/orders"),
//           axios.get("http://localhost:5000/users"),
//         ]);

//         // Sort orders , latst on top
//         const sortedOrders = ordersRes.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );

//         setOrders(sortedOrders);
//         setUsers(usersRes.data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load data");
//       }
//     };
//     fetchData();
//   }, []);

//   const getUserDetails = (userId) => users.find((u) => u.id === userId) || {};

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/orders/${orderId}`, {
//         status: newStatus,
//       });
//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//       );
//       toast.success(`Order status updated to ${newStatus}`);
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const getAllowedStatuses = (currentStatus) => {
//     switch (currentStatus) {
//       case "pending":
//         return ["pending", "shipped", "canceled"];
//       case "shipped":
//         return ["shipped", "delivered", "canceled"];
//       case "delivered":
//       case "canceled":
//         return [currentStatus]; // Locked
//       default:
//         return ["pending", "shipped", "delivered", "canceled"];
//     }
//   };

//   // Pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(orders.length / ordersPerPage);

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Manage Orders
//       </h1>

//       <div className="space-y-4">
//         {currentOrders.map((order) => {
//           const user = getUserDetails(order.userId);
//           const items = order.items || [];
//           const totalPrice = items.reduce(
//             (sum, item) => sum + (item.offerprice || 0) * (item.quantity || 0),
//             0
//           );

//           const allowedStatuses = getAllowedStatuses(order.status);

//           return (
//             <div
//               key={order.id}
//               className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="flex-1 space-y-1">
//                 <h2 className="font-semibold text-lg">
//                   Order ID: <span className="font-normal">{order.id}</span>
//                 </h2>
//                 <p>
//                   <span className="font-medium">User:</span> {user.name || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Email:</span> {user.email || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Date:</span> {order.date}
//                 </p>
//               </div>

//               <div className="flex-1 mt-4 md:mt-0 md:ml-6 space-y-2">
//                 <p className="font-medium mb-2">Products:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
//                     >
//                       <span>{item.name}</span>
//                       <span className="bg-purple-300 text-white rounded-full px-2 py-0.5 text-xs">
//                         × {item.quantity || 1}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="mt-2 font-medium">Total: ₹{totalPrice}</p>
//               </div>

//               <div className="flex items-center mt-4 md:mt-0 md:ml-6 space-x-2">
//                 <select
//                   value={order.status}
//                   onChange={(e) =>
//                     handleStatusChange(order.id, e.target.value)
//                   }
//                   disabled={order.status === "delivered" || order.status === "canceled"}
//                   className={`px-3 py-1 rounded-lg font-medium text-sm outline-none cursor-pointer
//                     ${
//                       order.status === "pending"
//                         ? "bg-gradient-to-r from-yellow-100 to-yellow-200"
//                         : order.status === "shipped"
//                         ? "bg-gradient-to-r from-blue-100 to-blue-200"
//                         : order.status === "delivered"
//                         ? "bg-gradient-to-r from-green-300 to-green-400 text-white"
//                         : "bg-gradient-to-r from-red-300 to-red-400 text-white"
//                     }`}
//                 >
//                   {allowedStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
//               ${
//                 currentPage === i + 1
//                   ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageOrders;


// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { toast } from "react-toastify";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ordersRes, usersRes] = await Promise.all([
//           api.get("admin/orders/"),
//           api.get("admin/users/"),
//         ]);

//         // Sort orders, latest on top
//         const sortedOrders = ordersRes.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );

//         setOrders(sortedOrders);
//         setUsers(usersRes.data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load data");
//       }
//     };
//     fetchData();
//   }, []);

//   const getUserDetails = (userId) => users.find((u) => u.id === userId) || {};

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await api.patch(`admin/orders/${orderId}/`, {
//         status: newStatus,
//       });
//       setOrders((prev) =>
//         prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//       );
//       toast.success(`Order status updated to ${newStatus}`);
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const getAllowedStatuses = (currentStatus) => {
//     switch (currentStatus) {
//       case "pending":
//         return ["pending", "shipped", "canceled"];
//       case "shipped":
//         return ["shipped", "delivered", "canceled"];
//       case "delivered":
//       case "canceled":
//         return [currentStatus]; // Locked
//       default:
//         return ["pending", "shipped", "delivered", "canceled"];
//     }
//   };

//   // Pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(orders.length / ordersPerPage);

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Manage Orders
//       </h1>

//       <div className="space-y-4">
//         {currentOrders.map((order) => {
//           const user = getUserDetails(order.userId);
//           const items = order.items || [];
//           const totalPrice = items.reduce(
//             (sum, item) => sum + (item.offer_price || 0) * (item.quantity || 0),
//             0
//           );

//           const allowedStatuses = getAllowedStatuses(order.status);

//           return (
//             <div
//               key={order.id}
//               className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-2xl transition-shadow duration-300"
//             >
//               <div className="flex-1 space-y-1">
//                 <h2 className="font-semibold text-lg">
//                   Order ID: <span className="font-normal">{order.id}</span>
//                 </h2>
//                 <p>
//                   <span className="font-medium">User:</span> {user.name || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Email:</span> {user.email || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Date:</span> {order.date}
//                 </p>
//               </div>

//               <div className="flex-1 mt-4 md:mt-0 md:ml-6 space-y-2">
//                 <p className="font-medium mb-2">Products:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {items.map((item) => (
//                     <div
//                       key={item.id}
//                       className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
//                     >
//                       <span>{item.name}</span>
//                       <span className="bg-purple-300 text-white rounded-full px-2 py-0.5 text-xs">
//                         × {item.quantity || 1}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="mt-2 font-medium">Total: ₹{totalPrice}</p>
//               </div>

//               <div className="flex items-center mt-4 md:mt-0 md:ml-6 space-x-2">
//                 <select
//                   value={order.status}
//                   onChange={(e) =>
//                     handleStatusChange(order.id, e.target.value)
//                   }
//                   disabled={order.status === "delivered" || order.status === "canceled"}
//                   className={`px-3 py-1 rounded-lg font-medium text-sm outline-none cursor-pointer
//                     ${
//                       order.status === "pending"
//                         ? "bg-gradient-to-r from-yellow-100 to-yellow-200"
//                         : order.status === "shipped"
//                         ? "bg-gradient-to-r from-blue-100 to-blue-200"
//                         : order.status === "delivered"
//                         ? "bg-gradient-to-r from-green-300 to-green-400 text-white"
//                         : "bg-gradient-to-r from-red-300 to-red-400 text-white"
//                     }`}
//                 >
//                   {allowedStatuses.map((status) => (
//                     <option key={status} value={status}>
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => handlePageChange(i + 1)}
//             className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
//               ${
//                 currentPage === i + 1
//                   ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageOrders;

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("admin/orders/");
      // Sort by created_at, latest first
      const sortedOrders = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`admin/orders/${orderId}/`, {
        status: newStatus,
      });
      
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const getAllowedStatuses = (currentStatus) => {
    const statusUpper = currentStatus?.toUpperCase();
    
    switch (statusUpper) {
      case "PENDING":
        return ["PENDING", "PLACED", "SHIPPED", "CANCELLED"];
      case "PLACED":
        return ["PLACED", "SHIPPED", "CANCELLED"];
      case "SHIPPED":
        return ["SHIPPED", "DELIVERED", "CANCELLED"];
      case "DELIVERED":
      case "CANCELLED":
        return [statusUpper]; // Locked
      default:
        return ["PENDING", "PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];
    }
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manage Orders
      </h1>

      <div className="space-y-4">
        {currentOrders.map((order) => {
          const items = order.items || [];
          const totalPrice = order.total_amount || 0;
          const allowedStatuses = getAllowedStatuses(order.status);

          return (
            <div
              key={order.id}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex-1 space-y-1">
                <h2 className="font-semibold text-lg">
                  Order ID: <span className="font-normal">{order.id}</span>
                </h2>
                <p>
                  <span className="font-medium">User:</span>{" "}
                  {order.user_email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {order.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.payment_method || "N/A"}
                </p>
              </div>

              <div className="flex-1 mt-4 md:mt-0 md:ml-6 space-y-2">
                <p className="font-medium mb-2">Products:</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
                    >
                      <span>{item.product_name || "Product"}</span>
                      <span className="bg-purple-300 text-white rounded-full px-2 py-0.5 text-xs">
                        × {item.quantity || 1}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 font-medium">Total: ₹{totalPrice}</p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 md:ml-6 space-x-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={
                    order.status === "DELIVERED" || order.status === "CANCELLED"
                  }
                  className={`px-3 py-1 rounded-lg font-medium text-sm outline-none cursor-pointer
                    ${
                      order.status === "PENDING"
                        ? "bg-gradient-to-r from-yellow-100 to-yellow-200"
                        : order.status === "PLACED"
                        ? "bg-gradient-to-r from-blue-100 to-blue-200"
                        : order.status === "SHIPPED"
                        ? "bg-gradient-to-r from-indigo-100 to-indigo-200"
                        : order.status === "DELIVERED"
                        ? "bg-gradient-to-r from-green-300 to-green-400 text-white"
                        : "bg-gradient-to-r from-red-300 to-red-400 text-white"
                    }`}
                >
                  {allowedStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {orders.length === 0 && (
        <p className="text-center text-gray-600 py-8">No orders found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200
                ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;