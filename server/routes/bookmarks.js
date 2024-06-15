// server/routes/bookmarks.js

const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const auth = require('../middleware/auth');

// Получение всех закладок пользователя
router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id });
    res.json(bookmarks);
  } catch (error) {
    console.error('Ошибка при получении закладок:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление новой закладки
router.post('/', auth, async (req, res) => {
  const {
    _id,
    title,
    poster_path,
    vote_average,
    overview,
    duration,
    original_title,
  } = req.body;

  try {
    const newBookmark = new Bookmark({
      _id,
      title,
      poster_path,
      vote_average,
      overview,
      duration,
      original_title,
      user: req.user.id,
    });

    const bookmark = await newBookmark.save();
    res.json(bookmark);
  } catch (error) {
    console.error('Ошибка при добавлении закладки:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление закладки по ID
router.delete('/', auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ msg: 'Закладка не найдена' });
    }

    if (bookmark.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Не авторизован' });
    }

    await bookmark.remove();
    res.json({ msg: 'Закладка удалена' });
  } catch (error) {
    console.error('Ошибка при удалении закладки:', error.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
