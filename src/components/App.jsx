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
import Alert from './Alert';
import ModalCustom from './Modal';
import { withSockets } from './hoc';

const mapStateToProps = ({ error }) => ({ error });

const actionCreators = {
  fetchData: actions.fetchData,
};

@withSockets()
@connect(mapStateToProps, actionCreators)
class App extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(gon);
  }

  render() {
    const { error } = this.props;
    return (
      <React.Fragment>
        {error && <Alert />}
        <ModalCustom />
        <Container className="p-0" fluid>
          <Row className="vh-100 no-gutters">
            <Col className="bg-dark p-0 text-white pl-3" md={2}>
              <UserBlock />
              <ChannelList />
            </Col>
            <Col className="p-0 d-flex flex-column" md={10}>
              <MessageList />
              <NewMessageForm />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
