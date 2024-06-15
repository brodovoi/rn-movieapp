// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const bookmarkRoutes = require('./routes/bookmarks'); // Импортируем маршруты для закладок

const app = express();

// Middleware
app.use(bodyParser.json());

// Предоставляем доступ к изображениям
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes); // Регистрируем маршруты для закладок

// Подключение к базе данных
mongoose
  .connect('mongodb://localhost:27017/myapp')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
