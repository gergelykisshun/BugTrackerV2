import React, { FC } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyAccountPage from "../pages/MyAccountPage";
import MyProjects from "../pages/MyProjectsPage";
import NewProjectPage from "../pages/NewProjectPage";
import OverviewPage from "../pages/OverviewPage";
import ProjectPage from "../pages/ProjectPage";
import SignUpPage from "../pages/SignUpPage";
import { userSelector } from "../store/reducers/user/userSelectors";
import ProtectedRoute from "./routeTypes/ProtectedRoute";

type Props = {};

const Routing: FC<Props> = () => {
  const user = useSelector(userSelector);
  console.log("user in routing", user);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route element={<ProtectedRoute auth={user} redirect="/" />}>
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/my-account" element={<MyAccountPage user={user} />} />
            <Route path="/my-projects" element={<MyProjects />} />
            <Route
              path="/new-project"
              element={<NewProjectPage user={user} />}
            />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Route>

          <Route path="/my-tickets" element={<div>Tickets</div>} />
          {/* <Route path="/" element={<Home />} exact />
          <Route path="/assign-roles" element={<AssignRoles />} />
          <Route path="/assign-projects" element={<AssignProjects />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/my-account" element={<MyAccount />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routing;
