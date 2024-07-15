// Router.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import RegisterForm from './Register';
import LoginForm from './Loginform';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};


export default RouterComponent;
