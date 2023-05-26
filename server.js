const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);

// * Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// * Serve the notes.html file at the /notes URL
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// * Start the server and listen on the specified por
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
