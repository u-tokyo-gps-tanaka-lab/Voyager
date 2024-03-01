async function craftIronPickaxe(bot) {
  // Check if the bot has a furnace
  let furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);

  // If the bot doesn't have a furnace, mine 8 cobblestone and craft one
  if (!furnace) {
    await mineBlock(bot, "cobblestone", 8);
    await craftItem(bot, "furnace", 1);
    furnace = bot.inventory.findInventoryItem(mcData.itemsByName["furnace"].id);
  }

  // Find a suitable position to place the furnace
  const placePositionFurnace = bot.entity.position.offset(2, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePositionFurnace);

  // Smelt the raw iron using the coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 2);

  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, mine 1 birch log and craft one
  if (!craftingTable) {
    await mineBlock(bot, "birch_log", 1);
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Find a suitable position to place the crafting table
  const placePositionCraftingTable = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePositionCraftingTable);

  // Craft an iron pickaxe from the iron ingots and sticks
  await craftItem(bot, "iron_pickaxe", 1);
}