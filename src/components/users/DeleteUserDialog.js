import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';

const styles = {
  button: {
    width: '100%',
  },
  nameText: {
    textAlign: 'center',
    margin: '5px',
  },
};

class DeleteUserDialog extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { userData, open } = props;
    const { userData: previousData } = state;
    if (open && userData && !previousData) {
      return {
        userData: userData,
        email: userData.email || '',
        displayName: userData.displayName || '',
      };
    }
    return state;
  }

  state = {
    userData: null,
    email: '',
    displayName: '',
    saving: false,
  };

  handleClose = userId => e => {
    this.props.onClose(userId);
    this.setState({
      userData: null,
      email: '',
      displayName: '',
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  deleteUser = event => {
    this.handleClose(this.state.userData.id)();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open && !this.props.open) {
      this.setState({
        userData: null,
        email: '',
        displayName: '',
      });
    }
  }

  render() {
    const { userData: _, onClose, classes, ...other } = this.props;
    const { userData, email, displayName } = this.state;

    return (
      <Dialog onClose={this.handleClose()} aria-labelledby="user-dialog-title" {...other}>
        <DialogTitle id="user-dialog-title">{userData ? 'Edit' : 'Add'} User</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete</DialogContentText>
          <DialogContentText className={classes.nameText}>
            <strong>
              {email} {displayName && `(${displayName})`}
            </strong>
          </DialogContentText>
          <Divider />
          <Button color="secondary" className={classes.button} onClick={this.deleteUser}>
            Delete
          </Button>
          <Button className={classes.button} onClick={this.handleClose()}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(DeleteUserDialog);
