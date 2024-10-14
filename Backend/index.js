// index.js
const express = require('express');
const cors = require('cors');
const User = require('./models/User'); // Make sure the path is correct

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Create a new user
app.post('/users', async (req, res) => {
    console.log('Received data:', req.body); 
    const { first_name, last_name, email, number } = req.body; // Use snake_case
    try {
        const newUser = await User.create({ first_name, last_name, email, number }); // Use snake_case
        console.log('User created:', newUser); 
        res.status(201).json(newUser); 
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ error: 'Error creating user' }); 
    }
});

// Get user by mobile number
app.get('/users/by-number/:number', async (req, res) => {
    const number = req.params.number;
    try {
        const user = await User.findOne({ where: { number }, logging: console.log });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
});

// Update a user by their original email
app.put('/users/update', async (req, res) => {
    const { originalEmail, email, number } = req.body; 

    try {
      const updatedUser = await User.update(
        { email, number }, 
        { where: { email: originalEmail }, returning: true } 
      );
  
      if (updatedUser[0] === 1) { 
        res.json(updatedUser[1][0]); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
});  

// Delete a user by email
app.delete('/users/delete/:email', async (req, res) => {
    const email = req.params.email;
  
    try {
      const deletedUser = await User.destroy({ where: { email } });
  
      if (deletedUser === 1) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001; // Allow environment variable for port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
