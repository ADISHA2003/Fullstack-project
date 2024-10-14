// src/FindUserByNumber.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FindUserByNumber() {
  const [number, setNumber] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.get(`http://localhost:3001/users/by-number/${number}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('User not found or an error occurred.');
    }
  };

  return (
    <div>
      <h2>Find User by Mobile Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={number}
          onChange={(e) => {
            const inputValue = e.target.value.slice(0, 10);
            setNumber(inputValue.replace(/[^0-9]/g, ''));
          }}
          required
        />
        <button type="submit">Find User</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h3>User Details:</h3>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile Number: {user.number}</p>
        </div>
      )}
    </div>
  );
}

export default FindUserByNumber;
