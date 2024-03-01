async function craftIronSword(bot) {
  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Craft an iron sword from the iron ingots and sticks
  await craftItem(bot, "iron_sword", 1);
}