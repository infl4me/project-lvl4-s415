import React from 'react';
import gon from 'gon';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChannelList from './ChannelList';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import UserBlock from './UserBlock';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  fetchData: actions.fetchData,
};

@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(gon);
  }

  render() {
    return (
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
    );
  }
}

export default App;
