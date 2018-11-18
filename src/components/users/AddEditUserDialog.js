import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';

const styles = {
  button: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AddEditUserDialog extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { userData, open } = props;
    const { userData: previousData } = state;
    if (open && userData && !previousData) {
      return {
        userData: userData,
        email: userData.email || '',
        displayName: userData.displayName || '',
        admin: userData.admin || '',
        contributor: userData.contributor || '',
      };
    }
    return state;
  }

  state = {
    userData: null,
    email: '',
    displayName: '',
    admin: '',
    contributor: '',
    saving: false,
  };

  handleClose = saveData => e => {
    this.props.onClose(saveData);
    this.setState({
      userData: null,
      email: '',
      displayName: '',
      admin: '',
      contributor: '',
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  saveUser = event => {
    event.preventDefault();
    if (this.state.email) {
      this.handleClose(this.state)();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.open && !this.props.open) {
      this.setState({
        userData: null,
        email: '',
        displayName: '',
        admin: '',
        contributor: '',
      });
    }
  }

  render() {
    const { userData: _, onClose, classes, ...other } = this.props;
    const { userData, email, displayName, contributor, admin } = this.state;

    return (
      <Dialog onClose={this.handleClose()} aria-labelledby="user-dialog-title" {...other}>
        <DialogTitle id="user-dialog-title">{userData ? 'Edit' : 'Add'} User</DialogTitle>
        <DialogContent>
          <form onSubmit={this.saveUser}>
            <FormGroup>
              <TextField
                required
                autoFocus
                id="user-email"
                label="Email"
                value={email}
                onChange={this.handleChange('email')}
                disabled={Boolean(userData)}
                error={!Boolean(email)}
              />
              <TextField
                id="user-name"
                label="Name"
                value={displayName}
                onChange={this.handleChange('displayName')}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={admin}
                    onChange={this.handleChange('admin')}
                    value={admin ? '' : 'admin'}
                  />
                }
                label="Administrator"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contributor}
                    onChange={this.handleChange('contributor')}
                    value={contributor ? '' : 'contributor'}
                  />
                }
                label="Contributor"
              />
            </FormGroup>
            <Divider />
            <Button className={classes.button} type="submit">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddEditUserDialog);
