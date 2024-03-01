async function craftStonePickaxe(bot) {
  // Mine 3 stone blocks
  await mineBlock(bot, "stone", 3);

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

  // Craft a stone pickaxe from the stone blocks and sticks
  await craftItem(bot, "stone_pickaxe", 1);
}