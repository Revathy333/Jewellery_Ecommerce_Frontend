import { createContext, useState, useEffect } from "react";
import axios from "axios";
// import api from "../../api/axios";


export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          // // axios.get("http://localhost:5000/products"),
          axios.get("http://127.0.0.1:8000/api/products/"),

          axios.get("http://127.0.0.1:8000/api/categories/"),
          // api.get("products/"),
          // api.get("categories/"),
        ]);

        setProducts(prodRes.data);
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products or categories:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        categories,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
