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

<<<<<<< HEAD
const runRPC = () => {
  const getMembers = (group, callback) => {
    steamgroup.getmembers(group, (err, data) => {
      if (err) return callback(0);
      callback(data.totalmembers);
    });
  };

  console.log(getMembers("celeritycsdotcom"));

  client.setActivity({
    details: `Steam Members: ${getMembers("celeritycsdotcom")}`,
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
=======
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
>>>>>>> 53ba4d949e8cdae15c1a314516898d0c675333be
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
