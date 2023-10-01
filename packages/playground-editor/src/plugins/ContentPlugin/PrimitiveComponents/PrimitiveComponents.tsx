import { EditorPluginSectionProps } from "@playground/common";
import { PrimitivesElements } from "@playground/elements";

import { DraggableComponent } from "../../../components/DraggableComponent";

import styles from "./PrimitiveComponents.module.scss";

export function PrimitiveComponents({ editor }: EditorPluginSectionProps) {
  return (
    <div className={styles.elements}>
      {Object.values(PrimitivesElements)
        .filter(
          (value) =>
            !value.applicable ||
            !editor.selection.selectedPage ||
            value.applicable(editor.selection.selectedPage),
        )
        .map((element) => {
          return (
            <DraggableComponent key={element.name} element={element as any} />
          );
        })}
    </div>
  );
}
