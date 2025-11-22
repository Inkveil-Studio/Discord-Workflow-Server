const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/** 
* @param {import("discord.js").Client} client
* @param {import("discord.js").CommandInteraction} interaction
*/

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setnickname')
        .setDescription('Đổi nickname của 1 thành viên')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Thành viên cần đổi nickname')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('nickname')
                .setDescription('Nickname mới')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),

    async execute(interaction) {
        const member = interaction.options.getMember('target');
        const nickname = interaction.options.getString('nickname');

        try {
            await member.setNickname(nickname);
            await interaction.reply(`Đã đổi nickname của **${member.user.username}** thành **${nickname}**`);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'Không đổi được nickname. Bot chưa đủ quyền', ephemeral: true });
        }
    },
};
