import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import ModalNewChannel from './ModalNewChannel';
import ModalChannelDelete from './ModalChannelDelete';
import ModalChannelRename from './ModalChannelRename';
import ChannelMenuButton from './ChannelMenuButton';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: theme.mixins.drawerWidth,
      flexShrink: 0,
    },
  },
  btnRoot: {
    fontSize: '18px',
    '&:hover': {
      backgroundColor: `${theme.palette.common.black} !important`,
    },
  },
  channelAddBtnRoot: {
    marginLeft: '5px',
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
  },
  btnFocus: {
    backgroundColor: `${theme.palette.common.black} !important`,
  },
  drawerPaper: {
    width: theme.mixins.drawerWidth,
    backgroundColor: theme.palette.channels.main,
    color: theme.palette.common.white,
  },
  btnChannelAdd: {
    padding: '10px',
  },
  channelListHeading: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.channels.currentChannelId,
  drawerShown: state.drawerShown,
});

@connect(mapStateToProps)
class Channels extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  onChannelAction = (modalState, Component, channel) => () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <Component channel={channel} handleClose={handleClose} />
    );
    showModal({ modalState, modalProps: { renderModalBody } });
  }

  render() {
    const {
      classes, theme, channels, currentChannelId, toggleDrawer, drawerShown,
    } = this.props;

    const listSubHeader = (
      <div className={classes.channelListHeading}>
        <Typography color="inherit" variant="h5">Channels</Typography>
        <IconButton
          className={classes.btnChannelAdd}
          onClick={this.onChannelAction('CHANNEL_ADD', ModalNewChannel)}
          color="inherit"
          aria-label="Add"
          size="small"
          classes={{ root: classes.channelAddBtnRoot }}
        >
          <AddIcon />
        </IconButton>
      </div>
    );
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List subheader={listSubHeader}>
          {channels.map((channel) => {
            const { id, name, removable } = channel;
            const isActive = currentChannelId === id;
            return (
              <ListItem
                disableRipple
                classes={{
                  root: classes.btnRoot,
                  focusVisible: classes.btnFocus,
                  selected: classes.btnFocus,
                }}
                color="inherit"
                onClick={this.onChannelChange(id)}
                selected={isActive}
                button
                key={id}
              >
                <ListItemText disableTypography>{`# ${name}`}</ListItemText>
                <ChannelMenuButton
                  onRename={this.onChannelAction('CHANNEL_RENAME', ModalChannelRename, channel)}
                  onDelete={removable
                    && this.onChannelAction('CHANNEL_DELETE', ModalChannelDelete, channel)}
                />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xsDown implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={drawerShown}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden only={['xs', 'sm']} implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Channels);
