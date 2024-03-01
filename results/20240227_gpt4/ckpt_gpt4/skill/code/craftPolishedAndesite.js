async function craftPolishedAndesite(bot) {
  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, mine 1 oak log and craft one
  if (!craftingTable) {
    await mineBlock(bot, "oak_log", 1);
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Craft the polished andesite
  await craftItem(bot, "polished_andesite", 1);
}