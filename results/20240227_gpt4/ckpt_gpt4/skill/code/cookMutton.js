async function cookMutton(bot) {
  // Find a suitable position to place the furnace
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePosition);

  // Smelt the mutton using the coal as fuel
  await smeltItem(bot, "mutton", "coal", 2);
}