import type { Context } from "telegraf";
import UserService from "../../services/UserService";
import { getUserInlineKb, makeFromUserResponseInlineList } from "../../keyboards/users/users-inline";
import type IExtendedCtx from "../../types/IExtendedCtx";

export const getUser = async (ctx: IExtendedCtx) => {
    try {
        if (!ctx.match) {
            throw "Context is broken";
        }
        const telegramId = ctx.match[0].split(' ')[0];
        const user = await UserService.getUser(Number(telegramId));
        ctx.answerCbQuery();
        if (!user) {
            ctx.reply(`Пользователь не найден`);
        } else {
            const { id, username } = user?.dataValues;
            ctx.reply(`${id} - @${username}\nTelegramId: ${telegramId}`, getUserInlineKb(Number(telegramId)));
        }

    } catch (err) {
        console.error(err);
    }
}

export const usersPagination = async (ctx: Context) => {
    try {
        const users = await UserService.getUserByPage(1);
        if (!users) {
            throw "something went wrong";
        }
        const [title, keyboard] = makeFromUserResponseInlineList(users);
        ctx.reply(title, keyboard);
    } catch (err) {
        console.error(err);
    }
}

export const anotherPageInUsersList = async (ctx: IExtendedCtx) => {
    try {
        let page: (number | string) = 1;
        if (ctx.match) {
            page = ctx.match[0].split(' ')[0];
        }
        const res = await UserService.getUserByPage(Number(page))
        if (!res) {
            throw console.error('Something went wrong')
        }
        ctx.answerCbQuery();
        const [title, keyboard] = makeFromUserResponseInlineList(res)
        ctx.editMessageText(title, keyboard);
    } catch (error) {
        console.error(error);
    }
}