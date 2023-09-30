import React from "react";
import { Layer } from "@playground/common";
import { Elements } from "@playground/elements";
import { clsx } from "clsx";

import { useEditor } from "../../contexts";

import { useWorkspaceElementDrop } from "./useWorkspaceElementDrop";
import { WorkspaceDropzone } from "./WorkspaceDropzone";

import styles from "./EditorWorkspace.module.scss";

type RenderElementProps = {
  layer: Layer;
  dragOver?: string;
  onDragOver: (id?: string) => void;
};

export function RenderElement({
  layer,
  dragOver,
  onDragOver,
}: RenderElementProps) {
  const {
    selection: {
      selectedLayerId,
      setSelectedLayer,
      hoveredLayerId,
      setHoveredLayer,
    },
  } = useEditor();

  const { drop, canDrop } = useWorkspaceElementDrop(layer);

  const element = Object.values(Elements).find(
    (value) => value.name === layer.type,
  );

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setSelectedLayer(layer.id);
  };

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setHoveredLayer(layer.id);
  };

  const onMouseOut = () => {
    setHoveredLayer(undefined);
  };

  const selected = layer.id === selectedLayerId;
  const isDragOver = dragOver === layer.id;

  return (
    <>
      <div
        ref={drop}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onDragEnter={(event) => {
          event.stopPropagation();
          onDragOver(layer.id);
        }}
        onDragExit={() => onDragOver(undefined)}
        className={clsx(styles.editor__workspace__layer, {
          [styles.selected]: selected && !isDragOver,
          [styles.hovered]: layer.id === hoveredLayerId,
          [styles.over]: isDragOver && canDrop,
        })}
      >
        {selected && (
          <div className={styles.editor__workspace__layer__label}>
            {layer.name}
          </div>
        )}
        {element ? (
          <element.component properties={layer.properties as any}>
            {element.acceptChildren !== undefined &&
              layer.children
                .sort((a, b) => a.order - b.order)
                .map((child) => {
                  if (
                    typeof element.acceptChildren !== "boolean" &&
                    !element.acceptChildren.includes(child.type)
                  )
                    return null;

                  return (
                    <RenderElement
                      key={child.id}
                      layer={child}
                      dragOver={dragOver}
                      onDragOver={onDragOver}
                    />
                  );
                })}
          </element.component>
        ) : (
          <span>{layer.type} not found</span>
        )}
      </div>
      <WorkspaceDropzone />
    </>
  );
}
