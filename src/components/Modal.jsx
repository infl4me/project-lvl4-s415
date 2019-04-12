import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import * as actions from '../actions';

const mapStateToProps = ({ modal: { modalState, modalProps } }) => ({ modalState, modalProps });

const actionCreators = {
  removeModal: actions.removeModal,
};

@connect(mapStateToProps, actionCreators)
class ModalCustom extends React.Component {
  handleClose = () => {
    const { removeModal } = this.props;
    removeModal();
  }

  render() {
    console.log('main modal render');
    const {
      modalState,
      modalProps: {
        renderModalBody,
      },
    } = this.props;
    const haveModal = modalState !== 'none';
    if (!haveModal) {
      return null;
    }
    return (
      <Modal show={haveModal} onHide={this.handleClose}>
        {renderModalBody(this.handleClose)}
      </Modal>
    );
  }
}

export default ModalCustom;
