import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React from "react";

type Props = {};

const paperSx = { minHeight: 200 };

const OverviewPage = (props: Props) => {
  return (
    <>
      <h1>Overview</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper variant="outlined" elevation={3}>
            xs=8
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" elevation={3}>
            xs=4
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" elevation={3}>
            xs=4
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" elevation={3}>
            xs=8
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewPage;
