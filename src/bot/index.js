const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv").config();

const eventHandler = require("./handlers/eventHandler.js");
const commandHandler = require("./handlers/commandHandler.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

commandHandler(client);
eventHandler(client);

client.login(process.env.BOT_TOKEN);
