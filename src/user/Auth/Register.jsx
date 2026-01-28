import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import api from "../../api/axios";

import { useNavigate } from "react-router-dom";


function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .matches(/^[A-Za-z\s\.]+$/, "Name can only contain English letters, spaces, and dots")
      .required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .trim()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Za-z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    await api.post("accounts/register/", {
  username: values.email,
  email: values.email,
  password: values.password,
});

    setMessage("✅ Registration successful! Please login 💍");
    resetForm();

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } catch (error) {
    console.error("Register error:", error);
    setMessage("⚠ Registration failed. User may already exist.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border-2 border-purple-200">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">💎✨</div>
          <h2 className="text-3xl font-extrabold text-purple-700">Create Your Jewellery Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join SparkleBox and shine bright with exclusive jewellery ✨
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-purple-100 text-purple-800 rounded-lg text-center font-medium">
            {message}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-600 transition-colors"
              >
                {isSubmitting ? "Registering..." : "💍 Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
