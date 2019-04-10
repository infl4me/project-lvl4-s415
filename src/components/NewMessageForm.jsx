import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';

const Textarea = field => <Form.Control {...field.input} as="textarea" rows="3" placeholder="Type your message here" />;

const actionCreators = {
  addMessage: actions.addMessage,
};

const mapStateToProps = () => ({});

@reduxForm({ form: 'newMessage' })
@connect(mapStateToProps, actionCreators)
class NewMessageForm extends React.Component {
  handleSubmit = (values) => {
    const { addMessage } = this.props;
    // const message = {  }
    console.log(window.gon)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form className="d-flex mt-auto" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="message" component={Textarea} />
        <Button variant="secondary" type="submit">Send</Button>
      </Form>
    );
  }
}

export default NewMessageForm;
