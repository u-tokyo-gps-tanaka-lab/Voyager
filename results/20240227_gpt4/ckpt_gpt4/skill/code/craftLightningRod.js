async function craftLightningRod(bot) {
  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, check if it has a birch log
  if (!craftingTable) {
    let birchLog = bot.inventory.findInventoryItem(mcData.itemsByName["birch_log"].id);

    // If the bot doesn't have a birch log, mine one
    if (!birchLog) {
      await mineBlock(bot, "birch_log", 1);
    }

    // Craft birch planks from the birch log
    await craftItem(bot, "birch_planks", 1);

    // Craft a crafting table
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Move to the crafting table
  await bot.pathfinder.goto(new GoalGetToBlock(placePosition.x, placePosition.y, placePosition.z));

  // Craft a lightning rod from the copper ingots
  await craftItem(bot, "lightning_rod", 1);
}