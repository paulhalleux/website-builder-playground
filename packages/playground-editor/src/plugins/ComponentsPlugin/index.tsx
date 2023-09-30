import { EditorPlugin, PluginPosition } from "@playground/common";

import { PrimitiveComponents } from "./PrimitiveComponents";

export const ComponentsPlugin: EditorPlugin = {
  id: "components-plugin",
  extensible: true,
  position: PluginPosition.LeftSidebar,
  title: "Components",
  sections: [
    { id: "primitives", title: "Primitives", render: PrimitiveComponents },
    { id: "components", title: "Components", render: () => <>Components</> },
  ],
};
