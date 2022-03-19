const clientId = "916233710364409858",
  RPC = require("discord-rpc"),
  client = new RPC.Client({ transport: "ipc" }),
  path = require("path"),
  util = require("util"),
  fs = require("fs"),
  chalk = require("chalk");

let amount = 0;

const updateActivity = () => {
  const checkStat = util.promisify(fs.stat),
    checkDir = util.promisify(fs.readdir);

  const getFiles = async (dir) => {
    const files = await checkDir(dir);
    return Promise.all(
      files
        .filter(
          (f) =>
            f !== "node_modules" &&
            f !== ".git" &&
            f !== "gokz-edit" &&
            f !== "include" &&
            !f.includes(".mp4") &&
            !f.includes(".png") &&
            !f.includes(".jpg") &&
            !f.includes(".gif") &&
            !f.includes("package-lock.json") &&
            !f.includes("spcomp") &&
            !f.includes("kztimer") &&
            !f.includes("compile")
        )
        .map((f) => path.join(dir, f))
        .map(async (f) => {
          const stats = await checkStat(f);
          return stats.isDirectory() ? getFiles(f) : f;
        })
    );
  };

  const flattenArray = (array) => {
    return array.reduce(
      (flat, toFlatten) =>
        flat.concat(
          Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
        ),
      []
    );
  };

  getFiles("C:/github")
    .then(flattenArray)
    .then((files) => {
      files.map((f) =>
        fs.readFile(f, "utf8", (err, data) => {
          amount = amount + data.split("\n").length;
        })
      );
    });

  setTimeout(() => {
    client.setActivity({
      details: "Developing",
      state: `${amount.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      })} total lines of code`,
      largeImageKey: `https://celeritycs.com/images/background.png`,
      largeImageText: `www.celeritycs.com`,
      smallImageKey: `https://celeritycs.com/images/white.png`,
      smallImageText: `Celerity`,
      instance: true,
      buttons: [
        {
          label: "Website",
          url: "https://celeritycs.com",
        },
      ],
    });
  }, 1000);
};

client.on("ready", () => {
  console.log("ready");

  const logMessage = () => {
    console.log(
      `${chalk.bold(
        `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] ${chalk.green(
          "Successfully"
        )} updated RPC!`
      )}`
    );
  };

  updateActivity();
  logMessage();

  setInterval(() => {
    updateActivity();
    logMessage();
  }, 60000);
});

client.login({ clientId });
