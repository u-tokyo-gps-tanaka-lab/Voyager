async function mineCoalOre(bot) {
  // Find a coal ore block
  const coalOre = bot.findBlock({
    matching: mcData.blocksByName["coal_ore"].id,
    maxDistance: 32
  });
  if (coalOre) {
    // Equip the wooden pickaxe
    const woodenPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["wooden_pickaxe"].id);
    await bot.equip(woodenPickaxe, "hand");

    // Mine the coal ore block
    await mineBlock(bot, "coal_ore", 1);
  } else {
    bot.chat("No coal ore found within the search range.");
  }
}