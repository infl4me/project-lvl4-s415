import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ModalDelete from './ModalDelete';

const mapStateToProps = (state) => {
  const {
    channels: {
      modal, currentChannelId, byId, allIds,
    },
  } = state;
  return {
    currentChannelId,
    modal,
    channels: allIds.map(id => byId[id]),
  };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
  showModal: actions.showModal,
  removeModal: actions.removeModal,
};

@connect(mapStateToProps, actionCreators)
class ChannelList extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  onChannelRename = () => () => {

  }

  onChannelDelete = (id, name) => () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <ModalDelete id={id} name={name} handleClose={handleClose} />
    );
    showModal({ modalState: 'CHANNEL_DELETE', modalProps: { renderModalBody } });
  }

  render() {
    const { channels, currentChannelId } = this.props;
    const items = channels.map(({ id, name }) => {
      const isActive = currentChannelId === id;
      return (
        <React.Fragment key={id}>
          <div
            className="p-0"
          >
            <Dropdown as={ButtonGroup}>
              <Button variant={isActive ? 'secondary' : 'dark'} onClick={this.onChannelChange(id)}>{name}</Button>

              <Dropdown.Toggle variant={isActive ? 'secondary' : 'dark'} id="dropdown-split-basic" />

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.onChannelRename(id, name)}>Rename</Dropdown.Item>
                <Dropdown.Item onClick={this.onChannelDelete(id, name)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </React.Fragment>
      );
    });
    return (
      <React.Fragment>
        <h3 className="m-3">Channels</h3>
        <div>{items}</div>
      </React.Fragment>
    );
  }
}
export default ChannelList;
