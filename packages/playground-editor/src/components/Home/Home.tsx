import { Link } from "react-router-dom";
import { Button, useStoreState, Website } from "@playground/common";

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

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.content__title}>Projects</h1>
        <div className={styles.projects}>
          {projects.map((project) => (
            <Link
              key={project.id}
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
          ))}
        </div>
        <Button onClick={onAddProject}>Add project</Button>
      </div>
    </div>
  );
}
