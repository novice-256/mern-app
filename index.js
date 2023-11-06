const express = require('express');
const path = require('path');
const routes = require('./Routes/router.js');
const connection = require('./Database/connection.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors({ credentials: true, origin: 'https://emp-app-ca789b749d5f.herokuapp.com' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public/Images" directory
app.use(express.static(path.resolve('public'));

connection();

// Define your routes
app.use('/api', routes);

// We need to tell Heroku to serve the static files of the client.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('sample_app/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'sample_app', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('Server running at PORT: ' + PORT));
