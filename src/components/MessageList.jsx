import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const MessageList = ({ messages }) => {
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
};

export default MessageList;
