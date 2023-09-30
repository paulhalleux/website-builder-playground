export type Layer = {
  type: string;
  order: number;
  id: string;
  name: string;
  properties: Record<string, any>;
  children: Layer[];
};

export type Page = {
  id: string;
  name: string;
  path: string;
  title: string;
  layers: Layer[];
  children: Page[];
};

export type Website = {
  id: string;
  name: string;
  content: Page[];
};
