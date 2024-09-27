import { WizardContextWizard, WizardScene, type WizardContext } from "telegraf/scenes";
import { AnotherImpactText, StartKeyboard } from "../../keyboards/cmd-keyboard";
import { EnterExpertise, EnterKeyboard, EnterScale, EnterTaxpayerStatus } from "../../keyboards/scenes-keyboard/collect-contacts";


export const enterCollectClientDataScene = (ctx: any) => {
    ctx.scene.enter("collectDataAboutClient");
}

export const collectClientDataScene = new WizardScene(
    "collectDataAboutClient",
    (ctx: any) => {
        ctx.reply("Який бюджет ви плануєте виділити на відкриття? в доларах США ($)");
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.reply("Чи маєте ви досвід у сфері фастфуду або ресторанного бізнесу?", EnterExpertise);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.reply("На яку квадратуру розраховуєте ?", EnterScale);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.reply("Чи маєте ви зареєстрований ФОП/ТОВ для ведення бізнесу?", EnterTaxpayerStatus);
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.reply("Скільки годин на день готові приділяти вашому бізнесу");
        return ctx.wizard.next();
    },
    (ctx: any) => {
        ctx.reply(AnotherImpactText.finishCollectData, StartKeyboard)
        ctx.scene.leave();
    }
);

collectClientDataScene.enter(async (ctx) => await ctx.reply(`У якому місті/області ви плануєте відкривати точку фастфуду`, EnterKeyboard));
collectClientDataScene.hears(AnotherImpactText.cancelCollectData, async (ctx) => ctx.scene.leave());
collectClientDataScene.leave(async (ctx) => ctx.sendMessage(AnotherImpactText.leaveCollectData, StartKeyboard));