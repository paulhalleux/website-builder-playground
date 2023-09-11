import {
  EditorPluginSection,
  EditorType,
  PluginPosition,
  Tabs,
} from "@playground/common";
import { clsx } from "clsx";

import { useEditor } from "../../contexts";
import { useEditorPlugins } from "../../hooks/useEditorPlugins";
import { useExtensionPlugins } from "../../hooks/useExtensionPlugins";

import { SidebarPluginSection } from "./SidebarPluginSection";

import styles from "./PluginsSidebar.module.scss";

type PluginsSidebarProps = {
  position: PluginPosition;
};

export function PluginsSidebar({ position }: PluginsSidebarProps) {
  const editor = useEditor();
  const plugins = useEditorPlugins(position);
  const { getPluginExtension } = useExtensionPlugins();

  return (
    <Tabs
      className={clsx(
        styles["plugins-sidebar"],
        styles[`plugins-sidebar--${position}`],
      )}
    >
      {plugins.map((plugin) => (
        <Tabs.Tab key={plugin.id} id={plugin.id} label={plugin.title}>
          {plugin.sections.map((section) =>
            shown(section, editor) ? (
              <SidebarPluginSection key={section.id} section={section} />
            ) : null,
          )}
          {getPluginExtension(plugin)?.sections.map((section) =>
            shown(section, editor) ? (
              <SidebarPluginSection key={section.id} section={section} />
            ) : null,
          )}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
}

const shown = (section: EditorPluginSection, editor: EditorType) => {
  if (!section.condition) return true;
  return section.condition(editor);
};
