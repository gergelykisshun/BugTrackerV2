import { FC } from "react";
import "./style.scss";

type Props = {};

const Footer: FC<Props> = () => {
  return (
    <footer className="footer-wrapper">
      <div className="row">
        <p>Reference project created by Gergely Kiss</p>
      </div>
    </footer>
  );
};

export default Footer;
