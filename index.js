const TelegramBot = require('node-telegram-bot-api');
const token = '6008084117:AAF-YwmcYEhieV3GjmpqaO7tP4REQQ1lHVE';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/confess/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Silakan masukkan pesan confes Anda:')
    .then(() => {
      bot.onReplyToMessage(chatId, msg.message_id, (replyMsg) => {
        const confessMessage = replyMsg.text;
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

        bot.sendMessage(chatId, 'Silakan masukkan @username atau ID pengguna yang ingin diberikan pesan confes:')
          .then(() => {
            bot.onReplyToMessage(chatId, msg.message_id, (replyMsg) => {
              const targetId = replyMsg.text;
              const opts = {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Konfirmasi',
                        callback_data: 'confirm_message',
                      },
                      {
                        text: 'Batalkan',
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
  `;
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

bot.onText(/\/owner/, (msg) => {
  const chatId = msg.chat.id;

  const ownerMessage = `
  *Bot Telegram Confess*

  Owner: https://t.me/miftahganz
  `;
  bot.sendMessage(chatId, ownerMessage, { parse_mode: 'Markdown' });
});
