import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  valueCell: {
    paddingTop: '0px',
    paddingBottom: '0px',
    width: '100%',
  },
  row: {
    height: '0px',
  },
  noBorder: {
    border: 'none',
  },
});

const Attributes = ({ classes, data: { attributes }, editing }) => (
  <Table>
    <TableBody>
      {(editing || attributes.sex) && (
        <TableRow className={classes.row}>
          <TableCell className={classes.noBorder} variant="head" padding="none">
            <Typography>Sex:</Typography>
          </TableCell>
          <TableCell className={[classes.valueCell, classes.noBorder]}>
            {editing ? <TextField /> : <Typography>{attributes.sex}</Typography>}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default withStyles(styles)(Attributes);
