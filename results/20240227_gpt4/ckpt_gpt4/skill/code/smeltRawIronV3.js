async function smeltRawIron(bot) {
  // Check if the bot has a furnace
  let furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If the bot doesn't have a furnace, mine 8 cobblestone and craft one
  if (!furnace) {
    await mineBlock(bot, "cobblestone", 8);
    await craftItem(bot, "furnace", 1);
    furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
  }

  // Find a suitable position to place the furnace
  const placePositionFurnace = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePositionFurnace);

  // Smelt the raw iron using the coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 5);
}