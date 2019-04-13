import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { withModalHandler } from './hoc';

@withModalHandler('channelDelete', 'passChannelDelete')
class ModalChannelDelete extends React.Component {
  render() {
    const {
      name, handleClose, handleSubmit, submitting,
      renderFooter, handleConfirm, id,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(handleConfirm(id))}>
        <Modal.Header>{`Are you sure you want to delete '${name}' channel?`}</Modal.Header>
        {renderFooter(false, submitting, handleClose)}
      </Form>
    );
  }
}

export default ModalChannelDelete;
