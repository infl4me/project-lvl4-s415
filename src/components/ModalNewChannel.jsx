import React from 'react';
import { Field } from 'redux-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withModalHandler, withFormValidation } from './hoc';

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
      <form onSubmit={handleSubmit(handleConfirm())}>
        <DialogTitle>Create new channel</DialogTitle>
        <DialogContent>
          <Field
            autoFocus
            refLink={refLink}
            name="nameOfNewChannel"
            component={renderField}
            label="Channel name"
            type="text"
            validate={[uniq, requiredField]}
          />
        </DialogContent>
        {renderFooter(pristine, submitting, handleClose)}
      </form>
    );
  }
}

export default ModalNewChannel;
