import React from "react";
import { IconProps, Tree } from "@playground/common";

import { ItemRenderer } from "./ItemRenderer";

export type ElementTreeItem<T> = {
  id: string;
  label: string;
  icon?: IconProps["name"];
  onChange: (value: string) => void;
  children?: ElementTreeItem<T>[];
  data: T;
};

type ElementTreeProps<T> = {
  items: ElementTreeItem<T>[];
  onSelect?: (id: string | undefined) => void;
  selected?: string;
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

export function ElementTree<T>({
  items,
  selected,
  onSelect,
  contextMenu,
  onMouseOver,
  onMouseOut,
}: ElementTreeProps<T>) {
  return (
    <Tree onSelect={onSelect}>
      {items.map((item) => (
        <ItemRenderer
          key={item.id}
          item={item}
          selected={selected}
          contextMenu={contextMenu}
          onMouseOut={onMouseOut}
          onMouseOver={onMouseOver}
        />
      ))}
    </Tree>
  );
}
