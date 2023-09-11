import React, { PropsWithChildren, ReactNode, useState } from "react";
import { clsx } from "clsx";

import { Icon, IconProps } from "../../Icons";
import { Slot, SlotProvider } from "../../Slot";

import styles from "../Tree.module.scss";

type TreeItemProps = PropsWithChildren<{
  id: string;
  label: ReactNode;
  level?: number;
  onSelect?: (id: string | undefined) => void;
  selected?: boolean;
  icon?: IconProps["name"];
  className?: string;
  onMouseOut?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}>;

export function TreeItem({
  id,
  label,
  children,
  level = 0,
  onSelect,
  selected,
  icon,
  className,
  onMouseOut,
  onMouseOver,
}: TreeItemProps) {
  const [expanded, setExpanded] = useState(false);
  const expandable = !!children && React.Children.count(children) > 0;

  const onExpand = (event: React.MouseEvent) => {
    if (!expandable) return;

    event.stopPropagation();
    event.preventDefault();
    setExpanded((expanded) => !expanded);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSelect?.(id);
    } else if (event.key === "ArrowRight") {
      setExpanded(true);
    } else if (event.key === "ArrowLeft") {
      setExpanded(false);
    } else if (event.key === "ArrowDown") {
      const nextItem = event.currentTarget.nextElementSibling;
      if (nextItem) {
        (nextItem as HTMLElement).focus();
      }
    } else if (event.key === "ArrowUp") {
      const previousItem = event.currentTarget.previousElementSibling;
      if (previousItem) {
        (previousItem as HTMLElement).focus();
      }
    }
  };

  return (
    <SlotProvider element={children}>
      <div
        role="button"
        tabIndex={0}
        onClick={(event) =>
          onSelect?.(selected && event.ctrlKey ? undefined : id)
        }
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onKeyDown={onKeyDown}
        className={clsx(
          styles.tree__item,
          {
            [styles["tree__item--expandable"]]: expandable,
            [styles["tree__item--selected"]]: selected,
          },
          className,
        )}
        data-id={id}
        style={
          {
            "--level": level,
          } as React.CSSProperties
        }
      >
        <div className={styles.expand__container}>
          {expandable && (
            <button
              tabIndex={-1}
              className={styles.tree__item__toggle}
              onClick={onExpand}
            >
              <Icon
                name={expanded ? "chevron-down" : "chevron-right"}
                size={14}
              />
            </button>
          )}
        </div>
        <div
          role="button"
          onDoubleClick={onExpand}
          className={styles.tree__button}
        >
          {icon && (
            <div className={styles.tree__item__icon}>
              <Icon name={icon} size={14} />
            </div>
          )}
          {label}
        </div>
      </div>
      <Slot.List
        elementType={TreeItem.$type}
        condition={() => !expandable || expanded}
      >
        {(child) => {
          return (
            <div className={styles.tree__item__children}>
              {child.map((el) =>
                React.cloneElement(el, {
                  ...el.props,
                  onSelect: (id: string) =>
                    el.props.onSelect?.(id) || onSelect?.(id),
                  level: (level ?? 0) + 1,
                }),
              )}
            </div>
          );
        }}
      </Slot.List>
    </SlotProvider>
  );
}

TreeItem.$type = "TreeItem";
