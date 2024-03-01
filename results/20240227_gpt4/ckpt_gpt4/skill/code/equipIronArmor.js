async function equipIronArmor(bot) {
  // Equip the iron chestplate
  const ironChestplate = bot.inventory.findInventoryItem(mcData.itemsByName["iron_chestplate"].id);
  await bot.equip(ironChestplate, "torso");

  // Equip the iron leggings
  const ironLeggings = bot.inventory.findInventoryItem(mcData.itemsByName["iron_leggings"].id);
  await bot.equip(ironLeggings, "legs");
}