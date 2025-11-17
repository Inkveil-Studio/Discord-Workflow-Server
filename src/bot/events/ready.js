/**
 * @typedef {import("discord.js").Client} Client
 * @param {Client} client
 */
module.exports = (client) => {
    console.log(`${client.user.username} is online!`);

    // console.log(client.channels.cache);
};
