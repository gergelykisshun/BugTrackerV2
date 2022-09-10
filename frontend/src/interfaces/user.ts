export interface IUserLoginInputs {
  username: string;
  password: string;
}

export interface IUserSingUpInputs {
  username: string;
  password: string;
  passwordAgain: string;
  email: string;
  role: "manager" | "developer" | "";
}
