// import { createContext, useState, useContext, useEffect } from "react";
// import { UserContext } from "./UserContext";
// import axios from "axios";
// import api from "../../api/axios";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     if (!user) {
//       setWishlist([]);
//       return;
//     }

//     const fetchWishlist = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:5000/users/${user.id}`);
//         setWishlist(data.wishlist || []);
//       } catch (err) {
//         console.error("Error loading wishlist:", err);
//       }
//     };

//     fetchWishlist();
//   }, [user]);

//   const syncWishlist = async (updatedWishlist) => {
//     if (!user) return;
//     try {
//       await axios.patch(`http://localhost:5000/users/${user.id}`, {
//         wishlist: updatedWishlist,
//       });
//     } catch (err) {
//       console.error("Error syncing wishlist:", err);
//     }
//   };

//   const addToWishlist = (product) => {
//     setWishlist((prev) => {
//       if (!prev.find((item) => item.id === product.id)) {
//         const updated = [...prev, product];
//         syncWishlist(updated);
//         return updated;
//       }
//       return prev;
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => {
//       const updated = prev.filter((item) => item.id !== id);
//       syncWishlist(updated);
//       return updated;
//     });
//   };

//   const clearWishlist = () => {
//     setWishlist([]);
//     syncWishlist([]);
//   };

//   const toggleWishlist = (product) => {
//     setWishlist((prev) => {
//       let updated;
//       if (prev.find((item) => item.id === product.id)) {
//         updated = prev.filter((item) => item.id !== product.id);
//       } else {
//         updated = [...prev, product];
//       }
//       syncWishlist(updated);
//       return updated;
//     });
//   };

//   const isInWishlist = (id) => wishlist.some((item) => item.id === id);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         clearWishlist,
//         toggleWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import api from "../../api/axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(UserContext);

  // ---------------------------
  // Fetch wishlist from backend
  // ---------------------------
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist/");
        setWishlist(res.data.products || []);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user]);

  // ---------------------------
  // Add to wishlist
  // ---------------------------
  const addToWishlist = async (product) => {
    if (!user) return;

    try {
      await api.post("/wishlist/add/", {
        product_id: product.id,
      });

      setWishlist((prev) => [...prev, product]);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // ---------------------------
  // Remove from wishlist
  // ---------------------------
  const removeFromWishlist = async (productId) => {
    if (!user) return;

    try {
      await api.delete(`/wishlist/remove/${productId}/`);

      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // ---------------------------
  // Toggle wishlist
  // ---------------------------
  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const clearWishlist = async () => {
    if (!user) return;

    try {
      await api.delete("/wishlist/clear/");
      setWishlist([]);
    } catch (err) {
      console.error("Error clearing wishlist:", err);
    }
  };

const isInWishlist = (id) =>
  Array.isArray(wishlist) && wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
