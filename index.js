const TelegramBot = require('node-telegram-bot-api');
const token = '6008084117:AAF-YwmcYEhieV3GjmpqaO7tP4REQQ1lHVE';
const bot = new TelegramBot(token, { polling: true });

// Command "/start" untuk memberikan pesan awal ketika bot dinyalakan
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Halo! Aku bot confess, yang akan membantumu mengirim pesan rahasia ke temanmu. Ketik "/confess" untuk mengirim pesan rahasia.');
});

// Command "/confess" untuk memulai proses confessing
bot.onText(/\/confess/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Ketik username temanmu dan pesan yang ingin kamu kirimkan. Contoh: \n\n @username_teman Pesan rahasiamu di sini.');
});

// Menangkap pesan dari pengguna
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // Memeriksa apakah pesan mengandung username teman dan teks confessing
  if (/^@([A-Za-z0-9_]{5,})\s(.+)/.test(message)) {
    // Menemukan username dan pesan
    const username = message.match(/^@([A-Za-z0-9_]{5,})\s(.+)/)[1];
    const confessMessage = message.match(/^@([A-Za-z0-9_]{5,})\s(.+)/)[2];

    // Mengirim pesan confessing ke teman
    bot.sendMessage(username, `Kamu mendapat pesan confess dari ${msg.from.username}: ${confessMessage}`, { reply_markup: { inline_keyboard: [[{ text: 'Balas Pesan', callback_data: `reply_${msg.from.id}` }]] } })
      .then(() => {
        bot.sendMessage(msg.chat.id, `Pesanmu telah terkirim ke @${username}.`);
      })
      .catch((error) => {
        bot.sendMessage(msg.chat.id, `Maaf, aku tidak dapat mengirim pesan ke @${username}. Pastikan username tersebut benar dan kamu sudah berteman dengannya.`);
      });
  }
});

// Menangkap respon dari inline keyboard
bot.on('callback_query', (callbackQuery) => {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;

  // Memeriksa apakah respon adalah permintaan balasan
  if (/^reply_/.test(data)) {
    const userId = data.split('_')[1];
    bot.sendMessage(chatId, `Ketik pesan yang ingin kamu balas ke @${bot.users[userId].username}.`, { reply_to_message_id: messageId });
  }
});
