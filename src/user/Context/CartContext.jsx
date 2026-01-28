import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, login } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      setCart([]); 
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/users/${user.id}`);
        setCart(data.cart || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [user]);

const syncCart = async (updatedCart) => {
  if (!user) return;
  try {
    await axios.patch(`http://localhost:5000/users/${user.id}`, { cart: updatedCart });

    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (err) {
    console.error("Failed to sync cart:", err);
  }
};


  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    const updatedCart = exists
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    syncCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
