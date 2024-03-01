async function craftIronTools(bot) {
  // Check if the player has at least 3 iron ingots
  const ironIngotCount = bot.inventory.items().reduce((acc, item) => item.name === 'iron_ingot' ? acc + item.count : acc, 0);
  if (ironIngotCount < 3) {
    bot.chat("Exploring to find iron ore...");
    const ironOre = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const ore = bot.findBlock({
        matching: block => block.name === 'iron_ore',
        maxDistance: 32
      });
      return ore;
    });
    if (ironOre) {
      await mineBlock(bot, 'iron_ore', 1);
      bot.chat("Mined iron ore!");
      // Check if the player has a furnace nearby
      const furnace = bot.findBlock({
        matching: mcData.blocksByName.furnace.id,
        maxDistance: 32
      });
      if (!furnace) {
        bot.chat("Exploring to find a furnace...");
        const foundFurnace = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
          const block = bot.findBlock({
            matching: mcData.blocksByName.furnace.id,
            maxDistance: 32
          });
          return block;
        });
        if (!foundFurnace) {
          bot.chat("Could not find a furnace nearby.");
          return;
        }
      }
      await smeltItem(bot, 'iron_ingot', 'oak_planks', 1);
      bot.chat("Smelted iron ingot!");
    } else {
      bot.chat("Could not find iron ore nearby.");
      return;
    }
  }

  // Check if the player has at least 5 sticks
  const stickCount = bot.inventory.items().reduce((acc, item) => item.name === 'stick' ? acc + item.count : acc, 0);
  if (stickCount < 5) {
    bot.chat("Crafting sticks...");
    await craftItem(bot, 'stick', 5 - stickCount);
    bot.chat("Crafted sticks!");
  }

  // Check if the player has a crafting table
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

  // Craft iron tools
  await craftItem(bot, 'iron_pickaxe', 1);
  await craftItem(bot, 'iron_axe', 1);
  await craftItem(bot, 'iron_shovel', 1);
  bot.chat("Crafted iron tools!");
}