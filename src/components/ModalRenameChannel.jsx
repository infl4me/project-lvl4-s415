import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/Form';
// import * as actions from '../actions';

const mapStateToProps = () => ({});

const actionCreators = {
};

const NewNameInput = field => (
  <Form.Control {...field.input} required as="input" type="text" placeholder="Type new name" />
);

@reduxForm({ form: 'channelNewName' })
@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  handleSubmit = async (values) => {
    // const {
    //   addError, reset, sendMessage, username, currentChannelId,
    // } = this.props;
    // reset();
    // try {
    //   await sendMessage(currentChannelId, { username, ...values });
    // } catch (e) {
    //   addError({ errMessage: 'message sending error' });
    //   throw new SubmissionError({ _error: e.message });
    // }
    console.log(values);
  }

  render() {
    const { name, handleClose, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmit)}>
        <Modal.Header>{`Rename '${name}' channel`}</Modal.Header>
        <Modal.Body>
          <Field name="channelName" component={NewNameInput} />
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
