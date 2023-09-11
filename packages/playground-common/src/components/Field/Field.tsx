import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Field.module.scss";

type FieldProps = PropsWithChildren<{
  label: string;
  htmlFor: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  containerClassName?: string;
}>;

export function Field({
  orientation = "vertical",
  htmlFor,
  label,
  children,
  className,
  containerClassName,
}: FieldProps) {
  return (
    <div
      className={clsx(
        styles.field,
        styles[`field--${orientation}`],
        containerClassName,
      )}
    >
      <label className={styles.field__label} htmlFor={htmlFor}>
        {label}
      </label>
      <div className={clsx(styles.field__content, className)}>{children}</div>
    </div>
  );
}
