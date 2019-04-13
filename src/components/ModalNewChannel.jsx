import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Form from 'react-bootstrap/Form';
import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
  passNewChannel: actions.passNewChannel,
  removeModal: actions.removeModal,
  addError: actions.addError,
};

const NewNameInput = field => (
  <Form.Control {...field.input} required as="input" type="text" placeholder="Type channel name" />
);

@reduxForm({ form: 'nameOfNewChannel' })
@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  handleSubmit = async ({ newChannelName }) => {
    const {
      addError, reset, passNewChannel, removeModal,
    } = this.props;
    reset();
    try {
      await passNewChannel(newChannelName);
    } catch (e) {
      addError({ errMessage: 'message sending error' });
      throw new SubmissionError({ _error: e.message });
    }
    removeModal();
  }

  render() {
    const { handleClose, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Modal.Header>Create new channel</Modal.Header>
        <Modal.Body>
          <Field name="newChannelName" component={NewNameInput} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}

export default ModalDeleteChannel;
