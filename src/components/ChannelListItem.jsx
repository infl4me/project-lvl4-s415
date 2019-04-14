import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ModalChannelDelete from './ModalChannelDelete';
import ModalChannelRename from './ModalChannelRename';
import * as actions from '../actions';

const mapStateToProps = ({ channels: { currentChannelId } }) => ({ currentChannelId });

const actionCreators = {
  changeChannel: actions.changeChannel,
  showModal: actions.showModal,
};

@connect(mapStateToProps, actionCreators)
class ChannelListItem extends React.Component {
  onChannelChange = id => () => {
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  onChannelAction = (modalState, Component) => () => {
    const { showModal, id, name } = this.props;
    const renderModalBody = handleClose => (
      <Component id={id} name={name} handleClose={handleClose} />
    );
    showModal({ modalState, modalProps: { renderModalBody } });
  }

  render() {
    const {
      id, name, currentChannelId, removable,
    } = this.props;
    const isActive = currentChannelId === id;
    return (
      <div className="channel-list-item">
        <Dropdown as={ButtonGroup}>
          <Button variant={isActive ? 'secondary' : 'dark'} onClick={this.onChannelChange(id)}>{name}</Button>

          <Dropdown.Toggle variant={isActive ? 'secondary' : 'dark'} id="dropdown-split-basic">
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={this.onChannelAction('CHANNEL_RENAME', ModalChannelRename)}>Rename</Dropdown.Item>
            {removable
              && <Dropdown.Item onClick={this.onChannelAction('CHANNEL_DELETE', ModalChannelDelete)}>Delete</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ChannelListItem;
