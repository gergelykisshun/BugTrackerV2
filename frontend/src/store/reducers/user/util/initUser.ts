import { getMe } from "../../../../api/user";

export const initUser = async () => {
  try {
    return await getMe();
  } catch (e) {
    return null;
  }
};
