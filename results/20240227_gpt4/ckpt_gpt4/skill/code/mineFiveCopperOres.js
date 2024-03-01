async function mineFiveCopperOres(bot) {
  // Equip the iron pickaxe
  const ironPickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["iron_pickaxe"].id);
  await bot.equip(ironPickaxe, "hand");

  // Mine 5 copper ores
  for (let i = 0; i < 5; i++) {
    await mineBlock(bot, "copper_ore", 1);
    bot.chat(`Mined ${i + 1} copper ores.`);
  }
}