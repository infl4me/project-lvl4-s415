import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import connect from '../connect';

const styles = theme => ({
  appBar: {
    marginLeft: theme.mixins.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.mixins.drawerWidth})`,
    },
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const mapStateToProps = ({ channels: { currentChannelId, byId } }) => ({
  currentChannel: byId[currentChannelId],
});

@withStyles(styles, { withTheme: true })
@connect(mapStateToProps)
class Header extends React.Component {
  render() {
    const { classes, currentChannel, toggleDrawer } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {currentChannel && `# ${currentChannel.name}`}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
