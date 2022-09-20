import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../../../api/auth";
import { api } from "../../../api/init";
import {
  fetchMeSuccess,
  logoutUserAction,
} from "../../../store/reducers/user/user";
import "./style.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const LogoutDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <div className="logout-dialog-container">
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <div className="logout-btn-container mb-3 px-3">
          <div className="col">
            <button className="secondary-btn" onClick={handleClose}>
              Cancel
            </button>
          </div>
          <div className="col">
            <button
              className="primary-btn"
              onClick={async () => {
                handleClose();
                try {
                  await logoutUser();
                  dispatch(logoutUserAction());
                  navigate("/");
                } catch (e) {
                  toast.error("Logout failed!");
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LogoutDialog;
