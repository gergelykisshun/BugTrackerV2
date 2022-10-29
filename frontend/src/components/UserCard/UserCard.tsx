import { Avatar } from "@mui/material";
import { FC } from "react";
import { IUser } from "../../types/types";
import { stringAvatar } from "../../utils/avatarCreators";
import "./style.scss";

type Props = {
  user: IUser;
};

const UserCard: FC<Props> = ({ user }) => {
  return (
    <div className="user-card-wrapper d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Avatar {...stringAvatar(user.username)} />
          <span>{user.username}</span>
        </div>
        <p>{user.email}</p>
        <p className="bubble-text">{user.role}</p>
      </div>
    </div>
  );
};

export default UserCard;
