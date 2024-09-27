import type { Context } from "telegraf";
import { FaqKeyboard } from "../keyboards/cmd-keyboard"
import type IExtendedCtx from "../types/IExtendedCtx";
import { inline_cmd } from "../utils/cmd";



export const faq_command = async (ctx: Context) => {
    const title = `title`;
    ctx.reply(title, FaqKeyboard);
}

export const faqAnswer_command = async (ctx: IExtendedCtx) => {
    const answerId: number = Number(ctx.match?.input?.split(' ')[1]);
    ctx.replyWithHTML(`<b>${inline_cmd.faq.content[answerId].q}</b>\n\n${inline_cmd.faq.content[answerId].a}`)
    ctx.answerCbQuery();
}

