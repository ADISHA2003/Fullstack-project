// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { first_name: firstname, last_name: lastname, email, number };
    axios.post('http://localhost:3001/users', newUser)
        .then(response => {
        setUsers([...users, response.data]); // Update users list
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setNumber('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname} // Updated to use lowercase
          onChange={e => setFirstName(e.target.value)} // Updated to use lowercase
          required // Make it required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname} // Updated to use lowercase
          onChange={e => setLastName(e.target.value)} // Updated to use lowercase
          required // Make it required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required // Make it required
        />
        <input
          type="text" // Change type to text to allow maxLength
          placeholder="Mobile No."
          value={number}
          onChange={e => {
          const value = e.target.value;
          // Check if the input is a number and has a maximum length of 10
          if (/^\d{0,10}$/.test(value)) {
          setNumber(value);
            }
          }}
          required // Make it required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
