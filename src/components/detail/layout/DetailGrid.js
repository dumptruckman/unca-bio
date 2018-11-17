import React from 'react';
import Grid from '@material-ui/core/Grid';

const DetailGrid = ({ children }) => (
  <Grid container spacing={8}>
    {children}
  </Grid>
);

export default DetailGrid;
