// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={onViewDetails}>
      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
