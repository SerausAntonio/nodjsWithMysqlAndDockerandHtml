const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static frontend
app.use(express.static(path.join(__dirname, 'public')));

// routes
const klantRoutes = require('./routes/klantRoutes');
app.use('/api', klantRoutes);

app.listen(3000, () => {
    console.log('Server draait op http://localhost:3000');
});