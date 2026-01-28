import api from "./axios";

// export const getCart = () => api.get("/cart/");
export const getCartAPI = () => api.get("/cart/");


export const addToCartAPI = (productId, quantity = 1) =>
  api.post("/cart/add/", {
    product_id: productId,
    quantity,
  });

export const updateCartItemAPI = (cartItemId, quantity) =>
  api.patch(`/cart/item/${cartItemId}/`, {
    quantity,
  });

export const removeCartItemAPI = (cartItemId) =>
  api.delete(`/cart/item/${cartItemId}/remove/`);

