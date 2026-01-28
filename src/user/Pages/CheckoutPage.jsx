// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../../api/axios";

// const CheckoutPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Get cart data from navigation state
//   const { cartItems, cart } = location.state || {};

//   // Form data state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     paymentMethod: "cod",
//   });

//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Prepare order data for backend
//       const orderData = {
//         shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
//         phone: formData.phone,
//         payment_method: formData.paymentMethod,
//       };

//       console.log("Submitting order:", orderData);

//       // ✅ Send order to backend - matches your Django URL
//       const response = await api.post("orders/place/", orderData);

//       console.log("Order response:", response.data);

//       // Show success message
//       toast.success("Order placed successfully! 🎉");
      
//       // Navigate to orders page
//       navigate("/orders");

//     } catch (error) {
//       console.error("Order Error:", error);
//       console.error("Error details:", error.response?.data);
//       toast.error(error.response?.data?.error || "Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Redirect if no cart data
//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-6 py-10 text-center">
//         <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
//         <button
//           onClick={() => navigate("/cart")}
//           className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
//         >
//           Go to Cart
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold mb-8">Checkout</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Side - Checkout Form */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Personal Information */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium mb-2">
//                     Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="9876543210"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Shipping Address */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Address *
//                   </label>
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     rows="3"
//                     className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="House No., Street, Locality"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       City *
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                       className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Mumbai"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       State *
//                     </label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       required
//                       className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Maharashtra"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Pincode *
//                     </label>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       required
//                       pattern="[0-9]{6}"
//                       className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="400001"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={formData.paymentMethod === "cod"}
//                     onChange={handleChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="font-medium">Cash on Delivery (COD)</span>
//                 </label>

//                 <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="online"
//                     checked={formData.paymentMethod === "online"}
//                     onChange={handleChange}
//                     className="w-4 h-4"
//                   />
//                   <span className="font-medium">Online Payment (UPI/Card)</span>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Placing Order..." : "Place Order Now"}
//             </button>
//           </form>
//         </div>

//         {/* Right Side - Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-4">
//             <h3 className="text-xl font-bold mb-4">Order Summary</h3>

//             {/* Cart Items */}
//             <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
//               {cartItems.map((item) => (
//                 <div key={item.cart_item_id} className="flex gap-3 pb-3 border-b">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-sm">{item.name}</p>
//                     <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
//                     <p className="text-sm font-bold text-purple-600">₹{item.subtotal}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Totals */}
//             <div className="space-y-2 border-t pt-4">
//               <div className="flex justify-between text-gray-700">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">₹{cart.total_price}</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span>Shipping:</span>
//                 <span className="text-green-600 font-semibold">FREE</span>
//               </div>
//               <div className="flex justify-between text-xl font-bold border-t pt-3 mt-2">
//                 <span>Total:</span>
//                 <span className="text-purple-600">₹{cart.total_price}</span>
//               </div>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
//               <p className="text-xs text-blue-800 text-center">
//                 🔒 Secure Checkout<br />
//                 💳 Multiple Payment Options
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("📦 Checkout location.state:", location.state);
  
  // Handle both "Buy Now" (single product) and "Cart Checkout" (multiple items)
  const { cartItems, cart, product, fromBuyNow } = location.state || {};

  // If coming from "Buy Now", create a single-item cart structure
  const checkoutItems = fromBuyNow && product 
    ? [{
        cart_item_id: product.id,
        product_id: product.id,
        name: product.name,
        image: product.image,
        quantity: 1,
        price: product.offer_price || product.price,
        subtotal: product.offer_price || product.price
      }]
    : cartItems;

  const checkoutCart = fromBuyNow && product
    ? {
        total_price: product.offer_price || product.price,
        total_items: 1
      }
    : cart;

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order data for backend
      const orderData = {
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        phone: formData.phone,
        payment_method: formData.paymentMethod,
        // If buying single product, send product_id and quantity
        ...(fromBuyNow && product ? {
          product_id: product.id,
          quantity: 1
        } : {})
      };

      console.log("Submitting order:", orderData);

      // Send order to backend
      const response = await api.post("orders/place/", orderData);

      console.log("Order response:", response.data);

      // Show success message
      toast.success("Order placed successfully! 🎉");
      
      // Navigate to orders page
      navigate("/orders");

    } catch (error) {
      console.error("Order Error:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if no items
  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <button
          onClick={() => navigate("/cart")}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      {fromBuyNow && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            🛒 <strong>Quick Checkout:</strong> You're purchasing this item directly
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="9876543210"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="House No., Street, Locality"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Maharashtra"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Cash on Delivery (COD)</span>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">Online Payment (UPI/Card)</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order Now"}
            </button>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg sticky top-4">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {checkoutItems.map((item) => (
                <div key={item.cart_item_id || item.product_id} className="flex gap-3 pb-3 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-purple-600">₹{item.subtotal || item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{checkoutCart.total_price}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3 mt-2">
                <span>Total:</span>
                <span className="text-purple-600">₹{checkoutCart.total_price}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
              <p className="text-xs text-blue-800 text-center">
                🔒 Secure Checkout<br />
                💳 Multiple Payment Options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;