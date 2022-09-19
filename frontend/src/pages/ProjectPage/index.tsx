import CircularProgress from "@mui/material/CircularProgress";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "../../api/project";
import { IProject } from "../../types/types";

type Props = {};

const ProjectPage: FC<Props> = () => {
  const { projectId } = useParams();
  const [loadingProject, setLoadingProject] = useState<boolean>(true);
  const [project, setProject] = useState<IProject | null>(null);

  const fetchProject = async () => {
    if (projectId) {
      try {
        const project = await getProjectById(projectId);
        setProject(project);
        setLoadingProject(false);
        console.log(project);
      } catch (e) {
        setProject(null);
        setLoadingProject(false);
        toast.error("Loading project failed!");
      }
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loadingProject) {
    return <CircularProgress />;
  }

  return (
    project && (
      <section>
        <div className="row">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <div className="row mt-5">
          <h3>Tickets</h3>
        </div>
      </section>
    )
  );
};

export default ProjectPage;
