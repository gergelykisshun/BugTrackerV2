import { ICreateProjectResponse } from "../types/responses";
import { IProject } from "../types/types";
import { api } from "./init";

const authBaseUrl = "/projects";

export const createProject = async (newProjectData: IProject) => {
  const response = await api.post(`${authBaseUrl}`, newProjectData);
  console.log(response.data);
  return response.data as ICreateProjectResponse;
};
