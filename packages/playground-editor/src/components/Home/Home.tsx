import { Link } from "react-router-dom";
import {
  Button,
  ContextMenu,
  Floating,
  useStoreState,
  Website,
} from "@playground/common";

import { Header } from "../Header";

import styles from "./Home.module.scss";

export function Home() {
  const [projects, setProjects] = useStoreState<Website[]>(
    "editor-projects",
    [],
  );

  const onAddProject = () => {
    setProjects((projects) => [
      ...projects,
      {
        id: crypto.randomUUID(),
        name: "New project",
        content: [],
      },
    ]);
  };

  const onDeleteProject = (id: string) => {
    setProjects((projects) => projects.filter((project) => project.id !== id));
  };

  return (
    <div className={styles.home}>
      <Header>
        <Button onClick={onAddProject}>Add project</Button>
      </Header>
      <div className={styles.content}>
        <h1 className={styles.content__title}>Projects</h1>
        <div className={styles.projects}>
          {projects.map((project) => (
            <Floating
              closeOnContentClick
              key={project.id}
              content={
                <ContextMenu>
                  <ContextMenu.Item
                    id="delete"
                    onSelect={() => onDeleteProject(project.id)}
                  >
                    Delete
                  </ContextMenu.Item>
                  <ContextMenu.Item id="edit" onSelect={() => {}}>
                    Edit
                  </ContextMenu.Item>
                </ContextMenu>
              }
            >
              <Link
                to={`/workspace/${project.id}`}
                className={styles.project__link}
              >
                <article className={styles.project}>
                  <div className={styles.project__image} />
                  <section>
                    <h4 className={styles.project__name}>{project.name}</h4>
                  </section>
                </article>
              </Link>
            </Floating>
          ))}
        </div>
      </div>
    </div>
  );
}
