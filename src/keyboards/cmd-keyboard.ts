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
    startText: `
Прекрасно, що ви зацікавилися відкриттям власної точки фастфуду! 🍔🍕 Перед тим, як ми зможемо надати вам детальну консультацію, давайте з'ясуємо основні деталі вашого проекту. Це допоможе нам краще зрозуміти ваші потреби та підготувати оптимальні рішення.\n\n
Натисніть <b>“Зв’язатись зі мною”</b>, щоб заповнити короткий брифінг і отримати індивідуальні поради!\n\n
Маєте питання? Ми підготували відповіді на найбільш часті запитання, які виникають у наших клієнтів під час відкриття точки фастфуду. 📋\n\n
Натисніть кнопку <b>“Ви часто питаєте”</b>, щоб переглянути часті запитання та дізнатися більше про процес відкриття, інвестиції, прибуток та інші важливі аспекти.Бот вітає користувача і коротко пояснює, як він допоможе в процесі підготовки до відкриття фастфуду.`,
    cancelCollectData: `На головну.`,
    finishCollectData: `
    Дякую, що заповнили завяку, ми зв’яжемось з вами через....\n\nПереходьте на наші соц. мережі
<a href="https://www.instagram.com/misha_fast_food/">Instagram</a>
<a href="https://www.tiktok.com/@misha_fast_food?lang=uk-UA">Tiktok</a>
<a href="https://www.youtube.com/@mishafastfood">Youtube</a>
<a href="mishafastfood.com.ua">Сайт</a>
    `,
    leaveCollectData: `Форму скасовано.`,
    collectPhone: `Ваш номер телефону`
}