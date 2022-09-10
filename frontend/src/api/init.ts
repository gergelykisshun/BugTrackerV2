import axios from "axios";

const apiParams = {
  baseURL: "http://localhost:8000/api/v1",
  timeout: 20000,
  withCredentials: true,
};
export const api = axios.create(apiParams);
