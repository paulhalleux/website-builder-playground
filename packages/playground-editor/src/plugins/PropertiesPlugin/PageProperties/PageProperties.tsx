import { EditorPluginSectionProps, Field, Input } from "@playground/common";

import { usePagesActions } from "../../../hooks/usePagesActions";
import { Properties } from "../Properties";

import styles from "./PageProperties.module.scss";

export function PageProperties({
  editor: { selection },
}: EditorPluginSectionProps) {
  const { selectedPage } = selection;

  const { updatePage } = usePagesActions();

  if (!selectedPage) return null;

  return (
    <Properties className={styles.properties}>
      <Field label="Name" htmlFor="page-name" orientation="horizontal">
        <Input
          id="page-name"
          value={selectedPage.name}
          placeholder="Page name"
          onChange={(e) =>
            updatePage(selectedPage.id, {
              name: e.currentTarget.value,
            })
          }
        />
      </Field>
      <Field label="Path" htmlFor="page-path" orientation="horizontal">
        <Input
          id="page-path"
          value={selectedPage.path}
          placeholder="Page path"
          onChange={(e) =>
            updatePage(selectedPage.id, {
              path: e.currentTarget.value,
            })
          }
        />
      </Field>
      <Field label="Title" htmlFor="page-title" orientation="horizontal">
        <Input
          id="page-title"
          value={selectedPage.title}
          placeholder="Page title"
          onChange={(e) =>
            updatePage(selectedPage.id, {
              title: e.currentTarget.value,
            })
          }
        />
      </Field>
    </Properties>
  );
}
