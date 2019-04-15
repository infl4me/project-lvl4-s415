import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import keydown from 'react-keydown';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions';
import { withUserName, withFormValidation } from './hoc';

const Textarea = (field) => {
  const { input } = field;
  return (
    <Form.Control {...input} as="textarea" rows="3" placeholder="Type your message here" />
  );
};

const actionCreators = {
  sendMessage: actions.sendMessage,
  showAlert: actions.showAlert,
};

const mapStateToProps = ({ channels: { currentChannelId } }) => ({ currentChannelId });

@withUserName()
@reduxForm({ form: 'newMessage' })
@withFormValidation()
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }


  handleSubmit = async (values) => {
    const {
      showAlert, reset, sendMessage, username, currentChannelId,
    } = this.props;
    reset();
    try {
      await sendMessage(currentChannelId, { username, ...values });
    } catch (e) {
      showAlert({ errorProps: { message: 'There was a problem sending your message' } });
      throw new SubmissionError({ _error: e.message });
    }
  }

  @keydown('ctrl+enter')
  handleKeydown() {
    this.form.current.dispatchEvent(new Event('submit'));
  }

  render() {
    const { handleSubmit, requiredField } = this.props;
    return (
      <Form className="d-flex mt-auto" onSubmit={handleSubmit(this.handleSubmit)} ref={this.form}>
        <Field name="message" component={Textarea} validate={[requiredField]} />
        <Button variant="secondary" type="submit">Send</Button>
      </Form>
    );
  }
}

export default NewMessageForm;
