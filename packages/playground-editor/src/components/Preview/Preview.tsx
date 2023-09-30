import { Layer, Page } from "@playground/common";

import { getLayerElement } from "../../utils/layers";

import styles from "./Preview.module.scss";

type PreviewProps = {
  page: Page;
};

export function Preview({ page }: PreviewProps) {
  return (
    <div className={styles["Preview"]}>
      {page.layers.map((layer) => (
        <RenderElement key={layer.id} layer={layer} />
      ))}
    </div>
  );
}

function RenderElement({ layer }: { layer: Layer }) {
  const element = getLayerElement(layer);
  if (!element) return null;
  return (
    <element.component
      isEditing={false}
      key={layer.id}
      properties={layer.properties as any}
    >
      {layer.children
        .sort((a, b) => a.order - b.order)
        .map((child) => (
          <RenderElement key={child.id} layer={child} />
        ))}
    </element.component>
  );
}
