async function equipIronBoots(bot) {
  const ironBoots = bot.inventory.findInventoryItem(mcData.itemsByName["iron_boots"].id);
  await bot.equip(ironBoots, "feet");
}