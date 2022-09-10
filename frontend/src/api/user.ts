import { api } from "./init";

const userBaseUrl = "/users";

export const getMe = async () => {
  const response = await api.get(`${userBaseUrl}/me`);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get(`${userBaseUrl}`);
  console.log("get call result", response.data);
  return response.data;
};
