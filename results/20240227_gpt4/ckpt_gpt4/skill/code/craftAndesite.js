async function craftAndesite(bot) {
  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, mine 1 birch log and craft one
  if (!craftingTable) {
    await mineBlock(bot, "birch_log", 1);
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Check if the bot has 1 diorite and 1 cobblestone
  let diorite = bot.inventory.findInventoryItem(mcData.itemsByName["diorite"].id);
  let cobblestone = bot.inventory.findInventoryItem(mcData.itemsByName["cobblestone"].id);

  // If the bot doesn't have 1 diorite, mine it
  if (!diorite) {
    await mineBlock(bot, "diorite", 1);
  }

  // If the bot doesn't have 1 cobblestone, mine it
  if (!cobblestone) {
    await mineBlock(bot, "cobblestone", 1);
  }

  // Craft the andesite
  await craftItem(bot, "andesite", 1);
}