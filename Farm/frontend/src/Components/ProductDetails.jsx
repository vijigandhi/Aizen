import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../Products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id, 10));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto relative">
        <div className="absolute top-4 right-4">
          <button onClick={handleClose} className="text-gray-600 hover:text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:flex-1 pr-0 md:pr-8 mb-4 md:mb-0">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <button
               onClick={handlePreviousImage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
              aria-label="Previous Image"
            >
              &lt;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300"
              aria-label="Next Image"
            >
              &gt;
            </button>
          </div>
          <div className="md:flex-1 pl-0 md:pl-8">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <p className="text-2xl text-gray-800 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-lg text-gray-700 mb-6">{product.description}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-6 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
