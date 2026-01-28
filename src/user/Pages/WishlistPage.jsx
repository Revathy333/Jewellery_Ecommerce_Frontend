import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/product/${id}`); 
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6"> Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-pink-800 mt-4 text-5xl">Your wishlist is empty.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleNavigate(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      removeFromWishlist(item.id);
                    }}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                  >
                    <AiOutlineHeart className="text-red-500 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={clearWishlist}
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
