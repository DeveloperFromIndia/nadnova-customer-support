import dotenv from 'dotenv'; dotenv.config();
import {
    session,
    Telegraf
} from 'telegraf';

import { cmd, inline_cmd } from './utils/cmd.ts';

// <commands> 
import start from './commands/start.ts';

if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("Bot token is undefined, look at .env")
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const setupBot = () => {
    bot.use(session());
    bot.start(start);

    return bot;
}

export default setupBot;