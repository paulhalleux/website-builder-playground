import { cloneElement, PropsWithChildren } from "react";

import { Slot, SlotProvider } from "../../Slot";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

import styles from "./ButtonGroup.module.scss";

type ButtonGroupProps = PropsWithChildren<{
  selected?: string;
}>;

export function ButtonGroup({ children, selected }: ButtonGroupProps) {
  return (
    <SlotProvider element={children}>
      <div className={styles["button-group"]}>
        <Slot.Each elementType={[Button, IconButton]}>
          {(element) =>
            cloneElement(element, {
              ...element.props,
              className: styles["button-group__button"],
              active: element.props.id === selected,
            })
          }
        </Slot.Each>
      </div>
    </SlotProvider>
  );
}
