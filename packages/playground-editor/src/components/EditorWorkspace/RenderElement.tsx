import React from "react";
import { ContextMenu, EditInline, Floating, Layer } from "@playground/common";
import { Elements } from "@playground/elements";
import { clsx } from "clsx";

import { useEditor } from "../../contexts";
import { useLayersActions } from "../../hooks/useLayersActions";

import { useWorkspaceElementDrop } from "./useWorkspaceElementDrop";
import { WorkspaceDropzone } from "./WorkspaceDropzone";

import styles from "./EditorWorkspace.module.scss";

type RenderElementProps = {
  layer: Layer;
  parent?: Layer;
  dragOver?: string;
  onDragOver: (id?: string) => void;
};

export function RenderElement({
  layer,
  parent,
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

  const { removeLayer, updateLayer } = useLayersActions();

  const { drop, canDrop, item } = useWorkspaceElementDrop(layer);

  const element = Object.values(Elements).find(
    (value) => value.name === layer.type,
  );

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (event.ctrlKey && selectedLayerId === layer.id) {
      setSelectedLayer(undefined);
    } else if (selectedLayerId !== layer.id) {
      setSelectedLayer(layer.id);
    }
  };

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setHoveredLayer(layer.id);
  };

  const onMouseOut = () => {
    setHoveredLayer(undefined);
  };

  const onPropertyChange = (name: string, value: any) => {
    updateLayer(layer.id, {
      properties: {
        ...layer.properties,
        [name]: value,
      },
    });
  };

  const isDragOver = dragOver === layer.id;
  const selected = layer.id === selectedLayerId && !item;

  return (
    <>
      <Floating
        closeOnContentClick
        content={
          <ContextMenu>
            <ContextMenu.Item
              id="select"
              onSelect={() => setSelectedLayer(layer.id)}
            >
              Select {layer.name}
            </ContextMenu.Item>
            <ContextMenu.Item
              id="delete"
              onSelect={() => removeLayer(layer.id)}
            >
              Delete {layer.name}
            </ContextMenu.Item>
          </ContextMenu>
        }
      >
        <div
          ref={drop}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onDrop={() => onDragOver(undefined)}
          onDragEnd={() => onDragOver(undefined)}
          onDragExit={() => onDragOver(undefined)}
          onDragEnter={(event) => {
            canDrop && event.stopPropagation();
            onDragOver(layer.id);
          }}
          className={clsx(styles.editor__workspace__layer, {
            [styles.over]: isDragOver && canDrop,
            [styles.hovered]: layer.id === hoveredLayerId,
            [styles.selected]: selected,
          })}
        >
          {selected && (
            <div className={styles.editor__workspace__layer__label}>
              <EditInline
                value={layer.name}
                onChange={(value) => updateLayer(layer.id, { name: value })}
              />
            </div>
          )}
          {element ? (
            <element.component
              isEditing
              properties={layer.properties as any}
              onPropertyChange={onPropertyChange}
            >
              {element.acceptChildren !== undefined && (
                <>
                  {layer.children.length > 0 && (
                    <WorkspaceDropzone layer={layer} before />
                  )}
                  {layer.children
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
                          parent={layer}
                          layer={child}
                          dragOver={dragOver}
                          onDragOver={onDragOver}
                        />
                      );
                    })}
                </>
              )}
            </element.component>
          ) : (
            <span className={styles["not-found"]}>{layer.type} not found</span>
          )}
        </div>
      </Floating>
      <WorkspaceDropzone layer={parent} />
    </>
  );
}
