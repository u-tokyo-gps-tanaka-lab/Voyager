async function mineThreeIronOres(bot) {
  for (let i = 0; i < 3; i++) {
    // Find an iron ore block
    const ironOre = bot.findBlock({
      matching: mcData.blocksByName["iron_ore"].id,
      maxDistance: 32
    });
    if (ironOre) {
      // Equip the stone pickaxe
      const stonePickaxe = bot.inventory.findInventoryItem(mcData.itemsByName["stone_pickaxe"].id);
      await bot.equip(stonePickaxe, "hand");

      // Mine the iron ore block
      await mineBlock(bot, "iron_ore", 1);
      bot.chat(`Mined ${i + 1} iron ore.`);
    } else {
      bot.chat("No iron ore found within the search range.");
      break;
    }
  }
}