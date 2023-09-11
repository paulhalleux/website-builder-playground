import React, { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useClickAway } from "react-use";

import styles from "./Floating.module.scss";

type FloatingProps = PropsWithChildren<{
  content: ReactNode;
  closeOnContentClick?: boolean;
}>;

export function Floating({
  content,
  children,
  closeOnContentClick,
}: FloatingProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useClickAway(contentRef, () => setVisible(false));

  const onContextMenu = (event: React.MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    event.persist();

    if (contentRef.current?.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setVisible(true);
    setPosition([x, y]);
  };

  const onContentClick = (event: React.MouseEvent) => {
    if (!closeOnContentClick) return;

    event.preventDefault();
    event.stopPropagation();

    setVisible(false);
  };

  return (
    <div
      onContextMenu={onContextMenu}
      ref={containerRef}
      className={styles.floating__wrapper}
    >
      {children}
      {visible &&
        createPortal(
          <div
            ref={contentRef}
            className={styles.content}
            onClick={onContentClick}
            style={{ top: position[1], left: position[0] }}
          >
            {content}
          </div>,
          document.getElementById("root")!,
        )}
    </div>
  );
}
