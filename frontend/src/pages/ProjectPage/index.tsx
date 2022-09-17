import { FC } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const ProjectPage: FC<Props> = () => {
  const { projectId } = useParams();

  return (
    <section>
      <div className="row">
        <h1>{projectId}</h1>
      </div>
    </section>
  );
};

export default ProjectPage;
