import CircularProgress from "@mui/material/CircularProgress";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProjectById } from "../../api/project";
import TicketCreateDialog from "../../components/Dialogs/TicketCreateDialog/TicketCreateDialog";
import TicketTable from "../../components/TicketTable/TicketTable";
import { TicketStatus } from "../../types/enums";
import { IProject } from "../../types/types";
import "./style.scss";

type Props = {};

const ProjectPage: FC<Props> = () => {
  const { projectId } = useParams();
  const [loadingProject, setLoadingProject] = useState<boolean>(true);
  const [project, setProject] = useState<IProject | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState<boolean>(false);

  const fetchProject = async () => {
    if (projectId) {
      try {
        const project = await getProjectById(projectId);
        setProject(project);
        setLoadingProject(false);
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
      <>
        {isCreatingTicket && (
          <TicketCreateDialog
            isOpen={isCreatingTicket}
            handleClose={() => setIsCreatingTicket(false)}
            workers={project.assignedTo.map((user) => ({
              ...user,
              isSelected: false,
            }))}
            projectId={projectId as string}
          />
        )}
        <section className="project-page-wrapper">
          <div className="row">
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </div>
          <div className="row mt-5">
            <div className="row d-flex justify-content-between">
              <h3 style={{ width: "fit-content" }}>Tickets</h3>
              <div style={{ maxWidth: 200 }}>
                <button
                  className="primary-btn"
                  onClick={() => setIsCreatingTicket(true)}
                >
                  Create new ticket
                </button>
              </div>
            </div>
            {Object.values(TicketStatus).map((status) => (
              <TicketTable
                key={status}
                status={status}
                tickets={project.tickets.filter(
                  (ticket) => ticket.status === status
                )}
              />
            ))}
          </div>
        </section>
      </>
    )
  );
};

export default ProjectPage;
