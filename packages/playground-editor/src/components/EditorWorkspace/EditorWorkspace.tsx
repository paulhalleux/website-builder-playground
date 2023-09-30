import React from "react";
import { clsx } from "clsx";

import { useEditor } from "../../contexts";
import { Toolbar } from "../Toolbar";

import { RenderElement } from "./RenderElement";
import { WorkspaceDropzone } from "./WorkspaceDropzone";

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
        {selectedPage && (
          <div
            className={clsx(styles.editor__workspace, {
              [styles["editor__workspace--empty"]]:
                selectedPage.layers.length === 0,
            })}
          >
            {selectedPage.layers.length === 0 && <WorkspaceDropzone empty />}
            {selectedPage.layers
              .sort((a, b) => a.order - b.order)
              .map((layer, index) => (
                <React.Fragment key={layer.id}>
                  {index === 0 && <WorkspaceDropzone />}
                  <RenderElement
                    layer={layer}
                    dragOver={dragOver}
                    onDragOver={setDragOver}
                  />
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
