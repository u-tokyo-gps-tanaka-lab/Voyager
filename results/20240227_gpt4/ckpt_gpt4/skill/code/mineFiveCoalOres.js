async function mineFiveCoalOres(bot) {
  for (let i = 0; i < 5; i++) {
    // Explore until find a coal ore
    const coalOre = await exploreUntil(bot, new Vec3(0, -1, 0), 60, () => {
      const coalOre = bot.findBlock({
        matching: mcData.blocksByName["coal_ore"].id,
        maxDistance: 32
      });
      return coalOre;
    });
    if (coalOre) {
      // Mine the coal ore
      await mineBlock(bot, "coal_ore", 1);
      bot.chat(`Mined ${i + 1} coal ores.`);
    } else {
      bot.chat("No coal ore found within the exploration range.");
      break;
    }
  }
}