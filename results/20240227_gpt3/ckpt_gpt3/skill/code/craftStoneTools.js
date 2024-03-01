async function craftStoneTools(bot) {
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
  const oakPlankCount = bot.inventory.items().reduce((acc, item) => item.name === 'oak_planks' ? acc + item.count : acc, 0);
  if (oakPlankCount < 2) {
    bot.chat("Exploring to find oak logs...");
    const oakLogs = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const log = bot.findBlock({
        matching: block => block.name.includes("_log"),
        maxDistance: 32
      });
      return log;
    });
    if (oakLogs) {
      await mineBlock(bot, oakLogs.name, 2 - oakPlankCount);
      bot.chat("Mined oak logs!");
      await craftItem(bot, 'oak_planks', 2 - oakPlankCount);
      bot.chat("Crafted oak planks!");
    } else {
      bot.chat("Could not find enough oak logs nearby.");
      return;
    }
  }
  const stoneCount = bot.inventory.items().reduce((acc, item) => item.name === 'stone' ? acc + item.count : acc, 0);
  if (stoneCount < 3) {
    bot.chat("Exploring to find stone...");
    const stone = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const block = bot.findBlock({
        matching: block => block.name === 'stone',
        maxDistance: 32
      });
      return block;
    });
    if (stone) {
      await mineBlock(bot, 'stone', 3 - stoneCount);
      bot.chat("Mined stone!");
    } else {
      bot.chat("Could not find enough stone nearby.");
      return;
    }
  }
  const sticksCount = bot.inventory.items().reduce((acc, item) => item.name === 'stick' ? acc + item.count : acc, 0);
  if (sticksCount < 3) {
    bot.chat("Crafting sticks...");
    await craftItem(bot, 'stick', 3 - sticksCount);
    bot.chat("Crafted sticks!");
  }
  await placeItem(bot, 'crafting_table', bot.entity.position.offset(1, 0, 0));
  await craftItem(bot, 'stone_pickaxe', 1);
  await craftItem(bot, 'stone_axe', 1);
  await craftItem(bot, 'stone_shovel', 1);
  bot.chat("Crafted stone tools!");
}