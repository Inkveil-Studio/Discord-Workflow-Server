/**
 * @param {import("discord.js").Client} client
 * @param {import("discord.js").Interaction} interaction
 */

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        return interaction.reply({
            content: "Lệnh không tồn tại.",
            ephemeral: true
        });
    }

    await command.execute(interaction);
};
