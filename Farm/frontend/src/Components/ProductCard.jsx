import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import ProductDetails from './ProductDetails'; // Import the ProductDetails component

const ProductCard = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Implement additional logic here, such as saving favorite status to backend
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-72 relative">
      <div className="absolute bottom-10 right-5 m-2">
        <FaHeart
          className={`text-lg cursor-pointer ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
          onClick={toggleFavorite}
        />
      </div>
      <div className="relative w-full h-40 overflow-hidden rounded-lg mb-4">
        <img
          src={product.images[0]} // Always display the first image
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          onClick={openModal}
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={openModal}>
        {product.name}
      </h2>
      <p className="text-lg text-gray-600">${product.price.toFixed(2)}</p>

      {/* Modal for Product Details */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
            <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative">
              <ProductDetails product={product} closeModal={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
