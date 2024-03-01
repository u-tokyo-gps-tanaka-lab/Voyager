async function mineWoodLog(bot) {
  // Explore until find a wood log
  const woodLog = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
    const log = bot.findBlock({
      matching: block => {
        return block.name.includes("_log");
      },
      maxDistance: 32
    });
    return log;
  });
  if (woodLog) {
    // Mine the wood log
    await mineBlock(bot, woodLog.name, 1);
    bot.chat("Wood log mined!");
  } else {
    bot.chat("Could not find a wood log nearby.");
  }
}

// Call the main function