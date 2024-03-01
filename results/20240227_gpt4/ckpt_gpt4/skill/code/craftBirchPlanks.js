async function craftBirchPlanks(bot) {
  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, craft one
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Place the crafting table
  const placePosition = bot.entity.position.offset(1, 0, 0);
  await placeItem(bot, "crafting_table", placePosition);

  // Craft the birch planks
  await craftItem(bot, "birch_planks", 1);
}