const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

// Load commands
for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`[⚠️] Command ${file} không hợp lệ.`);
    }
}

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

// Deploy
(async () => {
    try {
        console.log(`🚀 Deploying ${commands.length} slash commands...`);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("✅ Deploy done!");
    } catch (error) {
        console.error(error);
    }
})();
