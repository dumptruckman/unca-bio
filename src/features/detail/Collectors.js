import React from 'react';
import Typography from '@material-ui/core/Typography';

const Collectors = ({ classes, data: { collectors } }) => (
  <div>
    <Typography>{collectors.join('; ')}</Typography>
  </div>
);

export default Collectors;
