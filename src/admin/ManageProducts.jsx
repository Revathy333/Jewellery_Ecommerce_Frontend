import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import { ProductsContext } from "../user/Context/ProductsContext";

const ManageProducts = () => {
  const { setProducts: setContextProducts } = useContext(ProductsContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const initialValues = {
    name: "",
    description: "",
    price: "",
    offer_price: "",
    image: "",
    category: "",
    is_active: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    description: Yup.string().trim().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    offer_price: Yup.number()
      .typeError("Offer Price must be a number")
      .required("Offer Price is required"),
    image: Yup.string().trim().required("Image URL is required"),
    category: Yup.number().required("Category is required"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get("admin/products/"),
        api.get("categories/"),
      ]);

      console.log("Products data:", productsRes.data);

      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setContextProducts(productsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // const filteredProducts = activeCategory
  //   ? products.filter((p) => p.category === activeCategory)
  //   : products;

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory
      ? p.category === activeCategory
      : true;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handleAddOrEdit = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        const res = await api.put(`admin/products/${isEditing}/`, {
          ...values,
          price: Number(values.price),
          offer_price: Number(values.offer_price),
        });

        setProducts((prev) =>
          prev.map((p) => (p.id === isEditing ? res.data : p))
        );
        toast.success("Product updated successfully!");
        setIsEditing(null);
      } else {
        const res = await api.post("admin/products/", {
          ...values,
          price: Number(values.price),
          offer_price: Number(values.offer_price),
        });

        setProducts((prev) => [res.data, ...prev]);
        toast.success("Product added successfully!");
        setIsAdding(false);
      }

      resetForm();
      fetchData(); 
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await api.delete(`admin/products/${id}/`);
              setProducts((prev) => prev.filter((p) => p.id !== id));
              toast.success("Product deleted successfully!");
            } catch (error) {
              console.error("Error deleting product:", error);
              toast.error("Failed to delete product");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const toggleStock = async (productId, currentStatus) => {
    try {
      await api.put(`admin/products/${productId}/`, {
        is_active: !currentStatus,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, is_active: !currentStatus } : p
        )
      );

      toast.success("Stock status updated");
    } catch (error) {
      console.error("Stock update error:", error);
      toast.error("Failed to update stock");
    }
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Product Management
      </h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            activeCategory === null
              ? "bg-pink-600"
              : "bg-purple-800 hover:bg-purple-900"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              activeCategory === cat.id
                ? "bg-pink-700"
                : "bg-purple-800 hover:bg-purple-900"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products...."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); 
          }}
          className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
        />
      </div>

      <button
        onClick={() => setIsAdding(true)}
        className="mb-6 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow transition"
      >
        + Add New Product
      </button>

      {(isAdding || isEditing) && (
        <div className="mb-8 bg-white shadow-md p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>

          <Formik
            initialValues={
              isEditing
                ? products.find((p) => p.id === isEditing) || initialValues
                : initialValues
            }
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleAddOrEdit}
          >
            {() => (
              <Form className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <Field
                    name="name"
                    placeholder="Product Name"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    name="description"
                    placeholder="Description"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    name="offer_price"
                    type="number"
                    placeholder="Offer Price"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage
                    name="offer_price"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    name="image"
                    placeholder="Image URL"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-1">
                  <Field
                    as="select"
                    name="category"
                    className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-2 mt-2 flex items-center gap-2">
                  <Field type="checkbox" name="is_active" />
                  <label>Available in Stock</label>
                </div>

                <div className="col-span-2 mt-4 flex gap-3">
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    {isEditing ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(null);
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Image",
                "Name",
                "Price",
                "Offer Price",
                "Stock",
                "Actions",
              ].map((col) => (
                <th key={col} className="px-4 py-3 text-gray-700 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product, idx) => (
              <tr
                key={product.id}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-3">{product.id}</td>
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">₹{product.offer_price}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStock(product.id, product.is_active)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      product.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {product.is_active ? "In Stock" : "Out of Stock"}
                  </button>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(product.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
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

export default ManageProducts;
