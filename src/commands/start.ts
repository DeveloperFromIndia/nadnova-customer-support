import type { Context } from "telegraf";
import { StartKeyboard } from "../keyboards/cmd-keyboard"

const start = async (ctx: Context) => {
    const title = `Бот вітає користувача і коротко пояснює, як він допоможе в процесі підготовки до відкриття фастфуду.`;
    ctx.replyWithHTML(title, StartKeyboard)
}

export default start;