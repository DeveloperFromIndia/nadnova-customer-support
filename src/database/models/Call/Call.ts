import { DataTypes } from "sequelize";
import SequelizeConfig from "../../config.js";

const CallModel = SequelizeConfig.define("bot_call", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER, unique: true },
    managerId: { type: DataTypes.INTEGER, unique: true },
});

export default CallModel;