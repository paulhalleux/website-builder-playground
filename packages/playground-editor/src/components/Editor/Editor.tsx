import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Preview, PreviewGenerator } from "react-dnd-preview";
import { Button, Plugin, PluginPosition } from "@playground/common";

import { Provider } from "../../contexts";
import { defaultPlugins } from "../../plugins";
import { DraggableComponent } from "../../plugins/ComponentsPlugin/DraggableComponent";
import { DragItemType } from "../../types/dnd";
import { EditorWorkspace, Logo, PluginsSidebar } from "../";

import { editorValue } from "./value";

import styles from "./Editor.module.scss";

type EditorProps = PropsWithChildren<{
  plugins?: Plugin[];
}>;

export function Editor({ plugins }: EditorProps) {
  const editorPlugins = [...defaultPlugins, ...(plugins || [])];
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider plugins={editorPlugins} defaultValue={editorValue}>
        <section className={styles.editor__container}>
          <header className={styles.editor__toolbar}>
            <Logo />
            <div className={styles.editor__toolbar__actions}>
              <Button.Icon
                icon="play-circle"
                size="x-large"
                onClick={() => {
                  window.open("/preview", "_blank");
                }}
              />
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
      <Preview generator={generatePreview} />
    </DndProvider>
  );
}

const PreviewMap = {
  [DragItemType.Component]: DraggableComponent.Preview,
};

const generatePreview: PreviewGenerator<any> = (props) => {
  const PreviewComponent =
    PreviewMap[props.itemType as keyof typeof PreviewMap];
  if (!PreviewComponent) return <></>;
  return <PreviewComponent state={props} />;
};
