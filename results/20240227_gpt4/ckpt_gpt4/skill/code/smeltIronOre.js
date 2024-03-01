async function smeltIronOre(bot) {
  // Mine 1 block of iron ore
  await mineBlock(bot, "iron_ore", 1);

  // Mine 1 block of coal ore
  await mineBlock(bot, "coal_ore", 1);

  // Find a suitable position to place the furnace
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the furnace
  await placeItem(bot, "furnace", placePosition);

  // Smelt the iron ore using the coal as fuel
  await smeltItem(bot, "iron_ore", "coal", 1);
}