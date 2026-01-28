// import { createSlice } from "@reduxjs/toolkit";

// const getCurrentUserId = () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?.id || null;
//   } catch {
//     return null;
//   }
// };

// const loadCart = (userId) => {
//   if (!userId) return [];
//   const savedCart = localStorage.getItem(`cart_${userId}`);
//   return savedCart ? JSON.parse(savedCart) : [];
// };

// const saveCart = (userId, cart) => {
//   if (userId) {
//     localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
//   }
// };

// const initialUserId = getCurrentUserId();
// const initialCart = loadCart(initialUserId);

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: initialCart,
//     userId: initialUserId,
//   },
//   reducers: {
//     setUserId: (state, action) => {
//       const userId = action.payload;
//       state.userId = userId;
//       state.cart = loadCart(userId);
//     },

//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existing = state.cart.find((item) => item.id === product.id);
    
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.cart.push({ ...product, quantity: 1 });
//       }
    
//       saveCart(state.userId, state.cart);
//     },

//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//       saveCart(state.userId, state.cart);
//     },

//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const item = state.cart.find((item) => item.id === id);
//       if (item) item.quantity = quantity;
//       saveCart(state.userId, state.cart);
//     },

//     clearCart: (state) => {
//       state.cart = [];
//       saveCart(state.userId, []);
//     },

//     setCart: (state, action) => {
//       state.cart = action.payload || [];
//       saveCart(state.userId, state.cart);
//     },

//     setCartFromBackend: (state, action) => {
//   state.cart = action.payload || [];
// },

//   },
// });

// export const {
//   setUserId,
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
//   setCart,
//   setCartFromBackend,
// } = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
} from "../api/cart";

/* ---------------- THUNKS ---------------- */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCartAPI();
      return res.data; // { id, items, created_at }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await addToCartAPI(productId, quantity);
      const res = await getCartAPI(); // 🔥 always refetch
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add to cart");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      await updateCartItemAPI(itemId, quantity);
      const res = await getCartAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to update item");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      await removeCartItemAPI(itemId);
      const res = await getCartAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to remove item");
    }
  }
);

/* ---------------- SLICE ---------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },   // ✅ ALWAYS OBJECT
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState(state) {
      state.cart = { items: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
