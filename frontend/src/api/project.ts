import { ICreateProjectResponse } from "../types/responses";
import { IProject } from "../types/types";
import { api } from "./init";

const projectBaseUrl = "/projects";

export const createProject = async (newProjectData: IProject) => {
  const response = await api.post(`${projectBaseUrl}`, newProjectData);
  return response.data as ICreateProjectResponse;
};

export const getProjectsOfUser = async () => {
  const response = await api.get(`${projectBaseUrl}`);
  return response.data as IProject[];
};

export const getProjectById = async (projectId: string): Promise<IProject> => {
  const response = await api.get(`${projectBaseUrl}/${projectId}`);
  return response.data;
};
