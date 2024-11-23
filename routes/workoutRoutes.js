// Import required modules
const express = require('express');
const Workout = require('./models/workout'); // Adjust path as needed
const router = express.Router();

// Route to display the list of workouts
router.get('/workouts', async (req, res) => {
    try {
        // Fetch all workouts from the database
        const workouts = await Workout.find();
        // Render the workouts page and pass the workouts data
        res.render('workouts', { workouts });
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).send('Error fetching workouts');
    }
});

// Route to handle adding a new workout
router.post('/workouts', async (req, res) => {
    const { name, sets, reps } = req.body;
    try {
        // Create a new workout in the database
        await Workout.create({ name, sets, reps });
        // Redirect to the workouts page
        res.redirect('/workouts');
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).send('Error creating workout');
    }
});

// Route to handle deleting a workout
router.post('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Find and delete the workout by its ID
        await Workout.findByIdAndDelete(id);
        // Redirect to the workouts page
        res.redirect('/workouts');
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).send('Error deleting workout');
    }
});

module.exports = router;
