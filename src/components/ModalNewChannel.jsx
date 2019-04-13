import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import { withAutoFocus, withModalHandler } from './hoc';

@withAutoFocus()
@withModalHandler('nameOfNewChannel', 'passNewChannel')
class ModalNewChannel extends React.Component {
  render() {
    const {
      handleClose, handleSubmit, refLink, submitting, pristine,
      renderFooter, handleConfirm, renderField,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(handleConfirm())}>
        <Modal.Header>Create new channel</Modal.Header>
        <Modal.Body>
          <Field
            refLink={refLink}
            name="nameOfNewChannel"
            component={renderField}
            placeholder="Type channel name"
          />
        </Modal.Body>
        {renderFooter(pristine, submitting, handleClose)}
      </Form>
    );
  }
}

export default ModalNewChannel;
