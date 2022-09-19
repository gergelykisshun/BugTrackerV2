import CircularProgress from "@mui/material/CircularProgress";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "../../api/project";
import TicketPreview from "../../components/TicketPreview/TicketPreview";
import TicketTable from "../../components/TicketTable/TicketTable";
import { TicketStatus } from "../../types/enums";
import { IProject } from "../../types/types";
import "./style.scss";

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
      <section className="project-page-wrapper">
        <div className="row">
          <h1>{project.title}</h1>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="row mt-5">
          <h3>Tickets</h3>
          {Object.values(TicketStatus).map((status) => (
            <TicketTable
              status={status}
              tickets={project.tickets.filter(
                (ticket) => ticket.status === status
              )}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default ProjectPage;
