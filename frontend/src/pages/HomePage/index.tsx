import { FC } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import "./style.scss";
import { Link } from "react-router-dom";

type Props = {};

const HomePage: FC<Props> = () => {
  return (
    <section className="welcome-section">
      <div className="row welcome-wrapper">
        <h1>
          Welcome to{" "}
          <span>
            Bug-tracker
            <AdbIcon />
          </span>
        </h1>
        <div className="row d-flex">
          <div className="col">
            <Link to="/login">
              <button className="primary-btn">Login</button>
            </Link>
          </div>
          <div className="col">
            <Link to="/sign-up">
              <button className="secondary-btn">Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
