import { useCallback, useMemo } from "react";
import { EditorPlugin, isExtensionPlugin } from "@playground/common";

import { useEditorContext } from "../contexts/editor";

export function useExtensionPlugins() {
  const { plugins } = useEditorContext();
  const extensionPlugins = useMemo(
    () => plugins.filter(isExtensionPlugin),
    [plugins],
  );

  const getPluginExtension = useCallback(
    (plugin: EditorPlugin) => {
      return extensionPlugins.find((extension) => extension.id === plugin.id);
    },
    [extensionPlugins],
  );

  return { getPluginExtension };
}
