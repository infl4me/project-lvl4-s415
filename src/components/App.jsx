import React from 'react';
import gon from 'gon';
import faker from 'faker';
import Cookie from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GonProvider } from './gonContext';
import { UserNameProvider } from './userNameContext';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import UserBlock from './UserBlock';

let username = Cookie.get('username');
if (!username) {
  username = faker.name.findName();
  Cookie.set('username', username);
}


const App = () => (
  <UserNameProvider value={username}>
    <GonProvider value={gon}>
      <Container className="p-0" fluid>
        <Row className="vh-100 m-0">
          <Col className="bg-dark p-0 text-white" xs={12} sm={2}>
            <UserBlock />
            <ChannelList />
          </Col>
          <Col className="p-0 d-flex flex-column" xs={12} sm={10}>
            <MessageList />
            <NewMessageForm />
          </Col>
        </Row>
      </Container>
    </GonProvider>
  </UserNameProvider>
);

export default App;
