async function killCreeper(bot) {
  // Check if there is an iron sword in the inventory
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["iron_sword"].id);
  if (!sword) {
    bot.chat("I don't have an iron sword to kill the creeper.");
    return;
  }

  // Equip the iron sword
  await bot.equip(sword, "hand");

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
  bot.chat("Killed a creeper!");
}