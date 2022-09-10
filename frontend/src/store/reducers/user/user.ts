import { AnyAction, createAction, createReducer } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { IUser } from "../../../types/types";

export interface IUserReducer {
  user: any | null;
  loading: boolean;
  error: string;
}

export const initialUserState: IUserReducer = {
  user: null,
  loading: true,
  error: "",
};

export const fetchMeReq = createAction("FETCH_ME_REQUEST");

export const fetchMeSuccess = createAction<IUser>("FETCH_ME_SUCCESS");

export const logoutUserAction = createAction("LOGOUT_USER_ACTION");

export const fetchMeFail = createAction("FETCH_ME_FAIL");

export const userSagaTest = createAction("USER_SAGA_TESTING");

export const userReducer: Reducer<IUserReducer, AnyAction> = createReducer(
  initialUserState,
  (builder) => {
    builder.addCase(userSagaTest, (state, action) => {
      console.log("reducer actions working");
    });
    builder.addCase(fetchMeSuccess, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMeFail, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutUserAction, (state, action) => {
      state.user = null;
    });
  }
);
