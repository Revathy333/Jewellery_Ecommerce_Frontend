import { Route, Routes, Outlet } from "react-router-dom";
import Register from "./user/Auth/Register";
import Login from "./user/Auth/Login";
import Navbar from "./components/Navbar";
import Home from "./user/Pages/Homepage";
import { UserProvider } from "./user/Context/UserContext";
import Footer from "./components/Footer";
import Products from "./user/Pages/Products";
import Categories from "./user/Pages/Categories";
import { ProductsProvider } from "./user/Context/ProductsContext";
import ProductDetails from "./user/Pages/ProductDetails";
import { WishlistProvider } from "./user/Context/WishlistContext";
import { OrdersProvider } from "./user/Context/OrdersContext";
import CartPage from "./user/Pages/CartPage";
import WishlistPage from "./user/Pages/WishlistPage";
import OrdersPage from "./user/Pages/OrdersPage";
import CheckoutPage from "./user/Pages/CheckoutPage";
import About from "./user/Pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRouter/ProtectedRoute";
import PublicRoute from "./ProtectedRouter/PublicRoute";
import AdminDashboard from "./admin/AdminDashBoard";
import AdminHome from "./admin/AdminHome";
import ProductAccess from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import ManageOrders from "./admin/ManageOrders";
import AdminSettings from "./admin/AdminSettings";
// import AdminOnlyRedirect from "./admin/AdminOnlyRedirect";

function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <OrdersProvider>
          <WishlistProvider>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="products" element={<ProductAccess />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route
                element={
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      <Outlet />
                    </main>
                    <Footer />
                  </div>
                }
              >
                {/* <Route
                  path="/"
                  element={
                    <AdminOnlyRedirect>
                      <Home />
                    </AdminOnlyRedirect>
                  }
                /> */}
                <Route path="/" element={<Home />} />

                {/* <Route
                  path="/products"
                  element={
                    <AdminOnlyRedirect>
                      <Products />
                    </AdminOnlyRedirect>
                  }
                /> */}
                <Route path="/products" element={<Products />} />

                {/* <Route
                  path="/product/:id"
                  element={
                    <AdminOnlyRedirect>
                      <ProductDetails />
                    </AdminOnlyRedirect>
                  }
                /> */}
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* <Route
                  path="/categories"
                  element={
                    <AdminOnlyRedirect>
                      <Categories />
                    </AdminOnlyRedirect>
                  }
                /> */}
                <Route path="/categories" element={<Categories />} />
                {/* <Route
                  path="/about"
                  element={
                    <AdminOnlyRedirect>
                      <About />
                    </AdminOnlyRedirect>
                  }
                /> */}
                <Route path="/about" element={<About />} />

                {/* Protected user routes - just need to be logged in */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
          </WishlistProvider>
        </OrdersProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;