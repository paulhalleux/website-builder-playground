import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-icons] "),
  Cleanup: chalk.yellow("Cleaning up the output directory..."),
  FindIcons: chalk.yellow("Finding all the SVG files..."),
  FindIconsSuccess: (count: number) => chalk.green(`Found ${chalk.gray(count)} SVG files`),
  GenerateSprite: chalk.yellow("Generating sprite..."),
};
