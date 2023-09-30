import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";

import styles from "./Header.module.scss";

type HeaderProps = PropsWithChildren;

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>
      <div className={styles.header__actions}>{children}</div>
    </header>
  );
}
