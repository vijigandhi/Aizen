// RouterComponent.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import RegisterForm from './Register';
// import LoginForm from './Loginform';
import ProductDetailPage from './ProductDetails'; // Import the ProductDetailPage component

const RouterComponent = () => {
  return (
    <Routes>
      {/* <Route path="/register" element={<RegisterForm />} /> */}
      {/* <Route path="/login" element={<LoginForm />} /> */}
      <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Add the route for product details */}
    </Routes>
  );
};

export default RouterComponent;
