import { EditorPlugin, PluginPosition } from "@playground/common";

import { LayerProperties } from "./LayerProperties";
import { PageProperties } from "./PageProperties";

export const PropertiesPlugin: EditorPlugin = {
  id: "properties-plugin",
  extensible: true,
  position: PluginPosition.RightSidebar,
  title: "Properties",
  sections: [
    {
      id: "page-properties",
      title: null,
      render: PageProperties,
    },
    {
      id: "layer-properties",
      title: "Layer properties",
      condition: (editor) => !!editor.selection.selectedLayer,
      render: LayerProperties,
    },
  ],
};
