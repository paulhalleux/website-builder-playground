import { FunctionComponent } from "react";

import { EditorType } from "./editor-context";

export enum PluginPosition {
  LeftSidebar = "left-sidebar",
  RightSidebar = "right-sidebar",
  Toolbar = "toolbar",
}

export type EditorPluginSectionProps = {
  editor: EditorType;
};

export type EditorPluginSection = {
  id: string;
  title: string | ((editor: EditorType) => string) | null;
  render: FunctionComponent<EditorPluginSectionProps>;
  titleActions?: FunctionComponent<EditorPluginSectionProps>;
  condition?: (editor: EditorType) => boolean;
};

export type EditorPlugin = {
  id: string;
  title: string;
  sections: EditorPluginSection[];
  position: PluginPosition;
  extensible?: boolean;
};

export type ExtensionPlugin = {
  id: string;
  sections: EditorPluginSection[];
};

export type Plugin = EditorPlugin | ExtensionPlugin;
