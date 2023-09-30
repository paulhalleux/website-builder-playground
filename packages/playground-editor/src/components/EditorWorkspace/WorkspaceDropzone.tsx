import { Layer } from "@playground/common";
import { clsx } from "clsx";

import { useWorkspaceDrop } from "./useWorkspaceDrop";

import styles from "./EditorWorkspace.module.scss";

type WorkspaceDropzoneProps = {
  empty?: boolean;
  before?: boolean;
  layer?: Layer;
};

export function WorkspaceDropzone({
  empty,
  layer,
  before,
}: WorkspaceDropzoneProps) {
  const { drop, isOver, canDrop } = useWorkspaceDrop(layer, !!before);

  return (
    <div
      ref={drop}
      className={clsx(styles.dropzone, {
        [styles["dropzone--empty"]]: empty,
        [styles["dropzone--active"]]: isOver,
        [styles["dropzone--can-drop"]]: canDrop,
      })}
    />
  );
}
