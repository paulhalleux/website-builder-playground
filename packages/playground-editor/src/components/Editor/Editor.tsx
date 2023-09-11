import { PropsWithChildren } from "react";
import { Button, Plugin, PluginPosition } from "@playground/common";

import { Provider } from "../../contexts";
import { defaultPlugins } from "../../plugins";
import { EditorWorkspace, Logo, PluginsSidebar } from "../";

import { editorValue } from "./value";

import styles from "./Editor.module.scss";

type EditorProps = PropsWithChildren<{
  plugins?: Plugin[];
}>;

export function Editor({ plugins }: EditorProps) {
  const editorPlugins = [...defaultPlugins, ...(plugins || [])];
  return (
    <Provider plugins={editorPlugins} defaultValue={editorValue}>
      <section className={styles.editor__container}>
        <header className={styles.editor__toolbar}>
          <Logo />
          <div className={styles.editor__toolbar__actions}>
            <Button.Icon icon="play-circle" size="x-large" />
            <Button.Icon icon="download" size="x-large" />
            <Button>Export</Button>
          </div>
        </header>
        <main className={styles.editor}>
          <PluginsSidebar position={PluginPosition.LeftSidebar} />
          <EditorWorkspace />
          <PluginsSidebar position={PluginPosition.RightSidebar} />
        </main>
      </section>
    </Provider>
  );
}
