async function equipIronHelmet(bot) {
  const ironHelmet = bot.inventory.findInventoryItem(mcData.itemsByName["iron_helmet"].id);
  await bot.equip(ironHelmet, "head");
}