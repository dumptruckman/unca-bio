import React from 'react';
import Typography from '@material-ui/core/Typography';

const Attributes = ({ classes, data: { attributes } }) => (
  <div>{attributes.sex && <Typography>Sex: {attributes.sex}</Typography>}</div>
);

export default Attributes;
