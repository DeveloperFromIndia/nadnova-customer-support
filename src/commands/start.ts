import type { Context } from "telegraf";
import { AnotherImpactText, StartKeyboard } from "../keyboards/cmd-keyboard"

const start = async (ctx: Context) => {
    if (ctx.from?.id) {
        ctx.replyWithHTML(AnotherImpactText.startText, await StartKeyboard(ctx.from?.id))
    }
}

export default start;