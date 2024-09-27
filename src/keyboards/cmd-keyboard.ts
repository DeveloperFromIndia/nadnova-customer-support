import { Markup } from 'telegraf';
import { cmd, inline_cmd } from '../utils/cmd.js';

export const StartKeyboard = Markup.keyboard(
    [
        [cmd.faq],
        [cmd.contact],
    ]
).resize();

export const FaqKeyboard = Markup.inlineKeyboard(
    inline_cmd.faq.content.map((item, index) => [{ text: item.q, callback_data: `${inline_cmd.faq.lock} ${index}` }])
    // for debug
    // inline_cmd.faq.content.map((item, index) => [{ text: `${inline_cmd.faq.lock} ${index}`, callback_data: `${inline_cmd.faq.lock} ${index}` }])
)

