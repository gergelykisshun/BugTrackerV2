import { FC } from "react";
import { Link } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import "./style.scss";
import { IUser } from "../../types/types";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

type Props = {
  user: IUser;
};

const Header: FC<Props> = ({ user }) => {
  return (
    <nav className="header-container">
      <div>
        <Link className="logo-c" to="/">
          Bug-tracker
          <AdbIcon />
        </Link>
      </div>
      <div>
        {user ? (
          <Link className="nav-link" to="/my-account">
            <PermIdentityIcon /> {user.username}
          </Link>
        ) : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
