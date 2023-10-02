const { client } = require(".");

client.on("messageCreate", (msg) => {
  if (msg.channelId === "839426893547044890") {
    msg.channel.send("yeter be pong");
  } else {
    message.author.bot;
    return;
  }

  console.log(msg);
  if (msg.content === "ping") {
    msg.channel.send("yeter be pong");
  }
});
