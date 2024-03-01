async function craftDiamondPickaxe(bot) {
  const diamondCount = bot.inventory.items().reduce((acc, item) => item.name === 'diamond' ? acc + item.count : acc, 0);
  const stickCount = bot.inventory.items().reduce((acc, item) => item.name === 'stick' ? acc + item.count : acc, 0);
  if (diamondCount < 3 || stickCount < 2) {
    bot.chat("Gathering resources to craft a diamond pickaxe...");
    if (diamondCount < 3) {
      bot.chat("Exploring to find diamond ore...");
      const diamondOre = await exploreUntil(bot, new Vec3(Math.floor(Math.random() * 3) - 1, -1, Math.floor(Math.random() * 3) - 1), 60, () => {
        const ore = bot.findBlock({
          matching: block => block.name === 'diamond_ore',
          maxDistance: 32
        });
        return ore;
      });
      if (diamondOre) {
        await mineBlock(bot, 'diamond_ore', 1);
        bot.chat("Mined diamond ore!");
      } else {
        bot.chat("Could not find diamond ore nearby.");
        return;
      }
    }
    if (stickCount < 2) {
      bot.chat("Crafting sticks...");
      await craftItem(bot, 'stick', 2 - stickCount);
      bot.chat("Crafted sticks!");
    }
  }
  const craftingTable = bot.inventory.items().find(item => item.name === 'crafting_table');
  if (!craftingTable) {
    bot.chat("Placing a crafting table...");
    await placeItem(bot, 'crafting_table', bot.entity.position.offset(1, 0, 0));
  }
  await craftItem(bot, 'diamond_pickaxe', 1);
  bot.chat("Crafted a diamond pickaxe!");
}

// Call the function to craft a diamond pickaxe