import { FC, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const MyProjects: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // fetch projects
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  let content;

  if (loading) {
    content = <CircularProgress />;
  } else {
    content = <p>My projects mapped out</p>;
  }

  return (
    <section>
      <h1>My Projects</h1>
      {content}
    </section>
  );
};

export default MyProjects;
