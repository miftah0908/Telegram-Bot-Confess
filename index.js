const TelegramBot = require('node-telegram-bot-api');

const botToken = '6008084117:AAF-YwmcYEhieV3GjmpqaO7tP4REQQ1lHVE';
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Halo, selamat datang di bot confess!');
});

bot.onText(/\/confess/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Kirim pesan',
            callback_data: 'send_message',
          },
          {
            text: 'Batal',
            callback_data: 'cancel',
          },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, 'Silakan pilih aksi:', opts);
});

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  if (callbackQuery.data === 'send_message') {
    const chatId = message.chat.id;
    bot.sendMessage(chatId, 'Silakan ketikkan pesanmu untuk confes di sini:');
  } else if (callbackQuery.data === 'cancel') {
    bot.sendMessage(message.chat.id, 'Batal');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.startsWith('/confess')) {
    const confessMessage = msg.text.substring(8);
    bot.sendMessage(chatId, 'Terima kasih, pesanmu telah terkirim!');
    bot.sendMessage(chatId, `Pesan confes kamu: ${confessMessage}`);
  }
});
