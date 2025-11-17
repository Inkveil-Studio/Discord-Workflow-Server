/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Message} msg
 */
module.exports = (client, msg) => {
    const botId = client.user.id;
    const isTagged = msg.mentions.has(botId);
    const authorId = msg.author.id;
    console.log(authorId);
    const adminIds = [661209040751296533, 814863824921296947];

    if (msg.content === "ping") {
        msg.channel.send("pong");
    }
    if (msg.content === "ding") {
        msg.channel.send("dong");
    }
    if (msg.content === "ching") {
        msg.channel.send("chong");
    }

    if (isTagged) {
        if (msg.content.toLowerCase().includes("kick")) {
            msg.channel.send("Kicking you...").then(() => {
                msg.member.kick().catch((err) => {
                    console.error(err);
                    msg.channel.send(
                        "I couldn't kick you. Do I have the right permissions?"
                    );
                });
            });
        }
    }
};
