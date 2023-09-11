import { Editor } from "../../components/Editor";

export function EditorRoute() {
  return <Editor />;
}

EditorRoute.route = {
  path: "/",
  element: <EditorRoute />,
};
