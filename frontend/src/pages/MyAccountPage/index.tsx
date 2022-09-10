import { Grid } from "@mui/material";
import React, { FC } from "react";
import { IUser } from "../../types/types";

type Props = {
  user: IUser;
};

const MyAccountPage: FC<Props> = ({ user }) => {
  return (
    <section>
      <h1>My Account</h1>
      <Grid container>
        <Grid item>{user.username}</Grid>
        <Grid item>{user.email}</Grid>
        <Grid item>{user.role}</Grid>
      </Grid>
    </section>
  );
};

export default MyAccountPage;
