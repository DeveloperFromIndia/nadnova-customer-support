import dotenv from 'dotenv'; dotenv.config();
import UserService from "../../services/UserService";
import { getUserInlineKb, makeFromUserResponseInlineList } from "../../keyboards/users/users-inline";
import CallService from "../../services/CallService";
import { sendMessageToUser } from "../../bot";
import type IExtendedCtx from '../../types/IExtendedCtx';

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

export const usersPagination = async (ctx: IExtendedCtx) => {
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

export const makeCall = async (ctx: IExtendedCtx) => {
    try {
        const match = ctx.match;
        if (match) {
            const telegramId = Number(match[0].split(' ')[0]);
            if (telegramId == Number(ctx.from?.id)) {
                return ctx.reply("Опція недоступна");
            }
            const clientInCallStatus = await CallService.isClientInCall(telegramId);
            if (!!clientInCallStatus) {
                ctx.answerCbQuery();
                return ctx.reply("Абонент зайнятий");
            }

            const messageToClient: any = await sendMessageToUser(telegramId, "Менеджер підключився до чату");
            if (!messageToClient?.message_id) {
                ctx.answerCbQuery();
                return ctx.reply("Клієнт заблокував бота.");
            }
        
            await CallService.makeCall(telegramId, Number(ctx.from?.id));
            ctx.answerCbQuery();
            return ctx.reply("Клієнт готовий отримувати повідомлення.");
        }
    } catch (err) {
        console.error(err)
    }
}
export const cancelCall = async (ctx: IExtendedCtx) => {
    try {
        const match = ctx.match;
        const telegramId = ctx.from?.id;
        if (match && telegramId) {
            const call = await CallService.isClientInCall(telegramId);
            if (call) {
                const messageToClient: any = await sendMessageToUser(call.dataValues.clientId, "Менеджер отключился.");
                call.destroy();
                if (!messageToClient?.message_id) {
                    ctx.reply("Клієнт заблокував бота.");
                }
                ctx.reply("Розмову закінчено.");
            }
        }
    } catch (err) {
        console.error(err);
    }
}
export const transferMessage = async (ctx: any) => {
    const telegramId = ctx.from?.id;
    if (telegramId) {
        const res = await CallService.isClientInCall(telegramId);
        const client = res?.dataValues.clientId == telegramId;
        let targetId = client ? Number(process.env.TELEGRAM_GROUP_ID) : res?.dataValues.clientId;

        if (ctx.message.text) {
            let text = ctx.message.text;
            if(Number(process.env.TELEGRAM_GROUP_ID) == targetId) {
                text = `${ctx.from.username}: ${text}`;
            }
            const messageToClient: any = await sendMessageToUser(targetId, text);
            if (!messageToClient?.message_id) {
                return ctx.reply("Клієнт заблокував бота.");
            }
        } else if (ctx.message.photo) {
            const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
            await ctx.telegram.sendPhoto(targetId, fileId, {
                caption: ctx.message.caption || '',
            });
        } else if (ctx.message.voice) {
            const fileId = ctx.message.voice.file_id;
            await ctx.telegram.sendVoice(targetId, fileId, {
                caption: ctx.message.caption || '',
            });
        } else if (ctx.message.video_note) {
            const fileId = ctx.message.video_note.file_id;
            await ctx.telegram.sendVideoNote(targetId, fileId);
        } else if (ctx.message.document) {
            const fileId = ctx.message.document.file_id;
            await ctx.telegram.sendDocument(targetId, fileId, {
                caption: ctx.message.caption || '',
            });
        } else if (ctx.message.video) {
            const fileId = ctx.message.video.file_id;
            await ctx.telegram.sendVideo(targetId, fileId, {
                caption: ctx.message.caption || '',
            });
        } else if (ctx.message.audio) {
            const fileId = ctx.message.audio.file_id;
            await ctx.telegram.sendAudio(targetId, fileId, {
                caption: ctx.message.caption || '',
            });
        } else {
            console.log('Unsupported message type');
        }
    }
}