import { FC } from "react";

type Props = {};

const ActivateAccountPage: FC<Props> = () => {
  return (
    <div className="row">
      <h1>Welcome to Bug-Tracker</h1>
      <p>Would you like to activate your account?</p>
      <div className="col-sm-7 d-flex gap-3">
        <div className="col-3">
          <button className="primary-btn">Yes</button>
        </div>
        <div className="col-3">
          <button className="primary-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccountPage;
