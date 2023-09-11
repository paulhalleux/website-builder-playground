/**
 * Get the content of an SVG
 * @param svg SVG content
 * @returns SVG content
 */
export function getSVGContent(svg: string): string {
  const [, content] = svg.match(/<svg.*?>(.*)<\/svg>/s)!;
  return content;
}

/**
 * Get the props of the SVG
 * @param content SVG content
 * @returns Props except height and width
 */
export function getSvgProps(content: string) {
  const svg = content.match(/<svg(.+?)>(.+?)<\/svg>/s);
  if (!svg) {
    throw new Error("SVG not found");
  }

  const cleaned = svg[1]
    .replace(/[^-]height="(.+?)"/, "")
    .replace(/[^-]width="(.+?)"/, "")
    .replace(/class="(.+?)"/, "");

  return cleaned.replace(/\s+/g, " ").split(" ");
}

/**
 * Replace all the tabs and newlines by an empty string
 * @param svg SVG content
 * @returns Minified SVG
 */
export function minifySVG(svg: string): string {
  return svg.replace(/\t|\n/g, "");
}
