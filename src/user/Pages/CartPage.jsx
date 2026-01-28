import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../../features/cartSlice";
import { toast } from "react-toastify";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handlePlaceOrder = () => {
    console.log("Place Order clicked");
    console.log("Cart data:", cart);

    // Check if cart is empty
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    console.log("Navigating to checkout with:", { cartItems: cart.items, cart });

    // ✅ FIXED: Changed from "/place" to "/checkout"
    navigate("/checkout", { 
      state: { cartItems: cart.items, cart },
      replace: false 
    });
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <p className="text-center text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <div className="max-w-md mx-auto">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.cart_item_id}
              className="flex items-center gap-6 border-b py-4 hover:bg-gray-50 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.name}</h4>
                <p className="text-gray-600">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <label className="text-xs text-gray-500 mb-1">Qty</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={item.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      if (qty > 0 && qty <= 10) {
                        dispatch(
                          updateCartItem({
                            itemId: item.cart_item_id,
                            quantity: qty,
                          })
                        );
                      }
                    }}
                    className="w-16 border px-2 py-1 text-center rounded"
                  />
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Subtotal</p>
                  <p className="font-bold text-lg">₹{item.subtotal}</p>
                </div>

                <button
                  onClick={() => {
                    dispatch(removeCartItem(item.cart_item_id));
                    toast.success("Item removed from cart");
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove item"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.total_items}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{cart.total_price}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-purple-600">
                    ₹{cart.total_price}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={handleContinueShopping}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>🔒 Secure Checkout</p>
              <p>💳 Multiple Payment Options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;