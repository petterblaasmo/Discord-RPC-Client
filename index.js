const clientId = "916233710364409858",
  RPC = require("discord-rpc"),
  Discord = require("discord.js"),
  bot = new Discord.Client({ intents: 32767 }),
  client = new RPC.Client({ transport: "ipc" }),
  chalk = require("chalk"),
  config = require("./config.json"),
  steamgroup = require("node-steam-group");

const date = new Date("March 20, 2022 02:30:00");

const errorLog = (e) =>
  console.log(
    `${chalk.bold(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] ${chalk.red(
        "Failed"
      )} to update RPC! (${e})`
    )}`
  );

const successLog = () =>
  console.log(
    `${chalk.bold(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] ${chalk.green(
        "Successfully"
      )} updated RPC!`
    )}`
  );

const runRPC = async () => {
  steamgroup.getmembers("celeritycsdotcom", (err, data) => {
    let steam;
    if (err) steam = 0;
    else steam = data.length;
    client.setActivity({
      details: `Steam Members: ${steam}`,
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
