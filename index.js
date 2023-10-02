const { readdirSync } = require("fs");
const { join } = require("path");
const {
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Collection,
  Intents,
  GatewayIntentBits,
  Events,
  Partials,
} = require("discord.js");

const { token } = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Reaction],
});

client.commands = new Collection();
const foldersPath = join(__dirname, "commands");
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = join(foldersPath, folder);
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".js")
  );
  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(".js")
);
for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channelId === "839426893547044890") {
    msg.channel.send(
      "* Eğer bu bir Pr incelemesiyse  lütfen bağlantılı PR de nelerin değiştiğini gösteren ekran görüntülerinin olduğundan ve tasarım sistemlerinin PR'ye katılım düzeyinin açık olduğundan emin olun  \n* Sorunuz bir tasarım içeriyorsa lütfen doğrudan söz konusu Figma sayfasına veya çerçeveye bağlantı verin ekran görüntüsü sağlamak yerine''Geçerli adımları izledikten sonra veya bunlar geçerli değilse lütfen Onayla yı tıklayın Yanıt gelmezse lütfen doğrudan ping atın' "
    );

    const interactionButton = {
      type: 2,
      style: 1,
      label: "Okudum,Anladim",
      customId: "Okudum,Anladim",
    };

    const message = await msg.channel.send({
      content: "Yukarida yazilanlari okudum:",
      components: [
        {
          type: 1,
          components: [interactionButton],
        },
      ],
    });

    const filter = (i) =>
      i.customId === "Okudum,Anladim" && i.user.id === msg.author.id;
    const collector = message.createMessageComponentCollector({
      filter,
      time: 15000,
    }); // Adjust the time as needed

    collector.on("collect", async (interaction) => {
      interaction.deferUpdate(); // Acknowledge the interaction

      // Disable the button
      interactionButton.disabled = true;

      // Update the message with the disabled button
      await message.edit({
        content: "Yukarida yazilanlari okudum:",
        components: [
          {
            type: 1,
            components: [interactionButton],
          },
        ],
      });
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        console.log("Collector ended due to time.");
      }
    });
  }
});

client.login(token);
