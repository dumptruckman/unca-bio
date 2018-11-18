import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => ({
  valueCell: {
    paddingTop: '0px',
    paddingBottom: '0px',
    width: '100%',
  },
  noBorder: {
    border: 'none',
  },
});

const DetailDatumValue = ({ classes, children, ...extraProps }) => (
  <TableCell className={[classes.valueCell, classes.noBorder].join(' ')} {...extraProps}>
    {children}
  </TableCell>
);

export default withStyles(styles)(DetailDatumValue);
