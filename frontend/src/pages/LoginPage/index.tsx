import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdbIcon from "@mui/icons-material/Adb";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { IUserLoginInputs } from "../../interfaces/user";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import InputField from "../../components/Inputs/TextField";
import { api } from "../../api/init";
import { loginUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { fetchMeSuccess } from "../../store/reducers/user/user";

type Props = {};

const LoginPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const [posting, setPosting] = useState<boolean>(false);
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<IUserLoginInputs>({
    username: "",
    password: "",
  });

  const postLoginData = async () => {
    try {
      const response = await loginUser(userInput);
      dispatch(fetchMeSuccess(response.user));
      toast.success(response.msg);
      navigate("/overview");
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    if (posting) {
      postLoginData();
      setPosting(false);
    }

    return () => {
      setPosting(false);
    };
  }, [posting]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler = () => {
    if (!userInput.username || !userInput.password) {
      return toast.error("Please fill in the required fields!");
    }
    setPosting(true);
  };

  const autoFillInput = () => {
    setUserInput((prev) => ({ ...prev, username: "hank", password: "1234" }));
  };

  return (
    <section className="login-section">
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
        <div className="login-bug-tracker">
          <h1 className="login-title">
            Bug-tracker
            <AdbIcon />
          </h1>
        </div>
        <>
          <h2>
            Login
            <Tooltip
              className="tool-tip-style"
              title="Easy-login autofill"
              arrow
            >
              <InfoIcon onClick={autoFillInput} />
            </Tooltip>
          </h2>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={userInput.username}
            onChange={inputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userInput.password}
            onChange={inputHandler}
          />
          <button onClick={loginHandler} className="primary-btn">
            Login
          </button>
          <p>
            Don't have an account yet? <Link to={"/signUp"}>Sign up now</Link>
          </p>
        </>
      </form>
    </section>
  );
};

export default LoginPage;
