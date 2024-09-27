import { Markup } from 'telegraf';
import { cmd } from '../utils/cmd.js';

export const StartKeyboard = Markup.keyboard(
    [
        [cmd.faq],
        [cmd.contact],
    ]
).resize();

