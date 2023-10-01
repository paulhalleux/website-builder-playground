import React from "react";
import { Element, ElementProps, PropertyType } from "@playground/common";
import sanitizeHtml from "sanitize-html";

import { ElementType } from "../../../types";

type TextElementProperties = {
  content: string;
  type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

type TextElementComponentProps = ElementProps<TextElementProperties>;

export function TextElementComponent({
  properties,
  isEditing,
  onPropertyChange = () => {},
}: TextElementComponentProps) {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const Element = properties.type;

  const onContentBlur = React.useCallback((event: React.FocusEvent) => {
    const sanitizeConf = {
      allowedTags: ["br"],
    };

    onPropertyChange(
      "content",
      sanitizeHtml(event.currentTarget.innerHTML, sanitizeConf),
    );
  }, []);

  return (
    <Element
      ref={elementRef}
      contentEditable={isEditing}
      onBlur={onContentBlur}
      dangerouslySetInnerHTML={{ __html: properties.content }}
    />
  );
}

export const TextElement: Element<TextElementProperties> = {
  name: ElementType.Text,
  displayName: "Text",
  target: "both",
  icon: "type",
  acceptChildren: false,
  component: TextElementComponent,
  properties: [
    {
      name: "content",
      label: "Content",
      type: PropertyType.String,
      defaultValue: "Text",
      hidden: true,
    },
    {
      name: "type",
      label: "Type",
      type: PropertyType.List,
      defaultValue: "p",
      options: [
        { label: "Paragraph", value: "p" },
        { label: "Heading 1", value: "h1" },
        { label: "Heading 2", value: "h2" },
        { label: "Heading 3", value: "h3" },
        { label: "Heading 4", value: "h4" },
        { label: "Heading 5", value: "h5" },
        { label: "Heading 6", value: "h6" },
      ],
    },
  ],
};
