const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const cancel = new ButtonBuilder()
      .setCustomId("Primary")
      .setLabel("Anladim!")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false);
    const row = new ActionRowBuilder().addComponents(cancel);

    await interaction.reply({
      components: [row],
    });
  },
};
