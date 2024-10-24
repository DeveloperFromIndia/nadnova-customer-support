import dotenv from 'dotenv'; dotenv.config();
import { WizardScene } from "telegraf/scenes";
import { AnotherImpactText, StartKeyboard } from "../../keyboards/cmd-keyboard";
import { EnterExpertise, EnterKeyboard, EnterPhoneNumber, EnterScale, EnterTaxpayerStatus } from "../../keyboards/scenes-keyboard/collect-contacts";
import { GoogleSheetsService } from "../../services/GoogleSheetsService";
import UserService from "../../services/UserService";
import { sendMessageToUser } from '../../bot';
import { Markup } from 'telegraf'; // asdasdasd


export const enterCollectClientDataScene = (ctx: any) => {
    ctx.scene.enter("collectDataAboutClient");
}
const GoogleService = new GoogleSheetsService;
export const collectClientDataScene = new WizardScene(
    "collectDataAboutClient",
    (ctx: any) => {
        ctx.wizard.state.clientData = [];
        ctx.wizard.state.clientData.push(ctx.message.text);
        if (!ctx.from?.username) {
            ctx.wizard.state.clientData.push(`username відсутня`);
        } else {
            ctx.wizard.state.clientData.push(`https://t.me/${ctx.from?.username}`);
        }
        ctx.reply("Ваш номер телефону", EnterPhoneNumber);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        if (ctx.message.contact) {
            // If user send phone number with special button
            ctx.wizard.state.clientData.push(ctx.message.contact.phone_number); 
        } else {
            const phoneNumber = ctx.message.text;
            const phoneRegex = /^\d{9,15}$/; 

            if (!phoneRegex.test(phoneNumber)) {
                ctx.reply("Будь ласка, введіть правильний номер телефону, що складається лише з цифр (від 9 до 15)");
                return; 
            }

            ctx.wizard.state.clientData.push(phoneNumber); 
        }

        ctx.reply("Який бюджет ви плануєте виділити на відкриття? в доларах США ($)", EnterKeyboard);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.wizard.state.clientData.push(ctx.message.text);
        ctx.reply("Чи маєте ви досвід у сфері фастфуду або ресторанного бізнесу?", EnterExpertise);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.wizard.state.clientData.push(ctx.message.text);
        ctx.reply("На яку квадратуру розраховуєте ?", EnterScale);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.wizard.state.clientData.push(ctx.message.text);
        ctx.reply("Чи маєте ви зареєстрований ФОП/ТОВ для ведення бізнесу?", EnterTaxpayerStatus);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.wizard.state.clientData.push(ctx.message.text);
        ctx.reply("Скільки годин на день готові приділяти вашому бізнесу", EnterKeyboard);
        return ctx.wizard.next();
    },
    async (ctx: any) => {
        ctx.wizard.state.clientData.push(ctx.message.text);
        GoogleService.appendData(ctx.wizard.state.clientData);
        if (ctx.from?.id && ctx.from?.username) {
            await UserService.craeteNewUser(ctx.from?.id, ctx.from?.username);
        }
        const chatId = process.env.TELEGRAM_GROUP_ID;
        const res = await sendMessageToUser(Number(chatId), "Клієнт залишив заявку!")
        const kb = await StartKeyboard(ctx.from.id)
        ctx.replyWithHTML(AnotherImpactText.finishCollectData, {
            disable_web_page_preview: true,
            reply_markup: kb.reply_markup
        });
        ctx.scene.leave();
    }
);

collectClientDataScene.start(async (ctx) => {
    ctx.scene.leave()
    ctx.reply("Форму скасовано.", await StartKeyboard(ctx.from.id))
});
collectClientDataScene.enter(async (ctx) => {
    if (ctx.from.id) {
        const user = await UserService.getUser(ctx.from.id);
        if (user) {
            ctx.reply("Форму можна заповнити лише один раз", await StartKeyboard(ctx.from.id));
            ctx.scene.leave();
        } else {
            ctx.reply(`У якому місті/області ви плануєте відкривати точку фастфуду`, EnterKeyboard)
        }
    }
})
collectClientDataScene.hears(AnotherImpactText.cancelCollectData, async (ctx) => {
    ctx.reply(AnotherImpactText.leaveCollectData, await StartKeyboard(ctx.from.id));
    ctx.scene.leave()
});