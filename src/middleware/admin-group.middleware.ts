import dotenv from "dotenv"; dotenv.config();

const adminGroupMiddleware = (ctx: any, next: any) => {
    if (ctx.chat.id == process.env.TELEGRAM_GROUP_ID) {
        return next();
    } else {
        ctx.reply('Тільки адміністратори можуть використовувати цю команду.');
    }
}

export default adminGroupMiddleware;