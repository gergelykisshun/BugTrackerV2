import { api } from "./init";

const authBaseUrl = "/auth";

export const loginUser = async (userData: {
  username: string;
  password: string;
}) => {
  const response = await api.post(`${authBaseUrl}/login`, userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get(`${authBaseUrl}/logout`);
  return response.data;
};
