// models/workout.js
const mongoose = require('mongoose');

// Define the Workout schema
const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
});

// Create and export the Workout model
const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
