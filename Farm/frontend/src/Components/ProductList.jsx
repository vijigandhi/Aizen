import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import products from '../Products';

const ProductList = () => {
  const navigate = useNavigate();

  const onViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={() => onViewDetails(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
