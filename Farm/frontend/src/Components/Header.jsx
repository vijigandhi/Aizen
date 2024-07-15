import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';

const Header2 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleAccount = () => setAccountOpen(!accountOpen);

  return (
    <nav className="bg-white text-gray-900 p-4 border-b-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <img src="../../src/assets/logo-crop.png" alt="Logo" className=" -m-5 w-30 h-10" />
          <select className="bg-gray-100 text-gray-900 p-3 rounded">
            <option>All categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Diary Products</option>
            {/* Add more categories here */}
          </select>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded bg-gray-100 text-gray-900 w-96"
            />
          </div>
        </div>
        <div className="relative flex space-x-4 mt-0">
         
          <select className="bg-gray-100 text-gray-900 p-3 rounded">
            <option>Address 1</option>
            <option>Address 2</option>
            <option>Address 3</option>
            <option>Address 4</option>
            {/* Add more categories here */}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center cursor-pointer">
            <FaHeart className="mr-1" />
            Favorites
          </div>
          <div className="flex items-center cursor-pointer">
            <FaShoppingCart className="mr-1" />
            My Cart
          </div>
          <div className="relative">
            <button onClick={toggleAccount} className="flex items-center">
              <FaUser className="mr-1" />
              My Account
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <a href="#" className="block px-4 py-2">Profile</a>
                <a href="#" className="block px-4 py-2">Logout</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-10 mt-4">
        <div className="nav-bottom flex space-x-4 mt-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Vegetables</a>
          <a href="#" className="hover:underline">Fruits</a>
          <a href="#" className="hover:underline">Dairy Products</a>
        </div>
       
      </div>
    </nav>
  );
};

export default Header2;
