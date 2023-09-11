import { PropsWithChildren } from "react";

import styles from "../ContextMenu.module.scss";

type ContextMenuItemProps = PropsWithChildren<{
  id: string;
  onSelect?: () => void;
  disabled?: boolean;
}>;

export function ContextMenuItem({
  disabled,
  onSelect,
  children,
}: ContextMenuItemProps) {
  return (
    <button
      className={styles["context-menu__item"]}
      onClick={onSelect}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
