import { EditorPlugin, PluginPosition } from "@playground/common";

import { LayersSection } from "./LayersSection";
import { PagesSection } from "./PagesSection";
import { PrimitiveComponents } from "./PrimitiveComponents";

export const ContentPlugin: EditorPlugin = {
  id: "content-plugin",
  extensible: true,
  position: PluginPosition.LeftSidebar,
  title: "Content",
  sections: [
    {
      id: "pages",
      title: "Pages",
      render: PagesSection,
      titleActions: PagesSection.Actions,
    },
    { id: "layers", title: "Layers", render: LayersSection },
    { id: "elements", title: "Elements", render: PrimitiveComponents },
  ],
};
