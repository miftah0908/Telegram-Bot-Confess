Berikut contoh code untuk readme.md tentang Bot Telegram:

# Bot Telegram

Ini adalah contoh kode untuk membuat bot Telegram menggunakan Node.js.

## Langkah-langkah

1. Buat bot Telegram baru menggunakan [BotFather](https://t.me/BotFather).
2. Salin token bot yang diberikan oleh BotFather.
3. Install `node-telegram-bot-api` dengan menjalankan perintah `npm install node-telegram-bot-api`.
4. Buat file `index.js` dan salin kode contoh berikut:

```javascript
const TelegramBot = require('node-telegram-bot-api');

// Ganti 'YOUR_TELEGRAM_BOT_TOKEN' dengan token bot Telegram Anda
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Buat instance bot Telegram baru
const bot = new TelegramBot(token, { polling: true });

// Tangani perintah /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Halo! Saya adalah bot yang dapat membantu Anda dengan pertanyaan apa pun. Silakan kirim pesan Anda.");
});

// Tangani pesan masuk
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  bot.sendMessage(chatId, "Anda mengirim pesan: " + message);
});
```

5. Jalankan bot dengan menjalankan perintah `node index.js`.
6. Coba kirim pesan ke bot Anda di Telegram dan bot akan membalas dengan pesan Anda.

## Dokumentasi

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - API klien untuk Bot Telegram.
- [Telegram Bot API](https://core.telegram.org/bots/api) - Dokumentasi resmi API Bot Telegram.
