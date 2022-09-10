import { FC } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import "./style.scss";

type Props = {};

const HomePage: FC<Props> = () => {
  return (
    <section className="welcome-section">
      <h1>
        Welcome to{" "}
        <span>
          Bug-tracker
          <AdbIcon />
        </span>
      </h1>
    </section>
  );
};

export default HomePage;
