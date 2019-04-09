import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import withGon from './withGon';

const ChannelList = ({ channels }) => {
  const items = channels.map(({ id, name }) => (
    <ListGroup.Item
      key={id}
      className="bg-transparent"
    >
      {name}
    </ListGroup.Item>
  ));
  return (
    <React.Fragment>
      <h3 className="m-3">Channels</h3>
      <ListGroup>{items}</ListGroup>
    </React.Fragment>
  );
};

export default withGon(ChannelList);