async function eatCookedMutton(bot) {
  // Find the cooked mutton in the bot's inventory
  const mutton = bot.inventory.findInventoryItem(mcData.itemsByName["cooked_mutton"].id);

  // Equip the cooked mutton
  await bot.equip(mutton, "hand");

  // Consume the cooked mutton
  await bot.consume();
}