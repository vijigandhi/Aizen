import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const RegisterForm = () => {
  const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    id_proof: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showIdProofInput, setShowIdProofInput] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'id_proof') {
      setFormData({ ...formData, id_proof: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (e) => {
    setShowIdProofInput(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, id_proof: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.first_name.trim()) {
      validationErrors.first_name = 'First Name is required';
    }
    if (!formData.last_name.trim()) {
      validationErrors.last_name = 'Last Name is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    }
    if (showIdProofInput && !formData.id_proof) {
      validationErrors.id_proof = 'Please upload an ID proof';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTimeout(() => {
        setErrors({});
      }, 5000); // Timeout set to 5 seconds
      return;
    }

    try {
      const formDataForApi = new FormData();
      formDataForApi.append('first_name', formData.first_name);
      formDataForApi.append('last_name', formData.last_name);
      formDataForApi.append('email', formData.email);
      formDataForApi.append('password', formData.password);
      if (showIdProofInput && formData.id_proof) {
        formDataForApi.append('id_proof', formData.id_proof);
      }

      const response = await axios.post('http://localhost/AIZEN/Backend/Registerapi.php', formDataForApi);
      console.log('Registration successful:', response.data);

      // Reset form fields, errors, and additional states after successful registration
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
      setErrors({});
      setShowIdProofInput(false);
      
      // Show alert for successful registration
      alert('Registration successful');
      navigate('/login');

    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error display
    }
  };

  return (
    <div className="mx-auto max-w-screen-md bg-white p-8 mt-10 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
          />
          {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
          />
          {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show_id_proof"
              name="show_id_proof"
              checked={showIdProofInput}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="show_id_proof" className="text-sm font-medium text-gray-700">
              Provide ID Proof
            </label>
          </div>
          {showIdProofInput && (
            <div className="mt-2">
              <label htmlFor="id_proof" className="block text-sm font-medium text-gray-700 mb-2">
                ID Proof (Upload Image)
              </label>
              <input
                type="file"
                id="id_proof"
                name="id_proof"
                onChange={handleChange}
                accept="image/*" // Specify accepted file types
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
              />
              {errors.id_proof && <p className="text-red-500 text-sm mt-1">{errors.id_proof}</p>}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
