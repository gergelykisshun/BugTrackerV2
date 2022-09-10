import { IRootReducer } from "../../types";

export const userErrorSelector = (state: IRootReducer): string =>
  state.userReducer.error;
export const userLoadingSelector = (state: IRootReducer): boolean =>
  state.userReducer.loading;
export const userSelector = (state: IRootReducer): any | null =>
  state.userReducer.user;
