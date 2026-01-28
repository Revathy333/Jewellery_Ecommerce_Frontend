// import React, { createContext, useState, useEffect, useContext } from "react";
// import { UserContext } from "./UserContext";
// import api from "../../api/axios";

// export const OrdersContext = createContext();

// export const OrdersProvider = ({ children }) => {
//   const { user } = useContext(UserContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);


//   useEffect(() => {
//   if (!user?.id) {
//     setOrders([]);
//     return;
//   }

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/orders/");
//       setOrders(res.data || []);
//     } catch (err) {
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrders();
// }, [user?.id]); // ✅ depend on primitive, not object


//   // Place order
//   const placeOrder = async (orderData) => {
//     if (!user) return null;

//     try {
//       const res = await api.post("/orders/place/", orderData);
//       console.log("Order placed:", res.data);
      
//       // Fetch updated orders list
//       const ordersRes = await api.get("/orders/");
//       setOrders(ordersRes.data || []);
      
//       return res.data;
//     } catch (err) {
//       console.error("Failed to place order:", err);
//       throw err;
//     }
//   };

//   return (
//     <OrdersContext.Provider value={{ orders, placeOrder, loading }}>
//       {children}
//     </OrdersContext.Provider>
//   );
// };

// In OrdersContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "./UserContext";
import api from "../../api/axios";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders function
  const fetchOrders = useCallback(async () => {
    if (!user?.id) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/orders/");
      console.log("✅ Fetched orders:", res.data);
      setOrders(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch orders when user changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Place order
  const placeOrder = async (orderData) => {
    if (!user) return null;

    try {
      const res = await api.post("/orders/place/", orderData);
      console.log("✅ Order placed:", res.data);
      
      // Immediately refetch orders to get the latest
      await fetchOrders();
      
      return res.data;
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      throw err;
    }
  };

  // Refresh orders manually
  const refreshOrders = () => {
    console.log("🔄 Manually refreshing orders...");
    fetchOrders();
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, loading, refreshOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};