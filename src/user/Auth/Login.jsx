import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";
import { fetchCart } from "../../features/cartSlice";

import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    // email: Yup.string().email("Invalid email").required("Email is required"),
    email: Yup.string().required("Email/Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.post("accounts/login/", {
        username: values.email,
        password: values.password,
      });

      console.log("✅ Login Response:", response.data);

      const { access, refresh } = response.data;

      // ✅ Save tokens to localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // // ✅ Create user object and save it
      // const userData = {
      //   id: response.data.user_id || response.data.id,
      //   email: values.email,
      //   role: response.data.role || response.data.user_role || "user", // Get role from backend
      //   // Add any other user fields your backend returns
      // };

      // localStorage.setItem("user", JSON.stringify(userData));

      // // ✅ Update UserContext
      // login(userData);

      // // ✅ Check if user is admin
      // if (userData.role === "admin") {
      //   toast.success("Admin login successful 🎉");
      //   setTimeout(() => {
      //     navigate("/admin");
      //   }, 100);
      //   resetForm();
      //   setSubmitting(false);
      //   return;
      // }

      // ✅ Create user object EXACTLY as backend sends
      const userData = {
        id: response.data.user_id,
        email: response.data.email,
        username: response.data.username,
        role: response.data.role, // "admin" or "user"
        name: response.data.name,
      };

      // Save user
      localStorage.setItem("user", JSON.stringify(userData));

      // Update UserContext
      login(userData);

      // ✅ Admin redirect — ONLY HERE
      if (userData.role === "admin") {
        toast.success("Admin login successful 🎉");
        navigate("/admin", { replace: true });
        resetForm();
        setSubmitting(false);
        return;
      }

      // ✅ For regular users, fetch cart data
      try {
        await dispatch(fetchCart()).unwrap();
        console.log("✅ Cart fetched successfully");
      } catch (cartError) {
        console.error("⚠️ Failed to fetch cart:", cartError);
        // Don't block login if cart fetch fails
      }

      toast.success("Login successful 🎉");

      // ✅ Small delay to ensure everything is saved
      setTimeout(() => {
        navigate("/");
      }, 100);

      resetForm();
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data);

      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid credentials";

      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://cdn.caratlane.com/media/catalog/product/U/R/UR01947-1Y0000_3_lar.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white tracking-wide">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-200 mt-2">
            Login to continue your journey ✨
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 bg-white/20 border border-white/40 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 pr-12 bg-white/20 border border-white/40 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-300 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-6 text-gray-200">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-pink-300 font-medium hover:underline"
          >
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
