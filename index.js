const TelegramBot = require('node-telegram-bot-api');
const token = '6008084117:AAF-YwmcYEhieV3GjmpqaO7tP4REQQ1lHVE';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/confess/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Silakan masukkan username dan pesan confes Anda dengan format "username|pesan":')
    .then(() => {
      bot.onReplyToMessage(chatId, msg.message_id, (replyMsg) => {
        const confessData = replyMsg.text.split('|');
        const targetId = confessData[0].trim();
        const confessMessage = confessData[1].trim();

        const opts = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Kirim',
                  callback_data: 'confirm_message',
                },
                {
                  text: 'Batal',
                  callback_data: 'cancel',
                },
              ],
            ],
          },
        };

        bot.sendMessage(chatId, 'Silakan konfirmasi pesan confes Anda:\n\n' + confessMessage, opts)
          .then(() => {
            bot.on('callback_query', (callbackQuery) => {
              const message = callbackQuery.message;
              if (callbackQuery.data === 'confirm_message') {
                const targetChatId = targetId.startsWith('@') ? targetId.substring(1) : targetId;
                bot.sendMessage(targetChatId, 'Anda menerima pesan confes dari ' + msg.from.first_name + ':\n\n' + confessMessage);
                bot.sendMessage(chatId, 'Pesan confes berhasil dikirim!');
              } else if (callbackQuery.data === 'cancel') {
                bot.sendMessage(chatId, 'Pengiriman pesan confes dibatalkan.');
              }
            });
          });
      });
    });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  const helpMessage = `
  *Bot Telegram Confess*

  Command:
  /confess - Mengirim pesan confes
  /help - Menampilkan bantuan
  /owner - Menampilkan informasi pemilik bot
  /grup - Mengirim pesan ke dalam grup
  /start - Menampilkan pesan selamat datang
  `;
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/owner/, (msg) => {
  const chatId = msg.chat.id;

  const ownerMessage = `
  *Bot Telegram Confess*

   Pemilik Bot : https://t.me/miftahganz
  `;
  bot.sendMessage(chatId, ownerMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/grup/, (msg) => {
  const chatId = msg.chat.id;

  bot.exportChatInviteLink(chatId)
    .then((inviteLink) => {
      const message = `Berikut adalah link undangan grup: https://t.me/miftahbotgrup`;
      bot.sendMessage(chatId, message);
    })
    .catch((error) => {
      console.log(error);
    });
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `
  *Bot Telegram Confess*

  Selamat datang di Bot Telegram Confess! Gunakan command /confess untuk mengirim pesan confes dan /help untuk melihat daftar command yang tersedia.
`;
bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
});
