import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import AccessibleReactTable from 'accessible-react-table';
import LoadingBar from '../shared/LoadingBar';
import Button from '@material-ui/core/Button';
import AddEditUserDialog from './AddEditUserDialog';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteUserDialog from './DeleteUserDialog';
import NotAuthorized from '../shared/NotAuthorized';
import { withAuth } from '../auth/withAuth';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  tdProps: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Users extends React.Component {
  state = {
    userData: null,
    userDialogOpen: false,
    deleteDialogOpen: false,
  };

  handleClickOpen = userData => () => {
    this.setState({
      userData,
      userDialogOpen: true,
    });
  };

  handleClose = saveData => {
    this.setState(
      {
        userData: null,
        userDialogOpen: false,
      },
      () => {
        if (saveData && saveData.email) {
          const { firestore } = this.props;
          const { userData, email, displayName, contributor, admin } = saveData;

          const usersRef = firestore.collection('users');
          if (userData) {
            usersRef
              .doc(userData.id)
              .set(
                {
                  displayName,
                  contributor: Boolean(contributor),
                  admin: Boolean(admin),
                },
                { merge: true }
              )
              .catch(error => {
                console.log(`There was a problem saving user data:\n${error.message}`);
              });
          } else {
            usersRef
              .doc()
              .set({
                email,
                displayName,
                contributor: Boolean(contributor),
                admin: Boolean(admin),
              })
              .catch(error => {
                console.log(`There was a problem saving user data:\n${error.message}`);
              });
          }
        }
      }
    );
  };

  handleDeleteDialogClose = userId => {
    this.setState(
      {
        userData: null,
        deleteDialogOpen: false,
      },
      () => {
        if (userId) {
          this.props.auth
            .doReauthenticate()
            .then(userCred => {
              this.props.firestore
                .collection('users')
                .doc(userId)
                .delete();
            })
            .catch(error => {
              alert(`You cannot delete the user.\nReason: ${error.message}`);
            });
        }
      }
    );
  };

  handleDelete = userData => () => {
    this.setState({
      userData,
      deleteDialogOpen: true,
    });
  };

  render() {
    const {
      classes,
      auth: { isAdmin },
    } = this.props;

    if (isAdmin) {
      return (
        <div>
          <Button onClick={this.handleClickOpen()}>Add User</Button>
          <FirestoreCollection path="users">
            {({ isLoading, data }) => (
              <div>
                <LoadingBar isLoading={isLoading} />
                <AccessibleReactTable
                  loading={isLoading}
                  data={data}
                  filterable={true}
                  defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id;
                    return row[id] !== undefined
                      ? String(row[id])
                          .toLowerCase()
                          .includes(filter.value.toLowerCase())
                      : true;
                  }}
                  getTdProps={() => ({ className: classes.tdProps })}
                  columns={[
                    {
                      Header: 'Email',
                      accessor: 'email',
                    },
                    {
                      Header: 'Name',
                      accessor: 'displayName',
                    },
                    {
                      Header: 'Administrator?',
                      accessor: 'admin',
                      maxWidth: 200,
                      Cell: ({ value }) => (value ? 'Yes' : ''),
                    },
                    {
                      Header: 'Contributor?',
                      accessor: 'contributor',
                      maxWidth: 200,
                      Cell: ({ value }) => (value ? 'Yes' : ''),
                    },
                    {
                      Header: 'Actions',
                      maxWidth: 200,
                      Cell: props => (
                        <div>
                          <IconButton
                            aria-label="Edit"
                            className={classes.button}
                            onClick={this.handleClickOpen(props.original)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            className={classes.button}
                            onClick={this.handleDelete(props.original)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            )}
          </FirestoreCollection>
          <AddEditUserDialog
            userData={this.state.userData}
            open={this.state.userDialogOpen}
            onClose={this.handleClose}
          />
          <DeleteUserDialog
            userData={this.state.userData}
            open={this.state.deleteDialogOpen}
            onClose={this.handleDeleteDialogClose}
          />
        </div>
      );
    } else {
      return <NotAuthorized />;
    }
  }
}

export default withAuth(withFirestore(withStyles(styles)(Users)));
