import React from 'react';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { withGon } from './hoc';
import * as actions from '../actions';

const mapStateToProps = ({ channelsUIState: { messages, currentChannelId } }) => ({
  messages: messages.filter(el => el.channelId !== currentChannelId),
});

const actionCreators = {
  changeChannel: actions.changeChannel,
};

@withGon()
@connect(mapStateToProps, actionCreators)
class MessageList extends React.Component {
  componentDidMount() {
    // const socket = io();
    // socket.on('newMessage', (msg) => {
    //   console.log(msg, 'SOCKET');
    // });
  }

  render() {
    const { messages } = this.props;
    const items = messages.map(({ id, text, author }) => (
      <ListGroup.Item
        key={id}
      >
        <div><b>{author}</b></div>
        <div>{text}</div>
      </ListGroup.Item>
    ));
    return (
      <ListGroup>{items}</ListGroup>
    );
  }
}

export default MessageList;
