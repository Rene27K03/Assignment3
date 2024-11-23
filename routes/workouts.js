
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Workout schema and model
const workoutSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number
});
const Workout = mongoose.model('Workout', workoutSchema);

// Route to display the list of workouts
router.get('/', async (req, res) => {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
});

// Route to handle adding a new workout
router.post('/', async (req, res) => {
    const { name, sets, reps } = req.body;
    await Workout.create({ name, sets, reps });
    res.redirect('/workouts');
});

// Route to handle deleting a workout
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.redirect('/workouts');
});

module.exports = router;
