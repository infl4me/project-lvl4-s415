import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import keydown from 'react-keydown';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withUserName, withFormValidation } from './hoc';
import connect from '../connect';

const Textarea = (field) => {
  const { input, meta: { error, touched, submitting } } = field;
  console.log(field);
  return (
    <React.Fragment>
      {touched && submitting && <div className="w-100 text-danger">no no</div>}
      {touched && error && <div className="w-100 text-danger">{error}</div>}
      <Form.Control className="w-auto flex-grow-1" {...input} as="textarea" rows="3" placeholder="Type your message here" />
    </React.Fragment>
  );
};

const mapStateToProps = ({ channels: { currentChannelId } }) => ({ currentChannelId });

@withUserName()
@reduxForm({ form: 'newMessage' })
@withFormValidation()
@connect(mapStateToProps)
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
    const { handleSubmit, requiredField, submitting } = this.props;
    return (
      <Form className="mt-auto p-3 px-5 d-flex flex-wrap" onSubmit={handleSubmit(this.handleSubmit)} ref={this.form}>
        <Field name="message" component={Textarea} validate={[requiredField]} />
        <Button disabled={submitting} variant="secondary" type="submit">Send</Button>
      </Form>
    );
  }
}

export default NewMessageForm;
