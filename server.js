const express = require('express');
const app = express();

// Middleware для обработки JSON-запросов
app.use(express.json());

// Маршрут для получения POST-запросов
app.post('/api/data', (req, res) => {
  const { humidity, temperature } = req.body;
  console.log(`Влажность: ${humidity}, Температура: ${temperature}`);
  res.json({ message: 'Данные успешно получены!' });
});

// Запуск сервера на порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
