const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Создаем Express приложение
const app = express();

// Используем middleware для парсинга JSON данных в запросах
app.use(bodyParser.json());

// Подключаемся к базе данных MongoDB
mongoose.connect('mongodb://localhost/users_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Подключение к MongoDB успешно'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Определяем схему для модели пользователя
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Создаем модель пользователя на основе схемы
const User = mongoose.model('User', userSchema);

// Маршрут для создания нового пользователя (POST /users)
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при создании пользователя' });
  }
});

// Маршрут для получения всех пользователей (GET /users)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
});

// Маршрут для обновления пользователя (PUT /users/:id)
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
  }
});

// Маршрут для удаления пользователя (DELETE /users/:id)
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ message: 'Пользователь успешно удален' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при удалении пользователя' });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});