import { ITicket } from "../types/types";
import { api } from "./init";

export const assignTicketToProject = async (
  projectId: string,
  newTicket: ITicket
) => {
  const response = await api.post(
    `/projects/new-ticket/${projectId}`,
    newTicket
  );
  return response.status;
};
