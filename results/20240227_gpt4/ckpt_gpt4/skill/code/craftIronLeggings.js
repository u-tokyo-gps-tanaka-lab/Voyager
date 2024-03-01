async function craftIronLeggings(bot) {
  // Find a suitable position to place the furnace
  const placePositionFurnace = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePositionFurnace);

  // Smelt the raw iron using the coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 3);

  // Find a suitable position to place the crafting table
  const placePositionCraftingTable = bot.entity.position.offset(2, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePositionCraftingTable);

  // Craft an iron leggings from the iron ingots
  await craftItem(bot, "iron_leggings", 1);
}