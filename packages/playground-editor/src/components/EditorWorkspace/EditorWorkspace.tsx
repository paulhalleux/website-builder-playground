import React from "react";

import { useEditor } from "../../contexts";
import { Toolbar } from "../Toolbar";

import { RenderElement } from "./RenderElement";

import styles from "./EditorWorkspace.module.scss";

export function EditorWorkspace() {
  const [dragOver, setDragOver] = React.useState<string>();

  const {
    selection: { selectedPage, setSelectedLayer },
  } = useEditor();

  const onWorkspaceClick = () => {
    setSelectedLayer(undefined);
  };

  return (
    <div
      className={styles.editor__workspace__container}
      onClick={onWorkspaceClick}
    >
      <Toolbar />
      <div className={styles.page__container}>
        <div className={styles.editor__workspace}>
          {selectedPage?.layers
            .sort((a, b) => a.order - b.order)
            .map((layer) => (
              <RenderElement
                key={layer.id}
                layer={layer}
                dragOver={dragOver}
                onDragOver={setDragOver}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
