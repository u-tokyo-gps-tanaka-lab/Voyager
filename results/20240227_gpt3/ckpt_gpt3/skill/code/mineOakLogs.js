async function mineOakLogs(bot) {
  // Check if you have at least 2 oak logs
  if (bot.inventory.items().find(item => item.name === 'oak_log' && item.count >= 2)) {
    // Mine 2 oak logs
    await mineBlock(bot, 'oak_log', 2);
    bot.chat("Mined 2 oak logs!");
  } else {
    bot.chat("Exploring to find oak logs...");
    // Explore until find oak logs
    const oakLogs = await exploreUntil(bot, new Vec3(1, 0, 1), 60, () => {
      const log = bot.findBlock({
        matching: block => block.name.includes("_log"),
        maxDistance: 32
      });
      return log;
    });
    if (oakLogs) {
      // Mine the oak logs
      await mineBlock(bot, oakLogs.name, 2);
      bot.chat("Mined 2 oak logs!");
    } else {
      bot.chat("Could not find oak logs nearby.");
    }
  }
}