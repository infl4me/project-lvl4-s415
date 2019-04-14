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
    const renderModalBody = (handleClose, reff) => (
      <ModalNewChannel handleClose={handleClose} reff={reff} />
    );
    showModal({ modalState: 'CHANNEL_ADD_NEW', modalProps: { renderModalBody } });
  }

  render() {
    return (
      <div className="mb-2 d-flex pl-3">
        <h3 className="m-0 mr-1">Channels</h3>
        <Button onClick={this.onAddNewChannel} variant="dark">
          <FontAwesomeIcon icon="plus" />
        </Button>
      </div>
    );
  }
}

export default ChannelsListHeader;
