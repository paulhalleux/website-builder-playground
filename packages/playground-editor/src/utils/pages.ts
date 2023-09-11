import { Page, Website } from "@playground/common";

export function getPageById(
  website: Website,
  pageId: string,
): Page | undefined {
  function findPageRecursive(content: Page[]): Page | undefined {
    for (const item of content) {
      if (item.id === pageId) {
        return item;
      }

      const page = findPageRecursive(item.children);
      if (page) {
        return page;
      }
    }
    return undefined;
  }

  return findPageRecursive(website.content);
}

export function addPage(
  pages: Page[],
  pageToAdd: Page,
  parentId: string | undefined,
): Page[] {
  const newPages = [...pages];

  if (!parentId) {
    newPages.push(pageToAdd);
    return newPages;
  }

  function addPageRecursive(
    content: Page[],
    id: string,
    pageToAdd: Page,
  ): boolean {
    for (const item of content) {
      if (item.id === id) {
        item.children.push(pageToAdd);
        return true;
      } else if (addPageRecursive(item.children, id, pageToAdd)) {
        return true;
      }
    }

    return false;
  }

  if (addPageRecursive(newPages, parentId, pageToAdd)) {
    return newPages;
  } else {
    throw new Error(`Parent with ID ${parentId} not found.`);
  }
}

export function deletePage(pages: Page[], pageId: string): Page[] {
  const newPages = [...pages];

  function deletePageRecursive(content: Page[], id: string): Page[] {
    return content.filter((item) => {
      if (item.id === id) {
        return false;
      }

      item.children = deletePageRecursive(item.children, id);

      return true;
    });
  }

  return deletePageRecursive(newPages, pageId);
}

export function updatePage(
  pages: Page[],
  pageId: string,
  pageToUpdate: Partial<Page>,
): Page[] {
  const newPages = [...pages];

  function updatePageRecursive(
    content: Page[],
    id: string,
    pageToUpdate: Partial<Page>,
  ): boolean {
    for (const item of content) {
      if (item.id === pageId) {
        Object.assign(item, pageToUpdate);
        return true;
      }

      if (item.id === id) {
        return false;
      } else if (updatePageRecursive(item.children, id, pageToUpdate)) {
        return true;
      }
    }

    return false;
  }

  if (updatePageRecursive(newPages, pageId, pageToUpdate)) {
    return newPages;
  } else {
    throw new Error(`Page with ID ${pageId} not found.`);
  }
}

export function createDefaultPage(): Page {
  return {
    id: crypto.randomUUID(),
    name: "New page",
    path: "/",
    title: "",
    children: [],
    layers: [],
  };
}
