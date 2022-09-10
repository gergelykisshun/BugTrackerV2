import { call, put, takeEvery } from "redux-saga/effects";
import { getMe } from "../../../api/user";
import { IUser } from "../../../types/types";
import { fetchMeFail, fetchMeReq, fetchMeSuccess } from "./user";

// SEND DATA IN ARGUEMENTS
// export function* fetchMeSaga(action: { type: string; payload: string }) {
//   yield console.log(action.payload);
//   console.log("user saga is intergrated and works!");
// }
export function* fetchMeSaga() {
  console.log("fetch me initiated!");
  try {
    const user: IUser = yield call(getMe);
    yield put(fetchMeSuccess(user));
  } catch (e) {
    yield put(fetchMeFail());
  }
}

export function* userSaga() {
  yield takeEvery(fetchMeReq, fetchMeSaga);
}
