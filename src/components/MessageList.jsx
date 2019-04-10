import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import * as actions from '../actions';

const mapStateToProps = ({ channels: { currentChannelId }, messages: { byId, allIds } }) => ({
  messages: allIds.map(id => byId[id]).filter(msg => msg.channelId === currentChannelId),
});

const actionCreators = {
  changeChannel: actions.changeChannel,
  addMessage: actions.addMessage,
};

@connect(mapStateToProps, actionCreators)
class MessageList extends React.Component {
  componentDidMount() {
    const socket = io();
    const { addMessage } = this.props;
    socket.on('newMessage', (msg) => {
      const message = msg.data.attributes;
      console.log(message, 'SOCKET');
      addMessage({ message });
    });
  }

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
