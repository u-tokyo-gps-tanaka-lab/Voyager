async function mineFiveIronOres(bot) {
  // Check if the bot has a stone pickaxe or an iron pickaxe
  let stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  let ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);

  // If the bot doesn't have a stone pickaxe or an iron pickaxe, mine 3 cobblestones and craft a stone pickaxe
  if (!stonePickaxe && !ironPickaxe) {
    await mineBlock(bot, "cobblestone", 3);
    await craftItem(bot, "stone_pickaxe", 1);
    stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
  }

  // Mine 5 iron ores
  for (let i = 0; i < 5; i++) {
    // Explore until find an iron ore
    const ironOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
      const ironOre = bot.findBlock({
        matching: mcData.blocksByName["iron_ore"].id,
        maxDistance: 32
      });
      return ironOre;
    });

    // If an iron ore is found, mine it
    if (ironOre) {
      // Equip the stone pickaxe or the iron pickaxe
      if (stonePickaxe) {
        await bot.equip(stonePickaxe, "hand");
      } else {
        await bot.equip(ironPickaxe, "hand");
      }

      // Mine the iron ore
      await mineBlock(bot, "iron_ore", 1);
      bot.chat(`Mined ${i + 1} iron ores.`);
    } else {
      bot.chat("No iron ore found within the exploration range.");
      break;
    }
  }
}