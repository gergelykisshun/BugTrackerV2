import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IUser } from "../../types/types";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import "./style.scss";
import LogoutDialog from "../Dialogs/LogoutDialog/LogoutDialog";

type Props = {
  user: IUser;
};

const Sidebar: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="sidebar">
      <div className="navlink-container">
        {user.role === "manager" && (
          <>
            {/* <NavLink to='/assign-roles'>Assign roles</NavLink> */}
            {/* <NavLink to='/assign-projects'>Assign projects</NavLink> */}
          </>
        )}
        <NavLink to="/overview">
          {" "}
          <GridViewIcon /> <span className="nav-title">Overview</span>
        </NavLink>
        <NavLink to="/my-projects">
          <AssignmentIcon /> <span className="nav-title">My projects</span>
        </NavLink>
        {/* <NavLink to='/my-tickets'>My tickets</NavLink> */}
        <NavLink to="/my-account">
          <PermIdentityIcon /> <span className="nav-title">My account</span>
        </NavLink>
        <div className="logout-btn" onClick={() => setIsOpen(true)}>
          <LogoutIcon /> <span className="nav-title">Logout</span>
        </div>
      </div>
      {user.role === "manager" && (
        <>
          <Link className="new-project-btn" to="/new-project">
            <AddBoxOutlinedIcon />
            <span className="nav-title">New Project</span>
          </Link>
        </>
      )}
      {isOpen && (
        <LogoutDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      )}
    </nav>
  );
};

export default Sidebar;
