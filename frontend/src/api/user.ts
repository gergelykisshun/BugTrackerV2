import { IUser } from "../types/types";
import { api } from "./init";

const userBaseUrl = "/users";

export const getMe = async (): Promise<IUser> => {
  const response = await api.get(`${userBaseUrl}/me`);
  return response.data;
};

export const getUsers = async (): Promise<IUser[]> => {
  const response = await api.get(`${userBaseUrl}`);
  return response.data;
};
