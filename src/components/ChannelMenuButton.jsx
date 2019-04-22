import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import noop from 'lodash/noop';

const styles = theme => ({
  menuBtn: {
    padding: '6px',
  },
  menuBtnRoot: {
    '&:hover': {
      backgroundColor: theme.palette.channels.main,
    },
  },
});

@withStyles(styles)
class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (fn = noop) => (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: null });
    fn();
  };

  render() {
    const { anchorEl } = this.state;
    const { onRename, onDelete, classes } = this.props;
    return (
      <div>
        <IconButton
          color="inherit"
          className={classes.menuBtn}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          classes={{ root: classes.menuBtnRoot }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose()}
        >
          <MenuItem onClick={this.handleClose(onRename)}>Rename</MenuItem>
          {onDelete && <MenuItem onClick={this.handleClose(onDelete)}>Delete</MenuItem>}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
