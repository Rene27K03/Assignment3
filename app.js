// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express'); // Web framework for routing and handling requests
const mongoose = require('mongoose'); // MongoDB object modeling
const path = require('path'); // Module for working with file and directory paths

// Initialize Express app
const app = express();

// Define the port to listen on, using environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware setup
// Middleware to parse URL-encoded data (from forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
// Set EJS as the view engine for rendering HTML pages
app.set('view engine', 'ejs');

// Database connection
// Connect to MongoDB using the URI stored in environment variables
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully')) // On successful connection
  .catch(err => console.error('MongoDB connection error:', err)); // On error

// Define the Workout schema and model
// Schema definition for a workout with name, sets, and reps
const workoutSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number
});

// Create a model for the Workout schema
const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

// Routes
// Home route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Import routes for workouts
const workoutsRouter = require('./routes/workouts'); // New line added to import workouts router
app.use('/workouts', workoutsRouter); // New line added to use the workouts router

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
