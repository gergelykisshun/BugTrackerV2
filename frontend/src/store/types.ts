import { IUserReducer } from "./reducers/user/user";

export interface IRootReducer {
  userReducer: IUserReducer;
}
