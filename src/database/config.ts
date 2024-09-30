import dotenv from 'dotenv'; dotenv.config();
import { Sequelize } from "sequelize";

const config = new Sequelize(
    {
        dialect: 'sqlite',
        storage: 'src/database/db.sqlite',
        logging: false, // dev
        define: {
            freezeTableName: true,
            timestamps: false
        },

    }
);

export default config;