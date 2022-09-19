import { TicketStatus } from "./enums";

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  isSelected?: boolean;
}

export interface IProject {
  _id?: string;
  title: string;
  description: string;
  assignedTo: IUser[];
  tickets: ITicket[];
  owner: number | IUser;
}

export interface ITicket {
  _id: string;
  title: string;
  status: TicketStatus;
  owner: number | IUser;
  description: string;
  priority: string;
  assignedTo: IUser[];
  attachments?: string[];
}
