
                const mongoose = require('mongoose');
                const workoutSchema = new mongoose.Schema({
                    name: String,
                    duration: Number,
                    type: String
                });
                module.exports = mongoose.model('Workout', workoutSchema);
            