import { IUserSingUpInputs } from "../interfaces/user";
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

export const registerUser = async (
  registerUserDto: IUserSingUpInputs
): Promise<IUser> => {
  const response = await api.post(`${userBaseUrl}`, registerUserDto);
  return response.data;
};
