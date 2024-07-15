import React, { useState } from 'react';

const ProductDetails = ({ product, closeModal }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    } else {
      console.log('Maximum quantity reached');
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClickOnImage = () => {
    if (currentImageIndex === 0) {
      handlePreviousImage();
    } else {
      increaseQuantity();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-end">
        <button onClick={closeModal} className="text-gray-600">
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
            className="w-full cursor-pointer rounded-lg shadow-md"
            onClick={handleClickOnImage}
          />
          {product.images.length > 1 && (
            <div className="flex justify-between mt-2">
              <button onClick={handlePreviousImage} className="text-gray-600">
                &#8249; Previous
              </button>
              <button onClick={handleNextImage} className="text-gray-600">
                Next &#8250;
              </button>
            </div>
          )}
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-800 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 rounded-l">
              -
            </button>
            <input type="text" className="w-10 text-center bg-gray-100" value={quantity} readOnly />
            <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 rounded-r">
              +
            </button>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
