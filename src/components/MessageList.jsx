import React from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { filteredMessagesSelector } from '../selectors';

const mapStateToProps = state => ({
  messages: filteredMessagesSelector(state),
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
