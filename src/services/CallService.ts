import { Op } from "sequelize";
import CallModel from "../database/models/Call/Call";

class CallService {
    async isClientInCall(userId: number) {
        try {
            const clientInCall = await CallModel.findOne({
                where: {
                    [Op.or]: [
                        { clientId: userId },
                        { managerId: userId }
                    ]
                }
            });
            return clientInCall;
        } catch (err) {
            console.error(err);
        }
    }
    async makeCall(clientId: number, managerId: number) {
        try {
            const call = await CallModel.create({ clientId, managerId });
            return call;
        } catch (err) {
            console.error(err);
        }
    }
}

export default new CallService;