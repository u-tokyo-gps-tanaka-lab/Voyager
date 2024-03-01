async function placeChest(bot) {
  // Find a suitable position to place the chest
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the chest
  await placeItem(bot, "chest", placePosition);
}