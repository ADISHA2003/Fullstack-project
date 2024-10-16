import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FindUserByNumber from './Find';
import UpdateUser from './update';
import DeleteUser from './Delete';

const BACKEND_URL = 'https://fullstack-project-kappa-ten.vercel.app/';

function App() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { first_name: firstName, last_name: lastName, email, number };
    axios.post(`${BACKEND_URL}/users`, newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setFirstName('');
        setLastName('');
        setEmail('');
        setNumber('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management</h1>
      </header>
      <div className="grid-container">
        <div className="grid-item">
          <h2>Add User</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile No."
              value={number}
              onChange={e => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setNumber(value);
                }
              }}
              required
            />
            <button type="submit">Add User</button>
          </form>
        </div>
        <div className="grid-item">
          <FindUserByNumber />
        </div>
        <div className="grid-item">
          <UpdateUser />
        </div>
        <div className="grid-item">
          <DeleteUser />
        </div>
      </div>
    </div>
  );
}

export default App;
