import { EditorPluginSectionProps } from "@playground/common";

import { getLayerElement } from "../../../utils/layers";
import { Properties } from "../Properties";

export function LayerProperties({
  editor: { selection },
}: EditorPluginSectionProps) {
  const { selectedLayer } = selection;

  if (!selectedLayer) {
    return null;
  }

  const selectedLayerElement = getLayerElement(selectedLayer);

  if (!selectedLayerElement) {
    return null;
  }

  return <Properties>Properties</Properties>;
}
