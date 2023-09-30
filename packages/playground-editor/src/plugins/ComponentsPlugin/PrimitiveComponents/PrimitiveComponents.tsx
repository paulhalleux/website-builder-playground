import { PrimitivesElements } from "@playground/elements";

import { DraggableComponent } from "../DraggableComponent";

import styles from "./PrimitiveComponents.module.scss";

export function PrimitiveComponents() {
  return (
    <div className={styles.elements}>
      {Object.values(PrimitivesElements).map((element) => {
        return <DraggableComponent key={element.name} element={element} />;
      })}
    </div>
  );
}
