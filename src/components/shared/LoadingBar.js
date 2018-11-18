import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default ({ isLoading }) => (
  <LinearProgress style={{ visibility: isLoading ? 'visible' : 'hidden' }} color="primary" />
);
