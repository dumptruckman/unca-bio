import React from 'react';
import { Route } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Navigation from './features/Navigation';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class DefaultLayout extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  render() {
    const { component: Component, title, classes, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={matchProps => (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  {title}
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Component {...matchProps} />
            <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer}
                onKeyDown={this.toggleDrawer}
              >
                <Navigation />
              </div>
            </Drawer>
          </div>
        )}
      />
    );
  }
}

export default withStyles(styles)(DefaultLayout);
