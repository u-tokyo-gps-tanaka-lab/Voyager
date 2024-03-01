async function smeltRawIron(bot) {
  // Find a suitable position to place the furnace
  const placePositionFurnace = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePositionFurnace);

  // Smelt the raw iron using the coal as fuel
  await smeltItem(bot, "raw_iron", "coal", 6);
}