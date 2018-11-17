import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  row: {
    height: '0px',
  },
});

const DetailDatumRow = ({ classes, children, ...extraProps }) => (
  <TableRow className={classes.row} {...extraProps}>
    {children}
  </TableRow>
);

export default withStyles(styles)(DetailDatumRow);
