import React from 'react';
import Grid from '@material-ui/core/Grid';

const DetailColumn = ({ children }) => (
  <Grid item sm={6} xs={12}>
    <Grid container direction="column" spacing={8}>
      {children}
    </Grid>
  </Grid>
);

export default DetailColumn;
