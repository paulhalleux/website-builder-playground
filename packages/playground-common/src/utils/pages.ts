import { Layer } from "../../dist";

export function findLayer(
  layers: Layer[],
  condition: (layer: Layer) => boolean,
): Layer | null {
  function findLayerRecursive(content: Layer[]): Layer | null {
    for (const item of content) {
      if (condition(item)) {
        return item;
      }

      const layer = findLayerRecursive(item.children);
      if (layer) {
        return layer;
      }
    }
    return null;
  }

  return findLayerRecursive(layers);
}
