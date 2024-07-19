import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../Products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === parseInt(id, 10));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
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
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-end">
          <button onClick={handleClose} className="text-gray-600">
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
        <div className="flex mt-4">
          <div className="w-1/2 pr-8">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
            <div className="flex justify-between mt-2">
              <button onClick={handlePreviousImage} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                Previous
              </button>
              <button onClick={handleNextImage} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
                Next
              </button>
            </div>
          </div>
          <div className="w-1/2 pl-8">
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-800 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
