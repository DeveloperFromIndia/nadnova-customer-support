import { Markup } from "telegraf";
import { AnotherImpactText } from "../cmd-keyboard";

export const EnterKeyboard = Markup.keyboard(
    [
        [AnotherImpactText.cancelCollectData],
    ]
).resize();

// Чи маєте ви досвід у сфері фастфуду або ресторанного бізнесу?
export const EnterExpertise = Markup.keyboard(
    [
        [{ text: "Так" }, { text: "Нi" }],
        [AnotherImpactText.cancelCollectData]
    ]
).resize();

// На яку квадратуру розраховуєте ?
export const EnterScale = Markup.keyboard(
    [
        [{ text: "До 20 квадратів" }, { text: "20-40 квадратів" }],
        [{ text: "40-60 квадратів" }, { text: "60-80 квадратів" }],
        [AnotherImpactText.cancelCollectData]
    ]
).resize();

// Чи маєте ви зареєстрований ФОП/ТОВ для ведення бізнесу?
export const EnterTaxpayerStatus = Markup.keyboard(
    [
        [{ text: "Так" }, { text: "Нi" }],
        [AnotherImpactText.cancelCollectData]
    ]
).resize();