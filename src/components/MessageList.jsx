import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { filteredMessagesSelector } from '../selectors';
import connect from '../connect';

const styles = theme => ({
  messagesContainer: {
    overflow: 'auto',
    wordBreak: 'break-word',

  },
  username: {
    fontWeight: 700,
    fontSize: '17px',
    marginBottom: '3px',
  },
  message: {
    color: theme.palette.common.black,
    fontSize: '15px',
  },
});

const mapStateToProps = state => ({
  messages: filteredMessagesSelector(state),
});

@connect(mapStateToProps)
class MessageList extends React.Component {
  render() {
    const { messages, classes } = this.props;
    const items = messages.map(({ id, message, username }) => (
      <ListItem
        key={id}
      >
        <ListItemText
          primary={<div className={classes.username}>{username}</div>}
          secondary={<span className={classes.message}>{message}</span>}
        />
        {/* <div>{message}</div> */}
      </ListItem>
    ));
    return (
      <List className={classes.messagesContainer}>{items}</List>
    );
  }
}

export default withStyles(styles)(MessageList);
