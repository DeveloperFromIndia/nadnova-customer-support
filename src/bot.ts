import dotenv from 'dotenv'; dotenv.config();
import {
    Scenes,
    session,
    Telegraf
} from 'telegraf';


// commands
import start from './commands/start.ts';
import { faq_command, faqAnswer_command } from './commands/faq.ts';
import { cmd, inline_cmd } from './utils/cmd.ts';
import { collectClientDataScene, enterCollectClientDataScene } from './commands/scenes/collect-contacts.ts';



if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("Bot token is undefined, look at .env")
}
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);


const stage = new Scenes.Stage([collectClientDataScene]);
const setupBot = () => {
    bot.use(session());
    bot.use(stage.middleware());

    // commands
    bot.start(start);
    bot.hears(cmd.faq, faq_command);
    bot.hears(cmd.contact, enterCollectClientDataScene)
    // inline commands
    bot.action(inline_cmd.faq.key, faqAnswer_command);

    return bot;
}

export default setupBot;