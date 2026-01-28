import { FiShoppingCart, FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../user/Context/UserContext";
import { WishlistContext } from "../user/Context/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  Redux import
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  //  Old CartContext usage
  // const { cart } = useContext(CartContext);

  //  New Redux usage
  // const cart = useSelector((state) => state.cart.cart) || [];

  const { wishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = cart?.items || [];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // const cartCount = cart.reduce(
  //   (total, item) => total + (item.quantity || 1),
  //   0
  // );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (isActive, extraClasses = "") =>
    `font-medium transition-colors ${
      isActive ? "text-violet-500" : "text-purple-900 hover:text-yellow-500"
    } ${extraClasses}`;

  return (
    <nav className="bg-gradient-to-r from-pink-200 to-purple-400 shadow-md fixed z-10 w-full">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src="/favicon.png"
            alt="UMIKz Logo"
            className="w-10 h-10 object-contain"
          />
          <NavLink
            to="/"
            className={({ isActive }) =>
              navLinkClass(
                isActive,
                "text-2xl font-extrabold flex items-center gap-2"
              )
            }
          >
            UMIKz
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/categories"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => navLinkClass(isActive)}
          >
            About Us
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-purple-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700 hover:text-yellow-500 transition-colors"
            >
              <FiSearch className="text-lg" />
            </button>
          </form>

          {user && (
            <div className="relative">
              <NavLink
                to="/wishlist"
                className="text-purple-900 text-2xl hover:text-yellow-500 transition-colors"
              >
                <AiOutlineHeart />
              </NavLink>
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-300 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => {
                const token = localStorage.getItem("access_token");

                if (!token) {
                  toast.info("Please login to explore items with your cart!");
                  return;
                }

                navigate("/cart");
              }}
              className="text-purple-900 text-2xl hover:text-yellow-500 transition-colors"
            >
              <FiShoppingCart />
            </button>
            {user && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-300 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {!user ? (
            <div className="hidden md:flex gap-3">
              <NavLink
                to="/register"
                className="text-purple-900 font-medium hover:text-yellow-500 transition-colors"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-purple-900 font-medium hover:text-yellow-500 transition-colors"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-purple-900 font-semibold hover:text-yellow-500 transition-colors"
              >
                <FiUser className="text-xl" />
                {user.email}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 text-purple-900 hover:bg-yellow-100"
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/wishlist"
                    className="block px-4 py-2 text-purple-900 hover:bg-yellow-100"
                  >
                    Wishlist
                  </NavLink>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-purple-900 hover:bg-yellow-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl text-purple-900"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 animate-slideDown">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-8 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-700 hover:text-yellow-500"
            >
              <FiSearch className="text-lg" />
            </button>
          </form>

          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-purple-900 font-medium hover:text-yellow-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-purple-900 font-medium hover:text-yellow-500"
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-purple-900 font-medium hover:text-yellow-500"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-purple-900 font-medium hover:text-yellow-500"
          >
            About Us
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-purple-900 font-medium hover:text-yellow-500"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-purple-900 font-medium hover:text-yellow-500"
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-purple-900 font-medium hover:text-yellow-500"
              >
                Orders
              </NavLink>
              <NavLink
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-purple-900 font-medium hover:text-yellow-500"
              >
                Wishlist
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block text-purple-900 font-medium hover:text-yellow-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
