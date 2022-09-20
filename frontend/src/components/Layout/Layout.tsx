import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/reducers/user/userSelectors";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const user = useSelector(userSelector);

  return (
    <>
      <Header user={user} />
      {user && <Sidebar user={user} />}
      <div className="app-container">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
