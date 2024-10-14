// Frontend/src/update.js
import React, { useState } from 'react';
import axios from 'axios';

function UpdateUser() {
  const [originalEmail, setOriginalEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage(null);
    setError(null);

    try {
      const response = await axios.put(`http://localhost:3001/users/update`, {
        originalEmail,
        email: newEmail, // Sending updated email as 'email'
        number: newNumber,
      });

      if (response.status === 200) {
        setUpdateMessage('User updated successfully!');
        setOriginalEmail('');
        setNewEmail('');
        setNewNumber('');
      } else {
        setError('Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('An error occurred while updating the user.');
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="originalEmail">Original Email:</label>
          <input
            type="email"
            id="originalEmail"
            value={originalEmail}
            onChange={(e) => setOriginalEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newEmail">New Email:</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newNumber">New Phone Number:</label>
          <input
           type="text"
           id="newNumber"
           value={newNumber}
           onChange={(e) => {
            const inputValue = e.target.value.slice(0, 10); // Take only first 10 digits
            setNewNumber(inputValue.replace(/[^0-9]/g, '')); // Allow only numbers
           }}
           />
        </div>
        <button type="submit">Update User</button> 
      </form>

      {updateMessage && (
        <p style={{ color: 'green' }}>{updateMessage}</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UpdateUser;
