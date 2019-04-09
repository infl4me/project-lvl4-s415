import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewMessageForm = () => (
  <Form className="d-flex mt-auto">
    <Form.Control as="textarea" rows="3" />
    <Button variant="secondary" type="submit">Send</Button>
  </Form>
);

export default NewMessageForm;
