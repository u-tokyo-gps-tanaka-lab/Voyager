async function smeltRawGold(bot) {
  // Find a suitable position to place the furnace
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePosition);

  // Smelt the raw gold using the coal as fuel
  await smeltItem(bot, "raw_gold", "coal", 1);
}