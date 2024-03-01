async function mineDiamonds(bot) {
  const hasPickaxe = bot.inventory.items().some(item => item.name === 'iron_pickaxe' || item.name === 'diamond_pickaxe');
  if (!hasPickaxe) {
    bot.chat("Crafting an iron pickaxe...");
    const oakPlankCount = bot.inventory.items().find(item => item.name === 'oak_planks')?.count || 0;
    const stickCount = bot.inventory.items().find(item => item.name === 'stick')?.count || 0;
    if (oakPlankCount < 3 || stickCount < 2) {
      bot.chat("Gathering resources to craft an iron pickaxe...");
      if (oakPlankCount < 3) {
        await mineOakLogs(bot);
      }
      if (stickCount < 2) {
        await craftItem(bot, 'stick', 2 - stickCount);
      }
      await craftItem(bot, 'iron_pickaxe', 1);
      bot.chat("Crafted an iron pickaxe!");
    }
  }
  let diamondsMined = 0;
  while (diamondsMined < 5) {
    bot.chat(`Exploring to find diamond ore block ${diamondsMined + 1}...`);
    const diamondOre = await exploreUntil(bot, new Vec3(Math.floor(Math.random() * 3) - 1, -1, Math.floor(Math.random() * 3) - 1), 60, () => {
      const ore = bot.findBlock({
        matching: block => block.name === 'diamond_ore',
        maxDistance: 32
      });
      return ore;
    });
    if (diamondOre) {
      await mineBlock(bot, 'diamond_ore', 1);
      diamondsMined++;
      bot.chat(`Mined diamond ore block ${diamondsMined}!`);
    } else {
      bot.chat("Could not find diamond ore nearby.");
      break;
    }
  }
  bot.chat("Mined 5 diamonds!");
}