import type { Context } from "telegraf";

export default interface IExtendedCtx extends Context {
    match?: RegExpMatchArray,
}
