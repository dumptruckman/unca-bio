import React from 'react';
import { Route } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Navigation from './navigation/Navigation';
import LoginButton from './auth/LoginButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import PaperWrapper from './shared/PaperWrapper';

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
    const { component: Component, title, classes, wrap, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={matchProps => (
          <div className={classes.root}>
            <CssBaseline />
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
                <LoginButton />
              </Toolbar>
            </AppBar>
            <main>
              {wrap ? (
                <PaperWrapper>
                  <Component {...matchProps} />
                </PaperWrapper>
              ) : (
                <Component {...matchProps} />
              )}
            </main>
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
