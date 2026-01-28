import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg mb-8">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`carousel-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const bestsellers = products.slice(0, 6);

  const carouselImages = [
    "https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/Banner/DT_Offer/HSBC/01/DesktopR.jpg",
    "https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/APPLP/Digigold/01/Desktop_1760x630.jpg",
    "https://cdn.caratlane.com/media/static/images/V4/2025/Shaya/09-September/Responsive/22/Responsive%20%28desktop%29.jpg",
  ];

  return (
    <div className="container mx-auto px-4 py-6">

      <Carousel images={carouselImages} />

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/products?category=${cat.id}`)}
            className="px-4 py-2 bg-purple-200 hover:bg-purple-400 text-purple-900 font-semibold rounded-lg transition"
          >
            {cat.name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Our Bestsellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {bestsellers.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-55 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-pink-500">₹{product.offer_price}</span>
                {product.price > 0 && (
                  <span className="text-gray-400 line-through">₹{product.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
  <div className="relative h-86 md:h-96 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
    <img
      src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/Banner/TreasureChest/01/Square_Desktop.jpg"
      alt="Left Collection"
      className="w-full h-full object-cover"
    />
   
  </div>

  <div className="grid grid-rows-2 gap-4">
    <div className="relative h-44 md:h-46 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      <img
        src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/Banner/Goldedit/02/UB_Desktop.jpg"
        alt="Top Right Collection"
        className="w-full h-full object-cover"
      />
     
    </div>

    <div className="relative h-44 md:h-46 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      <img
        src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/Banner/DT_Curation/01/UB_Desktop.jpg"
        alt="Bottom Right Collection"
        className="w-full h-full object-cover"
      />
     
    </div>
  </div>
</div>


      <div className="w-full mt-10 mb-10 bg-fuchsia-300 rounded-lg overflow-hidden">
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/1062092424?autoplay=1&muted=1&loop=1&background=1"
          width="100%"
          height="500"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="w-full h-[500px] rounded-lg"
        ></iframe>
      </div>

      <h2 className="text-2xl font-bold mb-6">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700 italic">"Beautiful jewellery and fast delivery!"</p>
          <p className="mt-2 font-semibold">- Sarah K.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700 italic">"Excellent craftsmanship and quality."</p>
          <p className="mt-2 font-semibold">- Raj P.</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-700 italic">"Love the design and service!"</p>
          <p className="mt-2 font-semibold">- Ananya M.</p>
        </div>
      </div>

      <div className="bg-purple-100 p-8 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-4">Get updates on latest products and offers</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
          />
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
