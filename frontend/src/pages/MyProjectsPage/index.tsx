import { FC, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getProjectsOfUser } from "../../api/project";
import { IProject } from "../../types/types";
import { toast } from "react-toastify";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

type Props = {};

const MyProjects: FC<Props> = () => {
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchProjectsOfUser = async () => {
    try {
      const response = await getProjectsOfUser();
      console.log("FE projects response", response);
      setProjects(response);
      setLoadingProjects(false);
    } catch (e) {
      toast.error("Could not load your projects!");
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjectsOfUser();
  }, []);

  let content;

  if (loadingProjects) {
    content = <CircularProgress />;
  } else {
    content = (
      <div className="row" style={{ gap: 10 }}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h1>My Projects</h1>
      {content}
    </section>
  );
};

export default MyProjects;
