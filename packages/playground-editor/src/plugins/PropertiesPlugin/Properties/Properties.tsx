import { PropsWithChildren } from "react";
import { clsx } from "clsx";

import styles from "./Properties.module.scss";

type PropertiesProps = PropsWithChildren<{
  className?: string;
}>;

export function Properties({ children, className }: PropertiesProps) {
  return <div className={clsx(styles.properties, className)}>{children}</div>;
}
