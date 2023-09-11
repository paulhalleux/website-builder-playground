import React from "react";
import { Layer } from "@playground/common";
import { Elements } from "@playground/elements";
import { clsx } from "clsx";

import { useEditor } from "../../contexts";

import styles from "./EditorWorkspace.module.scss";

type RenderElementProps = {
  layer: Layer;
};

export function RenderElement({ layer }: RenderElementProps) {
  const {
    selection: {
      selectedLayerId,
      setSelectedLayer,
      hoveredLayerId,
      setHoveredLayer,
    },
  } = useEditor();

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
  return (
    <div
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={clsx(styles.editor__workspace__layer, {
        [styles.selected]: selected,
        [styles.hovered]: layer.id === hoveredLayerId,
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

                return <RenderElement key={child.id} layer={child} />;
              })}
        </element.component>
      ) : (
        <span>{layer.type} not found</span>
      )}
    </div>
  );
}
