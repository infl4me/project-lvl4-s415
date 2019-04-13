import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import { withAutoFocus, withModalHandler, withFormValidation } from './hoc';

@withAutoFocus()
@withModalHandler('nameOfNewChannel', 'passNewChannel')
@withFormValidation()
class ModalNewChannel extends React.Component {
  render() {
    const {
      handleClose, handleSubmit, refLink, submitting, pristine,
      renderFooter, handleConfirm, renderField,
      uniq, requiredField,
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
            validate={[uniq, requiredField]}
          />
        </Modal.Body>
        {renderFooter(pristine, submitting, handleClose)}
      </Form>
    );
  }
}

export default ModalNewChannel;
