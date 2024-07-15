// Cart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartItem = ({ product }) => {
  return (
    <div className="justify-between mb-4 rounded-lg bg-white p-4 shadow-md sm:flex sm:justify-start">
      <img src={product.image} alt="product" className="w-20 h-20 rounded-lg sm:w-24 sm:h-24" />
      <div className="sm:ml-2 sm:flex sm:w-full sm:justify-between">
        <div className="mt-2 sm:mt-0">
          <h2 className="text-md font-bold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{product.size}</p>
        </div>
        <div className="mt-2 flex justify-between sm:space-y-4 sm:mt-0 sm:block sm:space-x-4">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-2 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
            <input className="h-6 w-6 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} min="1" />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-2 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm">{product.price} ₭</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 cursor-pointer duration-150 hover:text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/controller/cart.php');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error fetching the cart items!', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10 flex flex-col">
      <h1 className="mb-8 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto w-full max-w-5xl flex-grow px-4 md:flex md:space-x-4 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>
        <div className="mt-4 h-full rounded-lg border bg-white p-4 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${calculateSubtotal()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${(parseFloat(calculateSubtotal()) + 4.99).toFixed(2)} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
