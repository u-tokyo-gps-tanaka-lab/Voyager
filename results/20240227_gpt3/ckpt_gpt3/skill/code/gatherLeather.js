async function gatherLeather(bot) {
  // Check if there are cows nearby
  let cow = bot.nearestEntity(entity => entity.name === 'cow' && entity.position.distanceTo(bot.entity.position) < 32);
  if (!cow) {
    bot.chat("Exploring to find a cow...");
    cow = await exploreUntil(bot, new Vec3(Math.floor(Math.random() * 3) - 1, 0, Math.floor(Math.random() * 3) - 1), 60, () => {
      const foundCow = bot.nearestEntity(entity => entity.name === 'cow' && entity.position.distanceTo(bot.entity.position) < 32);
      return foundCow;
    });
  }
  if (cow) {
    bot.chat("Killing the cow to gather leather...");
    await killMob(bot, 'cow', 300);
    bot.chat("Leather gathered!");
  } else {
    bot.chat("Could not find a cow nearby.");
  }
}

// Call the main function