export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  isSelected?: boolean;
}

export interface IProject {
  title: string;
  description: string;
  assignedTo: IUser[];
  tickets: string[];
}

export interface ITicket {
  title: string;
  description: string;
  priority: string;
  assignedTo: IUser[];
  // downloadUrl array
  attachment: string[];
}
