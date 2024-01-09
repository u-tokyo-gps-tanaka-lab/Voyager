const mineflayer = require('mineflayer')

function onConnectionFailed(e) {
  console.log(e);
  bot = null;
  res.status(400).json({ error: e });
}

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'Bot', // username or email, switch if you want to change accounts
  // auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 49488,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
  disableChatSigning: true,
  checkTimeoutInterval: 60 * 60 * 1000,
})

bot.once("error", onConnectionFailed);

// Event subscriptions
bot.waitTicks = 20;
bot.globalTickCounter = 0;
bot.stuckTickCounter = 0;
bot.stuckPosList = [];
bot.iron_pickaxe = false;

    // mounting will cause physicsTick to stop
    bot.on("mount", () => {
      bot.dismount();
  });

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

//


// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)




