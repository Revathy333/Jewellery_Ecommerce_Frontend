// import { useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ProductsContext } from "../Context/ProductsContext";
// import { WishlistContext } from "../Context/WishlistContext";
// import { UserContext } from "../Context/UserContext";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { addToCart } from "../../features/cartSlice";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { products } = useContext(ProductsContext);
//   const { wishlist, addToWishlist } = useContext(WishlistContext);
//   const { user } = useContext(UserContext);

//   const cartItems = useSelector((state) => state.cart.cart?.items || []);
//   const dispatch = useDispatch();

//   const [shownToasts, setShownToasts] = useState({
//     cart: false,
//     wishlist: false,
//     buynow: false,
//     login: false,
//   });

//   const product = products.find((p) => p.id === Number(id));

//   if (!product) return <p className="text-center mt-20">Product not found</p>;

//   const isOutOfStock = !product.is_active;

//   const showToastOnce = (key, message, options = {}) => {
//     if (shownToasts[key]) return;
//     toast(message, options);
//     setShownToasts((prev) => ({ ...prev, [key]: true }));
//   };

//   const handleLoginToast = () => {
//     showToastOnce("login", "Please login to continue.", {
//       position: "top-center",
//       autoClose: 3000,
//       pauseOnHover: true,
//     });
//   };

//   // ✅ Fixed: Check against product_id, not product.id
//   const inCart = cartItems.some(
//     (item) => item.product_id === product.id
//   );

//   const handleAddToCart = async () => {
//     if (!user) return handleLoginToast();
//     if (isOutOfStock) return;

//     if (inCart) {
//       showToastOnce("cart", "Redirecting to Cart...", { autoClose: 1000 });
//       setTimeout(() => navigate("/cart"), 1200);
//     } else {
//       try {
//         await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
//         showToastOnce("cart", "Added to Cart!", { autoClose: 800 });
//       } catch (error) {
//         toast.error("Failed to add to cart");
//       }
//     }
//   };

//   const handleAddToWishlist = () => {
//     if (!user) return handleLoginToast();
//     if (wishlist.find((item) => item.id === product.id)) {
//       showToastOnce("wishlist", "Redirecting to Wishlist...", {
//         autoClose: 1000,
//       });
//       setTimeout(() => navigate("/wishlist"), 1500);
//     } else {
//       addToWishlist(product);
//       showToastOnce("wishlist", "Added to Wishlist!", { autoClose: 500 });
//       setTimeout(() => navigate("/wishlist"), 1500);
//     }
//   };

//   const handleBuyNow = () => {
//     if (!user) return handleLoginToast();
//     if (isOutOfStock) return;
//     showToastOnce("buynow", "Proceeding to Checkout...", { autoClose: 1500 });
//     setTimeout(() => navigate("/checkout", { state: { product } }), 1500);
//   };

//   const inWishlist = wishlist.some((item) => item.id === product.id);

//   return (
//     <div className="container mx-auto p-20">
//       <div className="flex flex-col md:flex-row gap-8 relative">
//         <div className="relative w-full md:w-1/3">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full rounded-lg shadow-lg"
//           />
//           {isOutOfStock && (
//             <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//               Out of Stock
//             </span>
//           )}
//         </div>

//         <div className="md:w-1/2 flex flex-col justify-between">
//           <div>
//             <h2 className="text-3xl font-bold mb-8 p-15">{product.name}</h2>
//             <p className="text-gray-700 mb-8 text-2xl">{product.description}</p>
//             <span className="text-2xl font-semibold text-yellow-600 mb-4 block">
//               ₹{product.offer_price}
//             </span>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 mt-2">
//             <button
//               onClick={handleAddToCart}
//               disabled={isOutOfStock}
//               className={`${
//                 isOutOfStock
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : inCart
//                   ? "bg-yellow-500 hover:bg-yellow-600"
//                   : "bg-yellow-500 hover:bg-yellow-600"
//               } text-white py-3 px-6 rounded-b-md transition-colors`}
//             >
//               {isOutOfStock
//                 ? "Out of Stock"
//                 : inCart
//                 ? "View Cart"
//                 : "Add to Cart"}
//             </button>

//             <button
//               onClick={handleAddToWishlist}
//               className={`${
//                 inWishlist
//                   ? "bg-purple-600 hover:bg-purple-700"
//                   : "bg-purple-600 hover:bg-purple-700"
//               } text-white py-3 px-6 rounded-b-md transition-colors`}
//             >
//               {inWishlist ? "View Wishlist" : "Add to Wishlist"}
//             </button>

//             <button
//               onClick={handleBuyNow}
//               disabled={isOutOfStock}
//               className={`${
//                 isOutOfStock
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-900 hover:bg-green-700"
//               } text-white py-3 px-6 rounded-b-md transition-colors`}
//             >
//               {isOutOfStock ? "Out of Stock" : "Buy Now"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import { WishlistContext } from "../Context/WishlistContext";
import { UserContext } from "../Context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { user } = useContext(UserContext);

  const cartItems = useSelector((state) => state.cart.cart?.items || []);
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const isOutOfStock = !product.is_active;

  // Check if product is in cart
  const inCart = cartItems.some((item) => item.product_id === product.id);

  // Check if product is in wishlist
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please login to continue.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    
    if (isOutOfStock) return;

    if (inCart) {
      toast.info("Redirecting to Cart...", { autoClose: 1000 });
      setTimeout(() => navigate("/cart"), 1000);
    } else {
      try {
        await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
        toast.success("Added to Cart!", { autoClose: 800 });
      } catch (error) {
        toast.error("Failed to add to cart");
      }
    }
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.info("Please login to continue.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    if (inWishlist) {
      toast.info("Redirecting to Wishlist...", { autoClose: 1000 });
      setTimeout(() => navigate("/wishlist"), 1000);
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist!", { autoClose: 800 });
      setTimeout(() => navigate("/wishlist"), 1000);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.info("Please login to continue.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    
    if (isOutOfStock) {
      toast.warning("This product is out of stock", { autoClose: 2000 });
      return;
    }

    toast.info("Proceeding to Checkout...", { autoClose: 1000 });
    
    // Navigate to checkout with product data
    setTimeout(() => {
      navigate("/checkout", { 
        state: { 
          product,
          fromBuyNow: true 
        } 
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto p-20">
      <div className="flex flex-col md:flex-row gap-8 relative">
        <div className="relative w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          {isOutOfStock && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Out of Stock
            </span>
          )}
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-8 p-15">{product.name}</h2>
            <p className="text-gray-700 mb-8 text-2xl">{product.description}</p>
            <span className="text-2xl font-semibold text-yellow-600 mb-4 block">
              ₹{product.offer_price}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : inCart
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white py-3 px-6 rounded-b-md transition-colors`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : inCart
                ? "View Cart"
                : "Add to Cart"}
            </button>

            <button
              onClick={handleAddToWishlist}
              className={`${
                inWishlist
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } text-white py-3 px-6 rounded-b-md transition-colors`}
            >
              {inWishlist ? "View Wishlist" : "Add to Wishlist"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-900 hover:bg-green-700"
              } text-white py-3 px-6 rounded-b-md transition-colors`}
            >
              {isOutOfStock ? "Out of Stock" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;