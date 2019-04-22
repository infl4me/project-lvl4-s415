import React from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import connect from '../../connect';

const renderField = (props) => {
  const {
    input, type, touched, refLink, placeholder, required, label, autoFocus,
    meta: { error },
  } = props;
  return (
    <React.Fragment>
      {/* {error && <div className="text-danger mt-2">{error}</div>} */}
      <TextField
        {...input}
        label={label}
        autoFocus={autoFocus}
        // error={error}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        inputRef={refLink}
        required={required}
        margin="dense"
        fullWidth
      />
    </React.Fragment>
  );
};

const renderFooter = (pristine, submitting, handleClose) => (
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button disabled={submitting || pristine} type="submit" color="primary">
      {submitting ? 'Loading...' : 'Confirm'}
    </Button>
  </DialogActions>
);


export default (form, action) => (Wrapped) => {
  @reduxForm({ form })
  @connect()
  class WithModalHandler extends React.Component {
    handleSubmit = (...args) => async (values) => {
      const inputValue = values[form];
      const {
        showAlert, reset, handleClose,
      } = this.props;
      reset();
      try {
        // eslint-disable-next-line react/destructuring-assignment
        await this.props[action](...args, inputValue);
      } catch (e) {
        showAlert({ errorProps: { message: 'Error occurred while processing your request' } });
        throw new SubmissionError({ _error: e.message });
      } finally {
        handleClose();
      }
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          renderFooter={renderFooter}
          handleConfirm={this.handleSubmit}
          renderField={renderField}
        />
      );
    }
  }
  return WithModalHandler;
};
