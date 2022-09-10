import Routing from "./router";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { userLoadingSelector } from "./store/reducers/user/userSelectors";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const loading = useSelector(userLoadingSelector);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container fixed>
      <Routing />
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
    </Container>
  );
}

export default App;
