import React, { PropsWithChildren } from "react";

import { Slot, SlotProvider } from "../Slot";

import { ContextMenuItem } from "./ContextMenuItem";

import styles from "./ContextMenu.module.scss";

type ContextMenuProps = PropsWithChildren<{
  onItemSelect?: (id: string) => void;
}>;

export function ContextMenu({ children, onItemSelect }: ContextMenuProps) {
  return (
    <SlotProvider element={children}>
      <div className={styles["context-menu"]}>
        <Slot.Each elementType={ContextMenuItem}>
          {(item) =>
            React.cloneElement(item, {
              ...item.props,
              onSelect:
                item.props.onSelect || (() => onItemSelect?.(item.props.id)),
            })
          }
        </Slot.Each>
      </div>
    </SlotProvider>
  );
}

ContextMenu.Item = ContextMenuItem;
