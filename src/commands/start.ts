import type { Context } from "telegraf";
import { AnotherImpactText, StartKeyboard } from "../keyboards/cmd-keyboard"

const start = async (ctx: Context) => {
    ctx.replyWithHTML(AnotherImpactText.startText, StartKeyboard)
}

export default start;