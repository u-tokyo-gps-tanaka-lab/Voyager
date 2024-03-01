async function killCreeperWithShield(bot) {
  // Check if there is a shield in the inventory
  const shield = bot.inventory.findInventoryItem(mcData.itemsByName["shield"].id);
  if (!shield) {
    bot.chat("I don't have a shield to block the creeper's explosion.");
    return;
  }

  // Equip the shield
  await bot.equip(shield, "off-hand");

  // Find the nearest creeper
  const creeper = bot.nearestEntity(entity => {
    return entity.name === "creeper" && entity.position.distanceTo(bot.entity.position) < 32;
  });
  if (!creeper) {
    bot.chat("There is no creeper nearby.");
    return;
  }

  // Kill the creeper
  await killMob(bot, "creeper", 300);
  bot.chat("Killed a creeper with a shield!");
}