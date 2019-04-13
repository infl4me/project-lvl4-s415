import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

const mapStateToProps = ({ channels: { currentChannelId }, messages: { byId, allIds } }) => ({
  messages: allIds.map(id => byId[id]).filter(msg => msg.channelId === currentChannelId),
});

@connect(mapStateToProps)
class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    const items = messages.map(({ id, message, username }) => (
      <ListGroup.Item
        key={id}
      >
        <div><b>{username}</b></div>
        <div>{message}</div>
      </ListGroup.Item>
    ));
    return (
      <ListGroup>{items}</ListGroup>
    );
  }
}

export default MessageList;
