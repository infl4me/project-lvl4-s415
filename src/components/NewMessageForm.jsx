import React from 'react';
import keydown from 'react-keydown';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { withUserName, withFormValidation } from './hoc';
import connect from '../connect';

const styles = {
  messageFormContainer: {
    marginTop: 'auto',
    padding: '20px',
  },
  form: {
    display: 'flex',
  },
  submitBtn: {
    marginLeft: '20px',
  },
};

const Textarea = (field) => {
  const { input, meta: { error, touched } } = field;
  return (
    <React.Fragment>
      {/* {touched && error && <div className="w-100 text-danger">{error}</div>} */}
      <TextField
        {...input}
        multiline
        rowsMax={4}
        placeholder="Type your message here"
        variant="outlined"
        fullWidth
        margin="none"
      />
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
    const {
      handleSubmit, requiredField, submitting, classes,
    } = this.props;
    return (
      <div className={classes.messageFormContainer}>
        <form className={classes.form} onSubmit={handleSubmit(this.handleSubmit)} ref={this.form}>
          <Field
            name="message"
            component={Textarea}
            validate={[requiredField]}
          />
          <Button
            className={classes.submitBtn}
            disabled={submitting}
            variant="outlined"
            size="medium"
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(NewMessageForm);
