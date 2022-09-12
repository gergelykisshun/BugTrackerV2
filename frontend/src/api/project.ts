import { ICreateProjectResponse } from "../types/responses";
import { IProject } from "../types/types";
import { api } from "./init";

const projectBaseUrl = "/projects";

export const createProject = async (newProjectData: IProject) => {
  const response = await api.post(`${projectBaseUrl}`, newProjectData);
  console.log(response.data);
  return response.data as ICreateProjectResponse;
};

export const getProjectsOfUser = async () => {
  const response = await api.get(`${projectBaseUrl}`);
  console.log(response.data);
  return response.data as IProject[];
};
