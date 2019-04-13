import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import ModalNewChannel from './ModalNewChannel';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  showModal: actions.showModal,
};

@connect(mapStateToProps, actionCreators)
class ChannelsListHeader extends React.Component {
  onAddNewChannel = () => {
    const { showModal } = this.props;
    const renderModalBody = handleClose => (
      <ModalNewChannel handleClose={handleClose} />
    );
    showModal({ modalState: 'CHANNEL_ADD_NEW', modalProps: { renderModalBody } });
  }

  render() {
    return (
      <div className="mb-3 d-flex">
        <h3 className="m-0">Channels</h3>
        <Button onClick={this.onAddNewChannel} variant="dark">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </div>
    );
  }
}

export default ChannelsListHeader;
