import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import products from '../Products';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onViewDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
        ))}
      </div>
      {selectedProduct && <ProductDetails product={selectedProduct} />}
    </div>
  );
};

export default ProductList;
