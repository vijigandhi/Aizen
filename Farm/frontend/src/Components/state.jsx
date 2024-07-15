import React, { useState, useEffect } from 'react';

function StateForm() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/state');
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch states.');
        }
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
        setMessage('Failed to fetch states.');
      }
    };

    fetchStates();
  }, []);

  const fetchCities = async (stateName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cities?state_name=${stateName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cities.');
      }
      const data = await response.json();
      if (!data || data.length === 0) {
        throw new Error('No cities found.');
      }
      setCities(data); // Update cities state with fetched data
    } catch (error) {
      console.error('Error fetching cities:', error);
      setMessage('Failed to fetch cities.');
      setCities([]); // Clear cities state or handle empty data appropriately
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedState || !selectedCity) {
      setMessage('Please select a state and a city.');
      return;
    }

    const stateData = { state_name: selectedState };
    const cityData = { state_name: selectedState, city_id: selectedCity }; 

    try {
      // Posting state data
      const stateResponse = await fetch('http://localhost:8000/api/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stateData),
      });

      if (!stateResponse.ok) {
        throw new Error('Failed to add state.');
      }

      const stateResult = await stateResponse.text();
      setMessage(`State and city added`);

    } catch (error) {
      console.error('Error adding state and city:', error);
      setMessage('Failed to add state and/or city. Please try again.');
    }
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    fetchCities(stateName);
  };

  return (
    <div>
      <h1>Add State and City</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>State Name:</label>
          <select
            name="state_name"
            value={selectedState}
            onChange={handleStateChange}
            required
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>City Name:</label>
          <select
            name="city_name"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            required
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.city_name} 
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add State and City</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default StateForm;
