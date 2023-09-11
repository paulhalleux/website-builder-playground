import { EditorPlugin, ExtensionPlugin, Plugin } from "../types";

export function isEditorPlugin(plugin: Plugin): plugin is EditorPlugin {
  return "position" in plugin;
}

export function isExtensionPlugin(plugin: Plugin): plugin is ExtensionPlugin {
  return !isEditorPlugin(plugin);
}
