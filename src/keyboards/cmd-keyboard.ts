import { Markup } from 'telegraf';
import { cmd, inline_cmd } from '../utils/cmd.js';
import UserModel from '../database/models/User/User.ts';

export const StartKeyboard = async (telegramId: number) => {
    const isUserInDb = await UserModel.findOne({ where: { telegramId } });
    const buttons = [];
    buttons.push([cmd.faq]);
    if (!isUserInDb) {
        buttons.push([cmd.contact]);
    }
    const keyBoard = Markup.keyboard(buttons).resize();
    return keyBoard;
}

export const FaqKeyboard = Markup.inlineKeyboard(
    inline_cmd.faq.content.map((item, index) => [{ text: item.q, callback_data: `${inline_cmd.faq.lock} ${index}` }])
    // for debug
    // inline_cmd.faq.content.map((item, index) => [{ text: `${inline_cmd.faq.lock} ${index}`, callback_data: `${inline_cmd.faq.lock} ${index}` }])
)

export const AnotherImpactText = {
    startText: `Бот вітає користувача і коротко пояснює, як він допоможе в процесі підготовки до відкриття фастфуду.`,
    cancelCollectData: `На головну.`,
    finishCollectData: `Дякую, що заповнили завяку, ми зв’яжемось з вами через....\nПереходьте на наші соц. мережі\nlink\nlink\nlink\nlink`,
    leaveCollectData: `Форму скасовано.`,
}