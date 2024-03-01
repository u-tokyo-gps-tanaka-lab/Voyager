async function mineWoodLog(bot) {
  // Explore until find a wood log
  const log = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const log = bot.findBlock({
      matching: block => {
        return ["oak_log", "birch_log", "spruce_log", "jungle_log", "acacia_log", "dark_oak_log", "mangrove_log"].includes(block.name);
      },
      maxDistance: 32
    });
    return log;
  });
  if (log) {
    // Mine the wood log
    await mineBlock(bot, log.name, 1);
  } else {
    bot.chat("No wood log found within the exploration range.");
  }
}