import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductsContext } from "../Context/ProductsContext";
import { WishlistContext } from "../Context/WishlistContext";
import { UserContext } from "../Context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, fetchCart } from "../../features/cartSlice";

const Products = () => {
  const { products, categories, loading } = useContext(ProductsContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(UserContext); // ✅ Define user FIRST

  const cart = useSelector((state) => state.cart.cart);
  const cartItems = cart?.items || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const categoryIdFromURL = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryIdFromURL || null
  );
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Fetch cart when user logs in
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    
    if (user && accessToken) {
      dispatch(fetchCart()).catch((err) => {
        console.error("Failed to fetch cart:", err);
      });
    }
  }, [user, dispatch]);

  // ✅ Update category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryIdFromURL || null);
    setCurrentPage(1);
  }, [categoryIdFromURL]);

  // ✅ Helper function to check if product is in cart
  const isInCart = (productId) =>
    cartItems.some((item) => item.product_id === productId);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  // Filter and sort products
  let filteredProducts = products
    .filter((p) => p.is_active)
    .filter((p) =>
      selectedCategory ? p.category?.id == selectedCategory : true
    )
    .filter((p) =>
      searchQuery
        ? p.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  if (sortOrder === "low")
    filteredProducts.sort((a, b) => a.offer_price - b.offer_price);
  else if (sortOrder === "high")
    filteredProducts.sort((a, b) => b.offer_price - a.offer_price);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const categoryName =
    categories.find((cat) => cat.id == selectedCategory)?.name || "";

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {searchQuery
          ? `Results for "${searchQuery}"`
          : categoryName || "All Products"}
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => {
            setSelectedCategory(null);
            navigate("/products");
          }}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === null
              ? "bg-purple-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              navigate(`/products?category=${cat.id}`);
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat.id
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {currentProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => {
            const inCart = isInCart(product.id);
            const isOutOfStock = !product.is_active;

            return (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white hover:bg-yellow-50 relative cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-65 object-cover"
                  />
                  {isOutOfStock && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-yellow-600">
                      ₹{product.offer_price}
                    </span>
                    {product.offer_price > 0 && (
                      <span className="text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!user) {
                          toast.info("Please login to use Wishlist", {
                            autoClose: 1500,
                          });
                          return;
                        }

                        const alreadyInWishlist = isInWishlist(product.id);
                        toggleWishlist(product);

                        toast.success(
                          alreadyInWishlist
                            ? "Removed from Wishlist"
                            : "Added to Wishlist",
                          { autoClose: 1500 }
                        );
                      }}
                      className={`p-2 rounded-full shadow transition ${
                        isInWishlist(product.id) ? "bg-pink-500" : "bg-white"
                      }`}
                    >
                      {isInWishlist(product.id) ? (
                        <AiFillHeart className="w-5 h-5 text-white" />
                      ) : (
                        <AiOutlineHeart className="w-5 h-5 text-pink-500" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (!user) {
                        toast.info("Please login to add to cart");
                        return;
                      }

                      if (isOutOfStock) {
                        toast.error("Out of stock");
                        return;
                      }

                      if (inCart) {
                        navigate("/cart");
                        return;
                      }

                      try {
                        await dispatch(
                          addToCart({ productId: product.id, quantity: 1 })
                        ).unwrap();

                        toast.success("Added to Cart");
                      } catch (err) {
                        toast.error("Failed to add to cart");
                      }
                    }}
                    className={`mt-3 w-full py-2 rounded text-white font-semibold transition ${
                      isOutOfStock
                        ? "bg-gray-400 cursor-not-allowed"
                        : inCart
                        ? "bg-purple-500 hover:bg-purple-700"
                        : "bg-pink-500 hover:bg-pink-700"
                    }`}
                    disabled={isOutOfStock}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : inCart
                      ? "View Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;