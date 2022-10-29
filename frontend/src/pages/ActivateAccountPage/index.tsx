import { CircularProgress, dialogClasses } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { activateUser } from "../../api/user";
import useQuery from "../../hooks/useQuery";

type Props = {};

const ActivateAccountPage: FC<Props> = () => {
  const query = useQuery();
  const token = query.get("token");
  const navigate = useNavigate();
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const activateUserByToken = async () => {
    if (token) {
      try {
        await activateUser(token);
        navigate("/login");
        toast.success("Registration activation succesful!");
      } catch (e) {
        setIsFailed(true);
      }
    }
  };

  useEffect(() => {
    if (isFailed) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (token && !isFailed) {
      activateUserByToken();
    }
  }, [isFailed]);

  return !isFailed ? (
    <div className="row">
      <CircularProgress />
      Activating account! Please wait...
    </div>
  ) : (
    <div className="row">Sorry! Your activation failed!</div>
  );
};

export default ActivateAccountPage;
