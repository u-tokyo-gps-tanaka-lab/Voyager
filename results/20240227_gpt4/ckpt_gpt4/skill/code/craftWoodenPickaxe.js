async function craftWoodenPickaxe(bot) {
  // Check if the bot has a birch log
  let birchLog = bot.inventory.findInventoryItem(mcData.itemsByName["birch_log"].id);

  // If the bot doesn't have a birch log, mine one
  if (!birchLog) {
    await mineBlock(bot, "birch_log", 1);
    birchLog = bot.inventory.findInventoryItem(mcData.itemsByName["birch_log"].id);
  }

  // Craft birch planks from the birch log
  await craftItem(bot, "birch_planks", 1);
  const birchPlanks = bot.inventory.findInventoryItem(mcData.itemsByName["birch_planks"].id);

  // Craft sticks from the birch planks
  await craftItem(bot, "stick", 1);
  const sticks = bot.inventory.findInventoryItem(mcData.itemsByName["stick"].id);

  // Check if the bot has a crafting table
  let craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);

  // If the bot doesn't have a crafting table, craft one
  if (!craftingTable) {
    await craftItem(bot, "crafting_table", 1);
    craftingTable = bot.inventory.findInventoryItem(mcData.itemsByName["crafting_table"].id);
  }

  // Find a suitable position to place the crafting table
  const placePosition = bot.entity.position.offset(1, -1, 0);

  // Place the crafting table
  await placeItem(bot, "crafting_table", placePosition);

  // Craft a wooden pickaxe from the birch planks and sticks
  await craftItem(bot, "wooden_pickaxe", 1);
}