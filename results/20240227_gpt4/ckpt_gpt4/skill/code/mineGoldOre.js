async function mineGoldOre(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Explore until find a gold ore
  const goldOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const goldOre = bot.findBlock({
      matching: mcData.blocksByName["gold_ore"].id,
      maxDistance: 32
    });
    return goldOre;
  });

  // If a gold ore is found, mine it
  if (goldOre) {
    await mineBlock(bot, "gold_ore", 1);
    bot.chat("Mined 1 gold ore.");
  } else {
    bot.chat("No gold ore found within the exploration range.");
  }
}