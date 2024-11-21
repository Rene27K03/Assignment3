
            const express = require('express');
            const mongoose = require('mongoose');
            const bodyParser = require('body-parser');
            const workoutRoutes = require('./routes/workouts');

            const app = express();

            // Connect to MongoDB
            mongoose.connect('your-mongo-uri', { useNewUrlParser: true, useUnifiedTopology: true });

            // Middleware
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(express.static('public'));
            app.set('view engine', 'ejs');

            // Routes
            app.use('/workouts', workoutRoutes);

            // Home page
            app.get('/', (req, res) => res.render('index'));

            // Start the server
            app.listen(3000, () => console.log('Server running on http://localhost:3000'));
        