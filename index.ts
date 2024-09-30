import setupBot from './src/bot.js';
import initModels from "./src/database/models/realtion.ts"
import sequelize from './src/database/config.ts';

const models = initModels();
(async function () {
    try {
        
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });

        const bot = setupBot();
        bot.launch();

        console.log("</ Bot launched successfully >")
    } catch (error) {
        console.error('Startup error: ', error)
    }
}())