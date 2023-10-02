const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "Okudum,Anladim") {
        interaction.reply(
          "Tesekkurler en kisa zamanda soruna cevap gelecek :)"
        );
      }
    } else if (interaction.isStringSelectMenu()) {
    }
  },
};
