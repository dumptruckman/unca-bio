import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  noBorder: {
    border: 'none',
  },
});

const DetailDatumLabel = ({ classes, children, ...extraProps }) => (
  <TableCell className={classes.noBorder} variant="head" padding="none" {...extraProps}>
    <Typography noWrap align="right">
      {children}
    </Typography>
  </TableCell>
);

export default withStyles(styles)(DetailDatumLabel);
