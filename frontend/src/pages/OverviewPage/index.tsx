import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { IProject, IUser } from "../../types/types";
import { getUsers } from "../../api/user";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import UserCard from "../../components/UserCard/UserCard";
import { getProjectsOfUser } from "../../api/project";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./style.scss";

type Props = {};

const OverviewPage = (props: Props) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);
  const [projects, setProjects] = useState<IProject[]>([]);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      setUsers(result);
      setLoadingUsers(false);
    } catch (e) {
      toast.error("Couldn't fetch users!");
      setLoadingUsers(false);
    }
  };

  const fetchProjectsOfUser = async () => {
    try {
      const response = await getProjectsOfUser();
      setProjects(response);
      setLoadingProjects(false);
    } catch (e) {
      toast.error("Could not load your projects!");
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProjectsOfUser();
  }, []);

  return (
    <section className="overview-page">
      <div className="row mb-3">
        <h1>Overview</h1>
      </div>

      <div className="row mb-3">
        <h2>Users</h2>
        {loadingUsers ? (
          <CircularProgress />
        ) : (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation
            modules={[Pagination, Navigation]}
            className="esport-swiper"
          >
            {users &&
              users.map((user) => (
                <SwiperSlide>
                  <UserCard user={user} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>

      <div className="row mb-3">
        <h2>Your Projects</h2>
        {loadingProjects ? (
          <CircularProgress />
        ) : (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop
            pagination={{
              clickable: true,
            }}
            navigation
            modules={[Pagination, Navigation]}
            className="esport-swiper"
          >
            {projects &&
              projects.map((project) => (
                <SwiperSlide>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default OverviewPage;
