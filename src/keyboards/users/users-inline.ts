import { Markup } from "telegraf";
import type { IUserByPage } from "../../types/IUser";
import UserService from "../../services/UserService";

export const makeFromUserResponseInlineList = (response: IUserByPage): any => {
    try {
        let title = "";
        let keyboard = null;

        if (response.totalPages === 0) {
            title = "Тут пока пусто"
            keyboard = [{ text: "void", callback_data: "x" }];
            return [title, keyboard];
        }

        title = `Страница ${response.currentPage} из ${response.totalPages}`
        // get user
        const content = response.users.map(user => {
            return [{ text: `${user.username}`, callback_data: `${user.telegramId} GET-USER` }]
        });

        const nextButton = Number(response.currentPage) + 1 > response.totalPages ? { text: '⏺', callback_data: "nothing" } : { text: '➡️', callback_data: `${Number(response.currentPage) + 1} USERS_PAGE` }
        const prevButton = Number(response.currentPage) - 1 <= 0 ? { text: '⏺', callback_data: "nothing" } : { text: '⬅️', callback_data: `${response.currentPage - 1} USERS_PAGE` }

        keyboard = Markup.inlineKeyboard([
            ...content,
            [
                prevButton,
                nextButton,
            ]
        ]);
        return [title, keyboard];
    } catch (err) {
        console.error(err);
    }
}

export const getUserInlineKb = (telegramId: number) => {
    return Markup.inlineKeyboard([
        { text: "☎️", callback_data: `${telegramId} CALL` },
    ])
}