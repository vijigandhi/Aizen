import React, { useState, useEffect } from 'react';

const StoreForm = () => {
  const [storeName, setStoreName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLine3, setAddressLine3] = useState('');
  const [pincode, setPincode] = useState('');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('http://localhost:8000/getCities.php');
      const data = await response.json();
      setCities(data);
    };

    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch city details to get state_id and country_id
      const cityResponse = await fetch(`http://localhost:8000/getCityDetails.php?city_id=${cityId}`);
      const cityData = await cityResponse.json();
      console.log('City Details:', cityData);

      if (!cityData.state_id || !cityData.country_id) {
        alert('Failed to fetch city details');
        return;
      }

      const { state_id, country_id } = cityData;

      // Make the request to add the store
      const response = await fetch('http://localhost:8000/addStore.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: storeName,
          address_line1: addressLine1,
          address_line2: addressLine2,
          address_line3: addressLine3,
          pincode: pincode,
          city_id: cityId,
          state_id,
          country_id,
        }),
      });

      const text = await response.text();
      console.log('Raw response:', text);
      const result = JSON.parse(text);

      if (result.success) {
        alert('Store added successfully!');
        setStoreName('');
        setAddressLine1('');
        setAddressLine2('');
        setAddressLine3('');
        setPincode('');
        setCityId('');
      } else {
        alert('Failed to add store: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Add New Store</h2>
      <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storeName">
          Store Name
        </label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine1">
          Address Line 1
        </label>
        <input
          type="text"
          id="addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine2">
          Address Line 2
        </label>
        <input
          type="text"
          id="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressLine3">
          Address Line 3
        </label>
        <input
          type="text"
          id="addressLine3"
          value={addressLine3}
          onChange={(e) => setAddressLine3(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
          Pincode
        </label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city_id">
          Select City
        </label>
        <select
          id="city_id"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select a city</option>
          {Array.isArray(cities) && cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit" id='form-btn'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Store
        </button>
      </div>
    </form>
    </>
    
  );
};

export default StoreForm;
