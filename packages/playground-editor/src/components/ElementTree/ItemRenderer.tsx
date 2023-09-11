import React, { useState } from "react";
import { EditInline, Floating, Tree } from "@playground/common";
import { clsx } from "clsx";

import { ElementTreeItem } from "./ElementTree";

import styles from "./ElementTree.module.scss";

type ItemRendererProps<T> = {
  item: ElementTreeItem<T>;
  selected?: string;
  level?: number;
  contextMenu?: (item: ElementTreeItem<T>) => React.ReactNode;
  onMouseOver?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: T,
  ) => void;
  onMouseOut?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: T,
  ) => void;
};

export function ItemRenderer<T>({
  selected,
  item,
  contextMenu,
  onMouseOut,
  onMouseOver,
  ...rest
}: ItemRendererProps<T>) {
  const [editing, setEditing] = useState(false);

  return (
    <Floating closeOnContentClick content={contextMenu?.(item)}>
      <Tree.Item
        id={item.id}
        className={clsx({
          [styles.editing]: editing,
        })}
        label={
          <EditInline
            value={item.label}
            onChange={item.onChange}
            onStartEditing={() => setEditing(true)}
            onStopEditing={() => setEditing(false)}
          />
        }
        icon={item.icon}
        selected={selected === item.id}
        onMouseOut={(event) => onMouseOut?.(event, item.data)}
        onMouseOver={(event) => onMouseOver?.(event, item.data)}
        {...rest}
      >
        {item.children
          ? item.children.map((item) => (
              <ItemRenderer
                key={item.id}
                item={item}
                selected={selected}
                contextMenu={contextMenu}
                onMouseOut={onMouseOut}
                onMouseOver={onMouseOver}
              />
            ))
          : null}
      </Tree.Item>
    </Floating>
  );
}

ItemRenderer.$type = Tree.Item.$type;
