// src/Delete.js
import React, { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
  const [email, setEmail] = useState('');
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeleteMessage(null);
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:3001/users/delete/${email}`);

      if (response.status === 200) {
        setDeleteMessage('User deleted successfully!');
        setEmail('');
      } else {
        setError('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('An error occurred while deleting the user.');
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete User</button>
      </form>

      {deleteMessage && (
        <p style={{ color: 'green' }}>{deleteMessage}</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DeleteUser;
