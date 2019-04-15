import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { channelsSelector } from '../selectors';
import connect from '../connect';
import ModalNewChannel from './ModalNewChannel';
import ModalChannelDelete from './ModalChannelDelete';
import ModalChannelRename from './ModalChannelRename';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.channels.currentChannelId,
});

@connect(mapStateToProps)
class ChannelList extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  onChannelAction = (modalState, Component, channel) => () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <Component channel={channel} handleClose={handleClose} />
    );
    showModal({ modalState, modalProps: { renderModalBody } });
  }

  renderChannels() {
    const { channels, currentChannelId } = this.props;

    return channels.map((channel) => {
      const { id, name, removable } = channel;
      const isActive = currentChannelId === id;
      return (
        <div key={id} className="channel-list-item">
          <Dropdown as={ButtonGroup}>
            <Button
              variant={isActive ? 'secondary' : 'dark'}
              onClick={this.onChannelChange(id)}
            >
              {name}
            </Button>

            <Dropdown.Toggle variant={isActive ? 'secondary' : 'dark'} id="dropdown-split-basic">
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onChannelAction('CHANNEL_RENAME', ModalChannelRename, channel)}>Rename</Dropdown.Item>
              {removable
                && <Dropdown.Item onClick={this.onChannelAction('CHANNEL_DELETE', ModalChannelDelete, channel)}>Delete</Dropdown.Item>
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    });
  }

  render() {
    const channels = this.renderChannels();
    return (
      <React.Fragment>
        <div className="mb-2 d-flex pl-3">
          <h3 className="m-0 mr-1">Channels</h3>
          <Button onClick={this.onChannelAction('CHANNEL_ADD', ModalNewChannel)} variant="dark">
            <FontAwesomeIcon icon="plus" />
          </Button>
        </div>
        <div className="pl-3 pr-3">{channels}</div>
      </React.Fragment>
    );
  }
}
export default ChannelList;
