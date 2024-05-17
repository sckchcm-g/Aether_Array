// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const userRoutes = require('./routes/userroutes');
// const postRoutes = require('./routes/postroutes');
const dotenv = require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors()); 


const crypto = require('crypto'); 
const generateSecretKey = () => {
  return crypto.randomBytes(6).toString('hex');
};
const secretKey = generateSecretKey();

// Middleware setup
app.use(express.json()); 
app.use(cookieParser()); 
app.use(
  session({
    secret: process.env.SECRET || secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define routes
// app.use('/api', userRoutes); 
// app.use('/api', postRoutes); 

// Start the server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
