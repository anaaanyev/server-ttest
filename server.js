const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

// Замените на свой токен
const token = '7516135527:AAGa-7vUHUSTBvRmuK3JqL2qm_-Mevcni98';
let bot;

function connectBot() {
  bot = new TelegramBot(token, {polling: true});

  bot.on('polling_error', (error) => {
    console.log('Polling error:', error);
    if (error.code === 'ETELEGRAM') {
      console.log('Reconnecting bot...');
      bot.stopPolling();
      setTimeout(connectBot, 10000);
    }
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть панель мониторинга.', {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "Открыть панель мониторинга",
            web_app: {url: 'https://server-ttest.onrender.com'}
          }
        ]]
      }
    });
  });
}

connectBot();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let latestData = {
  temperature: 0,
  humidity: 0,
  vpd: 0
};

app.post('/update-data', (req, res) => {
  console.log('Received data:', req.body);
  latestData = req.body;
  res.send('Data updated');
});

app.get('/get-data', (req, res) => {
  res.json(latestData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
