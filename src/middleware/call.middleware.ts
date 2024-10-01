import CallService from "../services/CallService";

const callMiddleware = async (ctx: any, next: any) => {
    const telegramId = ctx.from.id;   
    const res = await CallService.isClientInCall(telegramId); 
    if (res) {
        return next();
    }
}

export default callMiddleware;