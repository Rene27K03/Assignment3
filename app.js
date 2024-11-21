
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Workout schema and model
const workoutSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number
});

const Workout = mongoose.model('Workout', workoutSchema);

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/workouts', async (req, res) => {
    const workouts = await Workout.find();
    res.render('workouts', { workouts });
});

app.post('/workouts', async (req, res) => {
    const { name, sets, reps } = req.body;
    await Workout.create({ name, sets, reps });
    res.redirect('/workouts');
});

app.post('/workouts/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    res.redirect('/workouts');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
