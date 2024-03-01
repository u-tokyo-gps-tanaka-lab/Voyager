async function craftShield(bot) {
  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Craft a shield from the oak planks and iron ingot
  await craftItem(bot, "shield", 1);
}