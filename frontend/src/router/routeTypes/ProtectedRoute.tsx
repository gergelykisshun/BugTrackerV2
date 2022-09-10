import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  auth: any;
  redirect: string;
};

const ProtectedRoute: FC<Props> = ({ auth, redirect }) => {
  return auth ? <Outlet /> : <Navigate to={redirect} replace={true} />;
};

export default ProtectedRoute;
