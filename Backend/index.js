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

// // Get all users
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.findAll(); 
//         res.json(users); 
//     } catch (error) {
//         console.error('Error fetching users:', error); 
//         res.status(500).json({ error: 'Error fetching users' }); 
//     }
// });

// Start the server
const PORT = process.env.PORT || 3001; // Allow environment variable for port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
