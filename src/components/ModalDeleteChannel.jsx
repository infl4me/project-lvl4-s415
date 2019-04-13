import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  passChannelDelete: actions.passChannelDelete,
  removeModal: actions.removeModal,
  addError: actions.addError,
};


@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  handleConfirm = id => async () => {
    const { passChannelDelete, removeModal, addError } = this.props;
    try {
      await passChannelDelete(id);
    } catch (e) {
      addError({ errMessage: 'channel_removing_error' });
    }
    removeModal();
  }

  render() {
    const { name, id, handleClose } = this.props;
    return (
      <React.Fragment>
        <Modal.Header>{`Are you sure you want to delete '${name}' channel?`}</Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleConfirm(id)}>
            Confirm
          </Button>
        </Modal.Footer>
      </React.Fragment>

    );
  }
}

export default ModalDeleteChannel;
