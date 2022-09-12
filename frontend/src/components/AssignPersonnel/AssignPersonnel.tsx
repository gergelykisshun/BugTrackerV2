import { FC, MouseEventHandler, useState } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import "./style.scss";
import { IUser } from "../../types/types";

type Props = {
  user: IUser;
  assignToProject: (worker: IUser) => void;
};

const AssignPersonnel: FC<Props> = ({ user, assignToProject }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const clickHandler = () => {
    assignToProject(user);
    setIsSelected((prev) => !prev);
  };

  return (
    <tr className={isSelected ? "table-active" : ""}>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <div onClick={clickHandler}>
          {isSelected ? (
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
