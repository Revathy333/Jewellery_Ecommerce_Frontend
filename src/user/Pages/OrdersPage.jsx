// // In OrdersPage.jsx
// import React, { useContext } from "react";
// import { OrdersContext } from "../Context/OrdersContext";

// const OrdersPage = () => {
//   const { orders = [], loading } = useContext(OrdersContext); 

//   if (loading) {
//     return (
//       <div className="container mx-auto px-6 py-10 text-center">
//         <p className="text-gray-600">Loading your orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

//       {orders.length === 0 ? (
//         <div className="text-center mt-10">
//           <svg
//             className="mx-auto h-24 w-24 text-gray-400 mb-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//             />
//           </svg>
//           <p className="text-gray-600 mt-4 text-lg">
//             You haven't placed any orders yet.
//           </p>
//           <button
//             onClick={() => window.location.href = '/products'}
//             className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
//           >
//             Start Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {[...orders]
//             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
//             .map((order) => (
//               <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg border">
//                 <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 border-b pb-4">
//                   <div>
//                     <span className="font-bold text-lg text-gray-800">
//                       Order ID: #{order.id}
//                     </span>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {new Date(order.created_at).toLocaleDateString('en-IN', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   </div>
//                   <div className="mt-3 md:mt-0">
//                     <span
//                       className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
//                         order.status === "PENDING"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : order.status === "PLACED"
//                           ? "bg-purple-100 text-purple-700"
//                           : order.status === "SHIPPED"
//                           ? "bg-blue-100 text-blue-700"
//                           : order.status === "DELIVERED"
//                           ? "bg-green-100 text-green-700"
//                           : order.status === "CANCELLED"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-4 mb-4">
//                   {order.items?.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between pb-3 border-b last:border-b-0"
//                     >
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={item.product_image}
//                           alt={item.product_name}
//                           className="w-20 h-20 object-cover rounded border"
//                         />
//                         <div>
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {item.product_name}
//                           </h3>
//                           <p className="text-sm text-gray-500 mt-1">
//                             ₹{item.price} × {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="font-bold text-lg text-gray-800">
//                         ₹{(item.price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-4 border-t">
//                   <div className="text-sm text-gray-600 mb-3 md:mb-0">
//                     <p className="mb-1">
//                       <span className="font-semibold">Total Items:</span> {order.items?.length || 0}
//                     </p>
//                     <p className="mb-1">
//                       <span className="font-semibold">Payment:</span> {order.payment_method?.toUpperCase()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-gray-600 text-sm mb-1">Total Amount</p>
//                     <p className="text-2xl font-bold text-purple-600">
//                       ₹{parseFloat(order.total_amount).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;

// In OrdersPage.jsx
import React, { useContext, useEffect } from "react";
import { OrdersContext } from "../Context/OrdersContext";

const OrdersPage = () => {
  const { orders = [], loading, refreshOrders } = useContext(OrdersContext); 

  // Refresh orders when component mounts
  useEffect(() => {
    console.log("📄 OrdersPage mounted - refreshing orders");
    refreshOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="text-gray-600 mt-4 text-lg">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => window.location.href = '/products'}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {[...orders]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
            .map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg border">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 border-b pb-4">
                  <div>
                    <span className="font-bold text-lg text-gray-800">
                      Order ID: #{order.id}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "PLACED"
                          ? "bg-purple-100 text-purple-700"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {item.product_name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-3 md:mb-0">
                    <p className="mb-1">
                      <span className="font-semibold">Total Items:</span> {order.items?.length || 0}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Payment:</span> {order.payment_method?.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{parseFloat(order.total_amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;