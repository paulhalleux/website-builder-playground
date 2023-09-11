import { Dispatch, SetStateAction } from "react";

import { Plugin } from "./editor-plugin";
import { Layer, Page, Website } from "./website";

export type SelectionContextType = {
  selectedPageId: string | undefined;
  setSelectedPage: (pageId: string | undefined) => void;
  hoveredLayerId: string | undefined;
  setHoveredLayer: (layerId: string | undefined) => void;
  selectedLayerId: string | undefined;
  setSelectedLayer: (layerId: string | undefined) => void;
  selectedPage: Page | undefined;
  selectedLayer: Layer | undefined;
};

export type EditorContextType = {
  plugins: Plugin[];
  value: Website;
  onChange: Dispatch<SetStateAction<Website>>;
};

export type EditorType = {
  selection: SelectionContextType;
  editor: EditorContextType;
};
