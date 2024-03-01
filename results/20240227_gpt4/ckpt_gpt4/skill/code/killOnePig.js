async function killOnePig(bot) {
  // Equip the iron sword
  const sword = bot.inventory.findInventoryItem(mcData.itemsByName["iron_sword"].id);
  await bot.equip(sword, "hand");

  // Kill the pig
  await killMob(bot, "pig", 300);
}