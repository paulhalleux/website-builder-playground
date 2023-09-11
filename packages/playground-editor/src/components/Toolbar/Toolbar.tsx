import { useEditor } from "../../contexts";

import styles from "./Toolbar.module.scss";

export function Toolbar() {
  const { editor, selection } = useEditor();

  return (
    <div className={styles.toolbar}>
      <div></div>
      <div className={styles.site__information}>
        <span className={styles["site-name"]}>
          {editor.value.name} {selection.selectedPageId && "/"}
        </span>
        {selection.selectedPage?.name}
      </div>
      <div></div>
    </div>
  );
}
