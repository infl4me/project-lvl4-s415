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
  addError: actions.addError,
};

@connect(mapStateToProps, actionCreators)
class MessageList extends React.Component {
  componentDidMount() {
    const socket = io();
    const { addMessage, addError } = this.props;
    socket.on('newMessage', (msg) => {
      const message = msg.data.attributes;
      console.log(message, 'SOCKET');
      addMessage({ message });
    });
    socket.on('error', () => {
      console.log('SOCKET_ERR');
      addError({ errMessage: 'err' });
    });
    socket.on('connect_error', () => {
      console.log('SOCKET_CONNECT_ERR');
      addError({ errMessage: 'connect_error' });
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
