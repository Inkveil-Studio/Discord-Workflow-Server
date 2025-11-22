const fs = require("fs");
const path = require("path");

module.exports = (client) => {
    // Load commands
    client.commands = new Map();
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, "../commands", file));
        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
        }
    }

    // Load events
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs.readdirSync(eventsPath);

    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        const eventName = file.split(".")[0];

        client.on(eventName, (...args) => event(client, ...args));
    }
};
