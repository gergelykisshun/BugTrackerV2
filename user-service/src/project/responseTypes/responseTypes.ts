import { User } from 'src/user/entities/user.entity';

export interface IProjectOfUser {
  _id: string;
  title: string;
  description: string;
  owner: number | User;
  assignedTo: Array<User>;
  // TODO tickets structure
  tickets: Array<any>;
}
