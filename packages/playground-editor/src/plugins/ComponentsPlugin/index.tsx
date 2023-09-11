import { EditorPlugin, PluginPosition } from "@playground/common";

export const ComponentsPlugin: EditorPlugin = {
  id: "components-plugin",
  extensible: true,
  position: PluginPosition.LeftSidebar,
  title: "Components",
  sections: [
    { id: "primitives", title: "Primitives", render: () => <>Primitives</> },
    { id: "components", title: "Components", render: () => <>Components</> },
  ],
};
