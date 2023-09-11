#!/usr/bin/env node

import { GenerateIconsCommand } from "./commands";
import { YargsCommandManager } from "./manager";

(async () => {
  const manager = new YargsCommandManager("playground");
  manager.register(GenerateIconsCommand);
  await manager.run();
})();
