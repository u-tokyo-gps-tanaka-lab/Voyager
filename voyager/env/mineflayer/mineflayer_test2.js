const mineflayer = require('mineflayer')

let bot = null;

function start(req, res){
    if (bot) onDisconnect("Restarting bot");
    bot = null;
    console.log(req.body);
    bot = mineflayer.createBot({
        host: "localhost", // minecraft server ip
        port: req.body.port, // minecraft server port
        username: "bot",
        disableChatSigning: true,
        checkTimeoutInterval: 60 * 60,
    });
    bot.once("error", onConnectionFailed);

    // Event subscriptions
    bot.waitTicks = req.body.waitTicks;
    bot.globalTickCounter = 0;
    bot.stuckTickCounter = 0;
    bot.stuckPosList = [];
    bot.iron_pickaxe = false;

    bot.on("kicked", onDisconnect);

    // mounting will cause physicsTick to stop
        bot.on("mount", () => {
        bot.dismount();
    });
    /*
    console.log("11111");
    bot.once("spawn", async () => {
        bot.chat('22222', console.log);
        bot.removeListener("error", onConnectionFailed);
        let itemTicks = 1;
        if (req.body.reset === "hard") {
            bot.chat("/clear @s");
            bot.chat("/kill @s");
            const inventory = req.body.inventory ? req.body.inventory : {};
            const equipment = req.body.equipment
                ? req.body.equipment
                : [null, null, null, null, null, null];
            for (let key in inventory) {
                bot.chat(`/give @s minecraft:${key} ${inventory[key]}`);
                itemTicks += 1;
            }
            const equipmentNames = [
                "armor.head",
                "armor.chest",
                "armor.legs",
                "armor.feet",
                "weapon.mainhand",
                "weapon.offhand",
            ];
            for (let i = 0; i < 6; i++) {
                if (i === 4) continue;
                if (equipment[i]) {
                    bot.chat(
                        `/item replace entity @s ${equipmentNames[i]} with minecraft:${equipment[i]}`
                    );
                    itemTicks += 1;
                }
            }
        }
        bot.chat('33333', console.log);
        if (req.body.position) {
            bot.chat(
                `/tp @s ${req.body.position.x} ${req.body.position.y} ${req.body.position.z}`
            );
        }

        // if iron_pickaxe is in bot's inventory
        if (
            bot.inventory.items().find((item) => item.name === "iron_pickaxe")
        ) {
            bot.iron_pickaxe = true;
        }
        console.log("44444");
        const { pathfinder } = require("mineflayer-pathfinder");
        const tool = require("mineflayer-tool").plugin;
        const collectBlock = require("mineflayer-collectblock").plugin;
        const pvp = require("mineflayer-pvp").plugin;
        const minecraftHawkEye = require("minecrafthawkeye");
        bot.loadPlugin(pathfinder);
        bot.loadPlugin(tool);
        bot.loadPlugin(collectBlock);
        bot.loadPlugin(pvp);
        bot.loadPlugin(minecraftHawkEye);
        console.log("55555");
        // bot.collectBlock.movements.digCost = 0;
        // bot.collectBlock.movements.placeCost = 0;

        obs.inject(bot, [
            OnChat,
            OnError,
            Voxels,
            Status,
            Inventory,
            OnSave,
            Chests,
            BlockRecords,
        ]);
        skills.inject(bot);

        if (req.body.spread) {
            bot.chat(`/spreadplayers ~ ~ 0 300 under 80 false @s`);
            await bot.waitForTicks(bot.waitTicks);
        }

        await bot.waitForTicks(bot.waitTicks * itemTicks);
        res.json(bot.observe());

        initCounter(bot);
        bot.chat("/gamerule keepInventory true");
        bot.chat("/gamerule doDaylightCycle false");
    });
    */
    function onConnectionFailed(e) {
        console.log(e);
        bot = null;
        res.status(400).json({ error: e });
    }
    function onDisconnect(message) {
        if (bot.viewer) {
            bot.viewer.close();
        }
        bot.end();
        console.log(message);
        bot = null;
    }
};
body = {
    port: 49488,
    reset: 'hard',
    inventory: {},
    equipment: [],
    spread: false,
    waitTicks: 20,
    position: null
}
req = {body: body}
res = {}

start(req,res);
