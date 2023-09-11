import { PropsWithChildren } from "react";

import styles from "./Properties.module.scss";

type PropertiesProps = PropsWithChildren;

export function Properties({ children }: PropertiesProps) {
  return <div className={styles.properties}>{children}</div>;
}
