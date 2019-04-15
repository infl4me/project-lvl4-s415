import React from 'react';
import Modal from 'react-bootstrap/Modal';
import connect from '../connect';

const mapStateToProps = ({ modal: { modalState, modalProps } }) => ({ modalState, modalProps });

@connect(mapStateToProps)
class ModalCustom extends React.Component {
  componentDidMount() {
    console.log('Modal mounted');
  }

  componentWillUnmount() {
    console.log('Modal unmounted');
  }

  handleClose = () => {
    const { removeModal } = this.props;
    removeModal();
  }

  render() {
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
        {renderModalBody(this.handleClose, this.textInput)}
      </Modal>
    );
  }
}

export default ModalCustom;
