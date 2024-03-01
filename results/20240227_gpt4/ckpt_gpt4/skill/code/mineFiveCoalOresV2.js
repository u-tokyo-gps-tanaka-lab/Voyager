async function mineFiveCoalOres(bot) {
  // Check if the bot has a pickaxe
  let pickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_pickaxe"].id);
  if (!pickaxe) {
    // If not, craft a wooden pickaxe
    await craftItem(bot, "wooden_pickaxe", 1);
    pickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_pickaxe"].id);
  }

  // Equip the pickaxe
  await bot.equip(pickaxe, "hand");
  for (let i = 0; i < 5; i++) {
    // Explore until find a coal ore
    const coalOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
      const coalOre = bot.findBlock({
        matching: mcData.blocksByName["coal_ore"].id,
        maxDistance: 32
      });
      return coalOre;
    });

    // If a coal ore is found, mine it
    if (coalOre) {
      await mineBlock(bot, "coal_ore", 1);
      bot.chat(`Mined ${i + 1} coal ores.`);
    } else {
      bot.chat("No coal ore found within the exploration range.");
      break;
    }
  }
}