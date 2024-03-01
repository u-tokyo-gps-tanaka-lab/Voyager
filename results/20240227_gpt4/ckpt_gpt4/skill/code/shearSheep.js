async function shearSheep(bot) {
  // Check if the bot has shears
  let shears = bot.inventory.findInventoryItem(mcData.itemsByName["shears"].id);
  if (!shears) {
    // Check if the bot has enough iron ingots
    let iron = bot.inventory.findInventoryItem(mcData.itemsByName["iron_ingot"].id);
    if (!iron || iron.count < 2) {
      // Mine iron ore
      await mineBlock(bot, "iron_ore", 2);
      // Smelt iron ore into iron ingots
      await smeltItem(bot, "iron_ore", "coal", 2);
    }
    // Craft shears
    await craftItem(bot, "shears", 1);
    shears = bot.inventory.findInventoryItem(mcData.itemsByName["shears"].id);
  }

  // Equip the shears
  await bot.equip(shears, "hand");

  // Find a sheep
  const sheep = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const sheep = bot.nearestEntity(entity => {
      return entity.name === "sheep" && entity.position.distanceTo(bot.entity.position) < 32;
    });
    return sheep;
  });

  // Approach the sheep and shear it
  await bot.useOn(sheep);
}