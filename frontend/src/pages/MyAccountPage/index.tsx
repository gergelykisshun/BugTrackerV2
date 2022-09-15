import { FC } from "react";
import { toast } from "react-toastify";
import InputField from "../../components/Inputs/TextField";
import { IUser } from "../../types/types";

type Props = {
  user: IUser;
};

const MyAccountPage: FC<Props> = ({ user }) => {
  return (
    <section>
      <div className="row mb-4">
        <h1>My Account</h1>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <div className="row mb-3">
            <InputField
              disabled
              value={user.username}
              name="username"
              changeHandler={() => {}}
            />
          </div>
          <div className="row mb-3">
            <InputField
              disabled
              value={user.role}
              name="role"
              changeHandler={() => {}}
            />
          </div>
          <div className="row mb-3">
            <InputField
              disabled
              value={user.email}
              name="email"
              changeHandler={() => {}}
            />
          </div>
          <div className="row">
            <div className="col-6 offset-6">
              <button
                className="primary-btn"
                onClick={() => toast.info("Function under construction!")}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccountPage;
