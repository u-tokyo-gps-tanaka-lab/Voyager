async function killEnderman(bot) {
  // Find the nearest Enderman
  const enderman = bot.nearestEntity(entity => {
    return entity.name === "enderman" && entity.position.distanceTo(bot.entity.position) < 32;
  });

  // Equip the iron sword
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["iron_sword"].id);
  await bot.equip(sword, "hand");

  // Attack the Enderman until it is dead
  await killMob(bot, "enderman", 300);
}