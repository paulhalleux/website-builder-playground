import React, { PropsWithChildren } from "react";

import { Slot, SlotProvider } from "../Slot";

import { TreeItem } from "./TreeItem";

import styles from "./Tree.module.scss";

type TreeProps = PropsWithChildren<{
  onSelect?: (id: string | undefined) => void;
  selected?: string;
}>;

export function Tree({ children, onSelect, selected }: TreeProps) {
  return (
    <SlotProvider element={children}>
      <div className={styles.tree}>
        <Slot.Each elementType={TreeItem.$type}>
          {(element) =>
            React.cloneElement(element, {
              ...element.props,
              onSelect: (id: string) =>
                element.props.onSelect?.(id) || onSelect?.(id),
              selected: element.props.selected || element.props.id === selected,
            })
          }
        </Slot.Each>
      </div>
    </SlotProvider>
  );
}

Tree.Item = TreeItem;
