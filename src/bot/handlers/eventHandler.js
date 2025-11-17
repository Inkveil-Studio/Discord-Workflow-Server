const fs = require("fs");
const path = require("path");

/**
 * @param {import("discord.js").Client} client
 */
module.exports = (client) => {
    const eventsPath = path.join(__dirname, "../events");
    const files = fs.readdirSync(eventsPath);

    files.forEach((file) => {
        const event = require(path.join(eventsPath, file));
        const eventName = file.split(".")[0];

        client.on(eventName, (...args) => event(client, ...args));
    });
};
