import React, { SetStateAction, useCallback, useMemo } from "react";
import {
  EditorContextType,
  Plugin,
  useStoreState,
  Website,
} from "@playground/common";

import { defaultPlugins } from "../../plugins";

export const EditorContext = React.createContext<EditorContextType>(
  {} as EditorContextType,
);

export type EditorProviderProps = React.PropsWithChildren<{
  plugins?: Plugin[];
  project: string;
}>;

export function EditorProvider({
  children,
  plugins,
  project: projectId,
}: EditorProviderProps) {
  const [projects, setProjects] = useStoreState<Website[]>(
    "editor-projects",
    [],
  );

  const project = useMemo(
    () => projects.find((project) => project.id === projectId),
    [projects, projectId],
  );

  const setValue = useCallback(
    (value: SetStateAction<Website>) => {
      setProjects((projects) =>
        projects.map((project) =>
          project.id === projectId
            ? typeof value === "function"
              ? value(project)
              : value
            : project,
        ),
      );
    },
    [projectId, setProjects],
  );

  if (!project) {
    return null;
  }

  return (
    <EditorContext.Provider
      value={{
        plugins: plugins || defaultPlugins,
        value: project,
        onChange: setValue,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return React.useContext(EditorContext);
}
