import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';
import * as actions from '../actions';

const mapStateToProps = ({ channels: { currentChannelId } }) => ({ currentChannelId });

const actionCreators = {
  changeChannel: actions.changeChannel,
  showModal: actions.showModal,
  removeModal: actions.removeModal,
};

@connect(mapStateToProps, actionCreators)
class ChannelListItem extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  onChannelRename = (id, name) => () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <ModalRenameChannel id={id} name={name} handleClose={handleClose} />
    );
    showModal({ modalState: 'CHANNEL_RENAME', modalProps: { renderModalBody } });
  }

  onChannelDelete = (id, name) => () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <ModalDeleteChannel id={id} name={name} handleClose={handleClose} />
    );
    showModal({ modalState: 'CHANNEL_DELETE', modalProps: { renderModalBody } });
  }

  render() {
    const {
      id, name, currentChannelId, removable,
    } = this.props;
    const isActive = currentChannelId === id;
    return (
      <div>
        <Dropdown as={ButtonGroup}>
          <Button variant={isActive ? 'secondary' : 'dark'} onClick={this.onChannelChange(id)}>{name}</Button>

          <Dropdown.Toggle variant={isActive ? 'secondary' : 'dark'} id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={this.onChannelRename(id, name)}>Rename</Dropdown.Item>
            {removable
              && <Dropdown.Item onClick={this.onChannelDelete(id, name)}>Delete</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ChannelListItem;
