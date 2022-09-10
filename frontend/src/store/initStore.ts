import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fetchMeReq, userReducer } from "./reducers/user/user";
import { userSaga } from "./reducers/user/userSaga";

export const saga = createSagaMiddleware();

export const rootReducer = combineReducers({
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});
//the saga middleware is applied and now our catSaga starts listening for actions
saga.run(userSaga);
store.dispatch({ type: fetchMeReq.type });
