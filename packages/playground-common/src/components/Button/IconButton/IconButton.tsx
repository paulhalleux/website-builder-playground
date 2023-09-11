import { clsx } from "clsx";

import { Icon, IconProps } from "../../Icons";

import styles from "./IconButton.module.scss";

type IconButtonProps = {
  id?: string;
  icon: IconProps["name"];
  size?: "small" | "medium" | "large" | "x-large";
  onClick?: () => void;
  className?: string;
  active?: boolean;
};

const IconSizeMap = {
  small: 10,
  medium: 12,
  large: 16,
  "x-large": 16,
};

export function IconButton({
  id,
  icon,
  size = "medium",
  onClick,
  className,
  active,
}: IconButtonProps) {
  return (
    <button
      id={id}
      className={clsx(
        styles["icon-button"],
        styles[`icon-button--${size}`],
        {
          [styles["icon-button--active"]]: active,
        },
        className,
      )}
      onClick={onClick}
    >
      <Icon name={icon} size={IconSizeMap[size]} />
    </button>
  );
}
