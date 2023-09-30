import { clsx } from "clsx";

import { useWorkspaceDrop } from "./useWorkspaceDrop";

import styles from "./EditorWorkspace.module.scss";

export function WorkspaceDropzone() {
  const { drop, isOver, canDrop } = useWorkspaceDrop();

  return (
    <div
      ref={drop}
      className={clsx(styles.dropzone, {
        [styles["dropzone--active"]]: isOver,
        [styles["dropzone--can-drop"]]: canDrop,
      })}
    />
  );
}
