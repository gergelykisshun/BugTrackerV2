import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const ErrorPage: FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <h1>Page not found</h1>
      <div className="col-sm-4">
        <button onClick={() => navigate("/")} className="primary-btn">
          Back to home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
