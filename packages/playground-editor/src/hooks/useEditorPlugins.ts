import {
  EditorPlugin,
  isEditorPlugin,
  PluginPosition,
} from "@playground/common";

import { useEditorContext } from "../contexts/editor";

export function useEditorPlugins(position: PluginPosition): EditorPlugin[] {
  const { plugins } = useEditorContext();
  return plugins.filter(
    (plugin) => isEditorPlugin(plugin) && plugin.position === position,
  ) as EditorPlugin[];
}
