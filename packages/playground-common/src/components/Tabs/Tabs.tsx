import { PropsWithChildren, useState } from "react";
import { clsx } from "clsx";

import { getFirstChildren } from "../../utils/children";
import { Slot, SlotProvider } from "../Slot";

import { Tab } from "./Tab";

import styles from "./Tabs.module.scss";

type TabsProps = PropsWithChildren<{
  selected?: string;
  defaultSelected?: string;
  onSelect?: (id: string) => void;
  className?: string;
}>;

export function Tabs({
  children,
  selected,
  className,
  defaultSelected,
  onSelect,
}: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(
    selected || defaultSelected || getFirstChildren(children)?.props.id,
  );
  const actualSelected = selected || selectedTab;

  const onButtonClick = (id: string) => {
    onSelect?.(id);
    setSelectedTab(id);
  };

  return (
    <SlotProvider element={children}>
      <div className={clsx(styles.tabs__container, className)}>
        <ul className={clsx(styles.tabs__list)}>
          <Slot.Each elementType={Tab}>
            {(element) => (
              <li key={element.props.id} className={styles.tabs__item}>
                <button
                  onClick={() => onButtonClick(element.props.id)}
                  className={clsx(styles.tabs__button, {
                    [styles["tabs__button--selected"]]:
                      element.props.id === actualSelected,
                  })}
                >
                  {element.props.label}
                </button>
              </li>
            )}
          </Slot.Each>
        </ul>
        <Slot
          elementType={Tab}
          condition={(el) => el.props.id === actualSelected}
        >
          {(element) => (
            <div className={styles.tabs__content}>{element.props.children}</div>
          )}
        </Slot>
      </div>
    </SlotProvider>
  );
}

Tabs.Tab = Tab;
