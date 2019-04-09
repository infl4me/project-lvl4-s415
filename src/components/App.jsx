import React from 'react';
import gon from 'gon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GonProvider } from './gonContext';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';

const testmessages = [
  {
    id: 1,
    author: 'Den',
    text: 'hi',
  },
  {
    id: 2,
    author: 'Alex',
    text: 'hello',
  },
];

const App = () => (
  <GonProvider value={gon}>
    <Container className="p-0" fluid>
      <Row className="vh-100 m-0">
        <Col className="bg-dark p-0 text-white" xs={12} sm={2}>
          <ChannelList />
        </Col>
        <Col className="p-0 d-flex flex-column" xs={12} sm={10}>
          <MessageList messages={testmessages} />
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
  </GonProvider>
);

export default App;
