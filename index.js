const clientId = "916233710364409858",
  RPC = require("discord-rpc"),
  Discord = require("discord.js"),
  bot = new Discord.Client({ intents: 32767 }),
  client = new RPC.Client({ transport: "ipc" }),
  chalk = require("chalk"),
  config = require("./config.json"),
  steamgroup = require("node-steam-group");

const errorLog = (e) =>
  console.log(
    `${chalk.gray(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}]`
    )} ${chalk.bold.red("Failed")} to update ${chalk.bold("RPC")} status (${e})`
  );

const successLog = () =>
  console.log(
    `${chalk.gray(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}]`
    )} ${chalk.bold.green("Successfully")} updated ${chalk.bold("RPC")} status`
  );

const runRPC = () => {
  steamgroup.getmembers(group, (err, data) => {
    let members;
    if (err) members = 0;
    if (data) members = data;

    client.setActivity({
      details: `Steam Members: ${members}`,
      state: `Discord Memebers: ${
        bot.guilds.cache.get(config.guild).memberCount
      }`,
      largeImageKey: `https://celeritycs.com/images/background.png`,
      largeImageText: `www.celeritycs.com`,
      smallImageKey: `https://celeritycs.com/images/white.png`,
      smallImageText: `Celerity`,
      instance: true,
      // startTimestamp: date,
      buttons: [
        {
          label: "Website",
          url: "https://celeritycs.com",
        },
      ],
    });
  });
};

client.on("ready", () => {
  successLog();
  setInterval(() => {
    runRPC();
    successLog();
  }, 15000);
});

const login = () => {
  client.login({ clientId }).catch((err) => {
    console.log(errorLog("Login Failed"));
    login();
  });
};

login();

bot.login(config.token);
