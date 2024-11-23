
require('dotenv').config();

// Import required modules
const express = require('express'); // Web framework for routing and handling requests
const mongoose = require('mongoose'); // MongoDB object modeling
const path = require('path'); // Module for working with file and directory paths

// Initialize Express app
const app = express();
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
const Workout = mongoose.model('Workout', workoutSchema);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Route to display the list of workouts
app.get('/workouts', async (req, res) => {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    // Render the workouts page and pass the workouts data
    res.render('workouts', { workouts });
});

// Route to handle adding a new workout
app.post('/workouts', async (req, res) => {
    const { name, sets, reps } = req.body;
    // Create a new workout in the database
    await Workout.create({ name, sets, reps });
    // Redirect to the workouts page
    res.redirect('/workouts');
});

// Route to handle deleting a workout
app.post('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    // Find and delete the workout by its ID
    await Workout.findByIdAndDelete(id);
    // Redirect to the workouts page
    res.redirect('/workouts');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
