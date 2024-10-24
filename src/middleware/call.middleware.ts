import CallService from "../services/CallService";

const callMiddleware = async (ctx: any, next: any) => {
    const telegramId = ctx.from.id; 
    console.log(ctx.chat.id)  
    const res = await CallService.isClientInCall(telegramId); 
    if (res) {
        return next();
    }
}

export default callMiddleware;