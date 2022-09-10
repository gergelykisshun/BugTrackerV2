import { FC } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import "./style.scss";
import { IUser } from "../../types/types";

type Props = {
  user: IUser;
};

const AssignPersonnel: FC<Props> = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.role}</td>
      <td>
        <AddBoxOutlinedIcon />
      </td>
    </tr>
  );
};

export default AssignPersonnel;
