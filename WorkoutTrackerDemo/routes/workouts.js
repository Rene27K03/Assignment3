
                const express = require('express');
                const router = express.Router();
                const Workout = require('../models/workout');

                // List all workouts
                router.get('/', async (req, res) => {
                    const workouts = await Workout.find();
                    res.render('workouts', { workouts });
                });

                // Add new workout
                router.post('/add', async (req, res) => {
                    const { name, duration, type } = req.body;
                    await Workout.create({ name, duration, type });
                    res.redirect('/workouts');
                });

                // Delete workout
                router.post('/delete/:id', async (req, res) => {
                    await Workout.findByIdAndDelete(req.params.id);
                    res.redirect('/workouts');
                });

                // Edit workout (to be implemented)
                router.get('/edit/:id', async (req, res) => {
                    // Render edit form here
                });

                module.exports = router;
            