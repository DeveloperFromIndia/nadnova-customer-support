import dotenv from 'dotenv'; dotenv.config();
import {
    Scenes,
    session,
    Telegraf
} from 'telegraf';


import { cmd, inline_cmd } from './utils/cmd.ts';
// commands
import start from './commands/start.ts';
import { faq_command, faqAnswer_command } from './commands/faq.ts';
import { collectClientDataScene, enterCollectClientDataScene } from './commands/scenes/collect-contacts.ts';
import { usersPagination, anotherPageInUsersList, getUser, makeCall, transferMessage, cancelCall } from './commands/users/users.ts';
import adminGroupMiddleware from './middleware/admin-group.middleware.ts';
import callMiddleware from './middleware/call.middleware.ts';



if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("Bot token is undefined, look at .env")
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export const sendMessageToUser = async (telegramId: number, message: string) => {
    try {
        return await bot.telegram.sendMessage(telegramId, message);
    } catch (err) {
        return err
    }
};


const stage = new Scenes.Stage([collectClientDataScene]);
const setupBot = () => {
    bot.use(session());
    bot.use(stage.middleware());

    // commands
    bot.start(start);
    bot.hears(cmd.faq, faq_command);
    bot.hears(cmd.contact, enterCollectClientDataScene);

    // inline commands
    bot.action(inline_cmd.faq.key, faqAnswer_command);
    // admin handlers
    bot.command('users', adminGroupMiddleware, usersPagination);
    bot.action(/[0-9]+.USERS_PAGE/, adminGroupMiddleware, anotherPageInUsersList);
    bot.action(/[0-9]+.GET-USER/, adminGroupMiddleware, getUser);
    bot.action(/[0-9]+.CALL/, adminGroupMiddleware, makeCall);
    bot.command('cancelcall', adminGroupMiddleware, cancelCall)
    bot.on('message', callMiddleware, transferMessage);
    return bot;
}

export default setupBot;