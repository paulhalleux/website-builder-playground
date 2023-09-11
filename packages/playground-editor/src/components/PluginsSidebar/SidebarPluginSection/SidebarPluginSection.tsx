import { EditorPluginSection } from "@playground/common";
import { clsx } from "clsx";

import { useEditor } from "../../../contexts";

import styles from "./SidebarPluginSection.module.scss";

type PluginSectionProps = {
  section: EditorPluginSection;
};

export function SidebarPluginSection({ section }: PluginSectionProps) {
  const editor = useEditor();

  return (
    <div
      className={clsx(styles["plugin-section"], {
        [styles["plugin-section--has-title"]]: !!section.title,
      })}
    >
      {section.title !== null && (
        <h3
          className={clsx(styles["plugin-section__title"], {
            [styles["plugin-section__title--has-actions"]]:
              !!section.titleActions,
          })}
        >
          {typeof section.title === "function"
            ? section.title(editor)
            : section.title}
          {section.titleActions?.({ editor })}
        </h3>
      )}
      <div className={styles.content}>{section.render({ editor })}</div>
    </div>
  );
}
