// Import required modules
const express = require('express');
const Workout = require('../models/workout'); // Adjust path as needed
const router = express.Router();

// Route to display the list of workouts
router.get('/workouts', async (req, res) => {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    // Render the workouts page and pass the workouts data
    res.render('workouts', { workouts });
});

// Route to handle adding a new workout
router.post('/workouts', async (req, res) => {
    const { name, sets, reps } = req.body;
    // Create a new workout in the database
    await Workout.create({ name, sets, reps });
    // Redirect to the workouts page
    res.redirect('/workouts');
});

// Route to handle deleting a workout
router.post('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    // Find and delete the workout by its ID
    await Workout.findByIdAndDelete(id);
    // Redirect to the workouts page
    res.redirect('/workouts');
});

module.exports = router;
