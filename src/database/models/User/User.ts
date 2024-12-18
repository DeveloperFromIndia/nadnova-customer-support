import { DataTypes } from "sequelize";
import SequelizeConfig from "../../config.js";

const UserModel = SequelizeConfig.define("bot_user", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
    telegramId: { type: DataTypes.INTEGER, unique: true },
});

export default UserModel;