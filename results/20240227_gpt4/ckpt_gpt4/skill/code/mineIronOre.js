async function mineIronOre(bot) {
  // Explore until find an iron ore
  const ironOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
    const ironOre = bot.findBlock({
      matching: mcData.blocksByName["iron_ore"].id,
      maxDistance: 32
    });
    return ironOre;
  });
  if (ironOre) {
    // Mine the iron ore
    await mineBlock(bot, "iron_ore", 1);
    bot.chat("Mined 1 iron ore.");
  } else {
    bot.chat("No iron ore found within the exploration range.");
  }
}