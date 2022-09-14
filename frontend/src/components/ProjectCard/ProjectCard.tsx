import { FC } from "react";
import { IProject } from "../../types/types";
import "./style.scss";

type Props = {
  project: IProject;
};

const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <div className="col-md-5 project-card-container">
      <div className="row">
        <h4>{project.title}</h4>
        <h5>
          Owner of the project:{" "}
          <span>
            {typeof project.owner === "number"
              ? project.owner
              : project.owner.username}
          </span>
        </h5>
      </div>
      <div className="row">
        <p>
          Nbr of contributors: <span>{project.assignedTo.length}</span>
        </p>
      </div>
      <div className="row">
        <h5>Project description</h5>
        <p>{project.description}</p>
      </div>
      <div className="row px-5">
        <button className="primary-btn">Go to project</button>
      </div>
    </div>
  );
};

export default ProjectCard;
