// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import the workout routes
const workoutRoutes = require('./routes/workoutRoutes');
const Workout = require('./models/workout');


// Initialize Express app
const app = express();

// Define the port to listen on, using environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Home route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Use the workout routes for any requests related to workouts
app.use('/', workoutRoutes);

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
