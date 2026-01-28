import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // ✅ Import api instance

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // ✅ Use api instance instead of hardcoded URL
        const response = await api.get("categories/");
        
        setCategories(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <p className="text-center text-gray-600">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-black mb-8">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative cursor-pointer border rounded-lg p-6 hover:scale-105 hover:shadow-2xl text-black text-center shadow-md transition-all"
            onClick={() => handleCategoryClick(cat.id)}
          >
            <h3 className="absolute text-white top-85 left-20 text-5xl font-bold">
              {cat.name}
            </h3>
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-100 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;