import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IUserSingUpInputs } from "../../interfaces/user";
import "./style.scss";
import "../LoginPage/style.scss";
import { Container } from "@mui/material";
import { registerUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { fetchMeReq } from "../../store/reducers/user/user";

type Props = {};

const SignUpPage: FC<Props> = () => {
  const [isChoosingRole, setIsChoosingRole] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<IUserSingUpInputs>({
    username: "",
    password: "",
    passwordAgain: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleRole = () => {
    if (userInput.username.length < 4) {
      return toast.error("Your username must be at least 4 characters long!");
    }

    //EMAIL FORMAT CHECK
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(userInput.email)) {
      return toast.error("The e-mail address you entered is not valid!");
    }

    if (userInput.password.length < 4) {
      return toast.error("Your password must be at least 4 characters long!");
    }

    if (userInput.password !== userInput.passwordAgain) {
      return toast.error("Passwords you provided don't match!");
    }

    setIsChoosingRole((prev) => !prev);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpHandler = async () => {
    if (userInput.role === "") {
      return toast.error("Please select a role!");
    }

    try {
      await registerUser(userInput);
      navigate("/login", { replace: true });
      toast.success("Registration successful!");
    } catch (e) {
      navigate("/sign-up", { replace: true });
      toast.error("Registration failed!");
    }
  };

  return (
    <section className="signUp-section">
      {isChoosingRole ? (
        <div className="login-form">
          <h2>Please choose your role</h2>
          <div className="roles-container">
            <label>
              <input
                style={{ display: "none" }}
                type="radio"
                name="role"
                value={"manager"}
                onChange={inputHandler}
                checked={userInput.role === "manager"}
              />
              <button className="role-radio primary-btn">Manager</button>
            </label>
            <label>
              <input
                style={{ display: "none" }}
                type="radio"
                name="role"
                value={"developer"}
                onChange={inputHandler}
                checked={userInput.role === "developer"}
              />
              <button className="role-radio primary-btn">Developer</button>
            </label>
          </div>
          <button className="primary-btn" onClick={signUpHandler}>
            Sign up
          </button>
          <strong onClick={toggleRole} className="roles-back-btn">Back</strong>
        </div>
      ) : (
        <div className="login-form">
          <h2>Sign up</h2>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={userInput.username}
            onChange={inputHandler}
          />
          <input
            type="email"
            placeholder="E-mail address"
            name="email"
            value={userInput.email}
            onChange={inputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userInput.password}
            onChange={inputHandler}
          />
          <input
            type="password"
            placeholder="Password again"
            name="passwordAgain"
            value={userInput.passwordAgain}
            onChange={inputHandler}
          />
          <button onClick={toggleRole} className="primary-btn">
            Choose Role
          </button>
          <Link to="/login">Back to Login</Link>
        </div>
      )}
    </section>
  );
};

export default SignUpPage;
