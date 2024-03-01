async function killThreeSheep(bot) {
  // Equip the iron sword
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["iron_sword"].id);
  await bot.equip(sword, "hand");

  // Kill 3 sheep
  for (let i = 0; i < 3; i++) {
    await killMob(bot, "sheep", 300);
    bot.chat(`Killed ${i + 1} sheep.`);
  }
}