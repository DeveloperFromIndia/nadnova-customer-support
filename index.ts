import setupBot from './src/bot.js';

(async function () {
    try {
        const bot = setupBot();
        bot.launch();

        console.log("</ Bot launched successfully >")
    } catch (error) {
        console.error('Startup error: ', error)
    }
}())