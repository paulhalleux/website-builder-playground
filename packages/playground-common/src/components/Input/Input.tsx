import React, { HTMLProps } from "react";
import clsx from "clsx";

import styles from "./Input.module.scss";

type InputProps = HTMLProps<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

export function Input({ leftIcon, className, ...rest }: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClick = () => inputRef.current?.focus();

  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.input__container,
        {
          [styles["input__container--with-icon"]]: !!leftIcon,
        },
        className,
      )}
    >
      {leftIcon && <div className={styles.input__icon}>{leftIcon}</div>}
      <input ref={inputRef} className={styles.input} {...rest} />
    </div>
  );
}
