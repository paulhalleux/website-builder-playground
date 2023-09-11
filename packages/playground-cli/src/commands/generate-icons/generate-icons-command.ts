/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";

import { BaseCommand } from "../../types";
import { FileUtils, logMessage, TemplateUtils } from "../../utils";

import { Messages } from "./messages";
import { getSVGContent, getSvgProps, minifySVG } from "./utils";

type GeneratePropsCommandOptions = {
  icons: string;
  output: string;
  defaultIconSize: number;
};

type ParsedIcon = {
  name: string;
  content: string;
  props: string;
};

const templates = {
  index: require("raw-loader!./templates/index.liquid").default,
  list: require("raw-loader!./templates/icon-list.liquid").default,
  icon: require("raw-loader!./templates/icon.liquid").default,
  sprite: require("raw-loader!./templates/sprite.liquid").default,
};

const handler = async (argv: GeneratePropsCommandOptions) => {
  // Clean up the output directory
  logMessage(Messages.Cleanup, { prefix: Messages.Prefix });
  await FileUtils.remove(argv.output);
  await FileUtils.mkdir(argv.output);

  // Find all the SVG files in the icons directory
  logMessage(Messages.FindIcons, { prefix: Messages.Prefix });
  const iconsFiles = await FileUtils.readGlob("**/*.svg", {
    cwd: argv.icons,
  });
  logMessage(Messages.FindIconsSuccess(iconsFiles.length), {
    prefix: Messages.Prefix,
  });

  // Generate the svg sprite
  logMessage(Messages.GenerateSprite, { prefix: Messages.Prefix });
  const icons: ParsedIcon[] = [];
  for (const icon of iconsFiles) {
    const svgContent = await FileUtils.read(path.join(argv.icons, icon));
    const props = getSvgProps(svgContent).join(" ");

    icons.push({
      name: FileUtils.withoutExtension(icon).split(/[/\\]/).pop()!,
      props,
      content: getSVGContent(svgContent),
    });
  }

  await TemplateUtils.write(
    templates.sprite,
    {
      icons,
    },
    {
      output: path.join(argv.output, "sprite.svg"),
      transform: minifySVG,
    },
  );

  // Generate icon component
  await TemplateUtils.write(
    templates.icon,
    {
      defaultIconSize: argv.defaultIconSize,
    },
    {
      output: path.join(argv.output, "Icon.tsx"),
      prettier: true,
    },
  );

  await TemplateUtils.write(
    templates.list,
    {
      icons,
    },
    {
      output: path.join(argv.output, "icon-list.ts"),
      prettier: true,
    },
  );

  await TemplateUtils.write(
    templates.index,
    {},
    {
      output: path.join(argv.output, "index.ts"),
      prettier: true,
    },
  );
};

export const GenerateIconsCommand: BaseCommand<GeneratePropsCommandOptions> = {
  trigger: "generate-icons",
  command: "generate-icons <icons> <output>",
  describe: "Generate icons components from SVG files",
  positional: {
    icons: {
      describe: "Path to the icons directory",
      type: "string",
      demandOption: true,
    },
    output: {
      describe: "Path to the output directory",
      type: "string",
      demandOption: true,
    },
  },
  options: {
    defaultIconSize: {
      describe: "Default icon size",
      type: "number",
      default: 20,
    },
  },
  handler,
};
