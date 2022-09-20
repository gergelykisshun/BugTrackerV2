import { FC } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import "./style.scss";
import { IUser } from "../../types/types";

type Props = {
  user: IUser;
  assignToProject: (worker: IUser) => void;
};

const AssignPersonnel: FC<Props> = ({ user, assignToProject }) => {
  const clickHandler = () => {
    assignToProject(user);
  };

  return (
    <tr className={user.isSelected ? "table-active" : ""}>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <div onClick={clickHandler}>
          {user.isSelected ? (
            <IndeterminateCheckBoxOutlinedIcon className="add-person" />
          ) : (
            <AddBoxOutlinedIcon className="add-person" />
          )}
        </div>
      </td>
    </tr>
  );
};

export default AssignPersonnel;
