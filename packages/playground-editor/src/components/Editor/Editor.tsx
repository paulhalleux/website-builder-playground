import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Preview, PreviewGenerator } from "react-dnd-preview";
import { useParams } from "react-router";
import { Button, Plugin, PluginPosition } from "@playground/common";

import { Provider } from "../../contexts";
import { defaultPlugins } from "../../plugins";
import { DragItemType } from "../../types/dnd";
import { DraggableComponent } from "../DraggableComponent";
import { Header } from "../Header";
import { EditorWorkspace, PluginsSidebar } from "../";

import styles from "./Editor.module.scss";

type EditorProps = PropsWithChildren<{
  plugins?: Plugin[];
}>;

export function Editor({ plugins }: EditorProps) {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  const editorPlugins = [...defaultPlugins, ...(plugins || [])];
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider plugins={editorPlugins} project={id}>
        <section className={styles.editor__container}>
          <Header>
            <Button.Icon
              icon="play-circle"
              size="x-large"
              onClick={() => {
                window.open(`/preview/${id}`, "_blank");
              }}
            />
            <Button.Icon icon="download" size="x-large" />
            <Button>Export</Button>
          </Header>
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
