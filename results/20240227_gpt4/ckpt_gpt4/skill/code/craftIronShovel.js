async function craftIronShovel(bot) {
  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Craft an iron shovel from the iron ingot and stick
  await craftItem(bot, "iron_shovel", 1);
}