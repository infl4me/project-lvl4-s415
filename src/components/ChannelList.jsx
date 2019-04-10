import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { withGon } from './hoc';
import * as actions from '../actions';

const mapStateToProps = ({ channelsUIState: { currentChannelId } }) => ({ currentChannelId });

const actionCreators = {
  changeChannel: actions.changeChannel,
};

@withGon()
@connect(mapStateToProps, actionCreators)
class ChannelList extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const items = channels.map(({ id, name }) => {
      const styles = {
        backgroundColor: currentChannelId === id ? '#23272b' : '',
      };
      return (
        <ListGroup.Item
          key={id}
          className="bg-transparent p-0"
        >
          <Button
            className="px-3 py-2 w-100 h-100"
            style={styles}
            variant="dark"
            onClick={this.onChannelChange(id)}
          >
            {name}
          </Button>
        </ListGroup.Item>
      );
    });
    return (
      <React.Fragment>
        <h3 className="m-3">Channels</h3>
        <ListGroup>{items}</ListGroup>
      </React.Fragment>
    );
  }
}
export default ChannelList;
