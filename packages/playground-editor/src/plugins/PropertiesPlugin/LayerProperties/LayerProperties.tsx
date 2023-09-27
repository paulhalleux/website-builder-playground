import { EditorPluginSectionProps } from "@playground/common";

import { useLayersActions } from "../../../hooks/useLayersActions";
import { getLayerElement } from "../../../utils/layers";
import {
  getPropertyComponent,
  getPropertyDefinition,
} from "../../../utils/properties";
import { Properties } from "../Properties";

import styles from "./LayerProperties.module.scss";

export function LayerProperties({
  editor: { selection },
}: EditorPluginSectionProps) {
  const { selectedLayer } = selection;

  const { updateLayer } = useLayersActions();

  if (!selectedLayer) {
    return null;
  }

  const selectedLayerElement = getLayerElement(selectedLayer);

  if (!selectedLayerElement) {
    return null;
  }

  return (
    <Properties className={styles.properties}>
      {Object.keys(selectedLayerElement.properties).map((key) => {
        const propertyDefinition = getPropertyDefinition(
          selectedLayerElement.properties,
          key,
        );
        const PropertyComponent = getPropertyComponent(propertyDefinition.type);

        if (!PropertyComponent) {
          return null;
        }

        return (
          <div className={styles.property} key={key}>
            <PropertyComponent
              name={key}
              value={
                (selectedLayer.properties[key] ||
                  propertyDefinition.defaultValue) as never
              }
              onChange={(value) => {
                updateLayer(selectedLayer.id, {
                  properties: {
                    ...selectedLayer.properties,
                    [key]: value,
                  },
                });
              }}
              definition={propertyDefinition as any}
            />
          </div>
        );
      })}
    </Properties>
  );
}
