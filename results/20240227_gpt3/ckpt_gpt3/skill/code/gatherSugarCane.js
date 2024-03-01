async function gatherSugarCane(bot) {
  // Check if there is sugar cane in the inventory
  const sugarCaneInInventory = bot.inventory.items().find(item => item.name === 'sugar_cane');
  if (!sugarCaneInInventory) {
    bot.chat("Exploring to find sugar cane...");
    const sugarCane = await exploreUntil(bot, new Vec3(Math.floor(Math.random() * 3) - 1, 0, Math.floor(Math.random() * 3) - 1), 60, () => {
      const foundSugarCane = bot.findBlock({
        matching: block => block.name === 'sugar_cane',
        maxDistance: 32
      });
      return foundSugarCane;
    });
    if (!sugarCane) {
      bot.chat("Could not find sugar cane nearby.");
      return;
    }
    bot.chat("Mining sugar cane...");
    await mineBlock(bot, "sugar_cane", 3); // Gather 3 sugar cane blocks
    bot.chat("Sugar cane collected!");
  }

  // Check if there is a crafting table in the inventory
  const craftingTableInInventory = bot.inventory.items().find(item => item.name === 'crafting_table');
  if (!craftingTableInInventory) {
    bot.chat("Exploring to find a crafting table...");
    await exploreUntil(bot, new Vec3(Math.floor(Math.random() * 3) - 1, 0, Math.floor(Math.random() * 3) - 1), 60, () => {
      const block = bot.findBlock({
        matching: mcData.blocksByName.crafting_table.id,
        maxDistance: 32
      });
      return block;
    });
  }
  bot.chat("Crafting paper...");
  await craftItem(bot, 'paper', 1); // Craft paper from sugar cane
  bot.chat("Paper crafted!");
}