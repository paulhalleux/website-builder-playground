import { PropsWithChildren, ReactNode } from "react";

import styles from "../Tabs.module.scss";

type TabProps = PropsWithChildren<{
  id: string;
  label: ReactNode;
}>;

export function Tab({ id, label }: TabProps) {
  return (
    <div data-tab-id={id} className={styles.tabs__tab_button}>
      {label}
    </div>
  );
}

Tab.$type = "Tab";
