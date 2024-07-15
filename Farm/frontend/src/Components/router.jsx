// Router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import StateForm from './state';
import CategoryForm from './category';
import TailwindCSS from './tailwind';
import Cart from './cart';
import ProductDetail from './productDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/category" element={<CategoryForm/>} />
        <Route path="/state" element={<StateForm />} />
        <Route path="/tailwindCSS" element={<TailwindCSS />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/ProductDetail" element={<ProductDetail />} />

      </Routes>
    </Router>
  );
};

export default RouterComponent;