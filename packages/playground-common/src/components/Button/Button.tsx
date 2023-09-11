import { PropsWithChildren } from "react";
import { clsx } from "clsx";

import { ButtonGroup } from "./ButtonGroup";
import { IconButton } from "./IconButton";

import styles from "./Button.module.scss";

type ButtonProps = PropsWithChildren<{
  id?: string;
  onClick?: () => void;
  size?: "small" | "medium";
  variant?: "primary" | "secondary";
  className?: string;
  active?: boolean;
}>;

export function Button({
  id,
  children,
  size = "medium",
  onClick,
  variant = "primary",
  className,
  active,
}: ButtonProps) {
  return (
    <div
      id={id}
      className={clsx(
        styles.button,
        styles[`button--${size}`],
        styles[`button--${variant}`],
        {
          [styles["button--active"]]: active,
        },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Button.Icon = IconButton;
Button.Group = ButtonGroup;
