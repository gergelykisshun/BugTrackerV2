import { FC } from "react";
import { Card } from "react-bootstrap";
import { IProject } from "../../types/types";

type Props = {
  project: IProject;
};

const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{`Owner of the project ${project.owner}`}</Card.Subtitle>
        <Card.Text>{project.description}</Card.Text>
        <Card.Link href="#">Go to project</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
