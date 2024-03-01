async function craftWoodenTools(bot) {
  const oakLogCount = bot.inventory.items().reduce((acc, item) => item.name === 'oak_log' ? acc + item.count : acc, 0);
  const craftingTable = bot.inventory.items().find(item => item.name === 'crafting_table');
  if (!craftingTable) {
    bot.chat("Exploring to find a crafting table...");
    const foundCraftingTable = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const block = bot.findBlock({
        matching: mcData.blocksByName.crafting_table.id,
        maxDistance: 32
      });
      return block;
    });
    if (!foundCraftingTable) {
      bot.chat("Could not find a crafting table nearby.");
      return;
    }
  }
  if (oakLogCount < 3) {
    bot.chat("Exploring to find oak logs...");
    const oakLogs = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const log = bot.findBlock({
        matching: block => block.name.includes("_log"),
        maxDistance: 32
      });
      return log;
    });
    if (oakLogs) {
      await mineBlock(bot, oakLogs.name, 3 - oakLogCount);
      bot.chat("Mined oak logs!");
    } else {
      bot.chat("Could not find enough oak logs nearby.");
      return;
    }
  }
  await craftItem(bot, 'wooden_pickaxe', 1);
  await craftItem(bot, 'wooden_axe', 1);
  await craftItem(bot, 'wooden_shovel', 1);
  bot.chat("Crafted wooden tools!");
}