import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Field } from 'redux-form';
import Form from 'react-bootstrap/Form';
import { withAutoFocus, withFormValidation, withModalHandler } from './hoc';

@withAutoFocus('select')
@withModalHandler('newNameOfChannel', 'passChannelRename')
@withFormValidation()
class ModalChannelRename extends React.Component {
  componentDidMount() {
    const { initialize, channel: { name } } = this.props;
    initialize({ newNameOfChannel: name });
  }

  render() {
    const {
      channel, handleClose, handleSubmit, refLink, submitting, pristine,
      renderFooter, handleConfirm, renderField,
      uniq, requiredField,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit(handleConfirm(channel.id))}>
        <Modal.Header>{`Rename '${channel.name}' channel`}</Modal.Header>
        <Modal.Body>
          <Field
            placeholder="Type new name"
            refLink={refLink}
            name="newNameOfChannel"
            component={renderField}
            type="text"
            validate={[uniq, requiredField]}
          />
        </Modal.Body>
        {renderFooter(pristine, submitting, handleClose)}
      </Form>
    );
  }
}

export default ModalChannelRename;
